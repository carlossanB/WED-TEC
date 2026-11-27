import { FALLBACK_NEWS_ARTICLES, NEWS_CATEGORY_IMAGES } from "@/data/newsData"
import { httpClient } from "@/shared/api/httpClient"
import { env } from "@/shared/config/env"
import type { NewsArticle, NewsCategory, NewsFeedResult } from "../types"

interface WpFeaturedMedia {
  source_url?: string
  media_details?: {
    sizes?: {
      large?: { source_url?: string }
      medium_large?: { source_url?: string }
      full?: { source_url?: string }
    }
  }
}

interface WpPostItem {
  id: number
  date?: string
  link?: string
  title?: { rendered?: string }
  excerpt?: { rendered?: string }
  jetpack_featured_media_url?: string
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[]
  }
}

const CACHE_KEY = "sf_news_portal_cache_v5"
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutos

const ALL_CATEGORIES: NewsCategory[] = [
  "Alertas USCIS",
  "Permisos y Visas",
  "Asilo y Corte",
  "Residencia y Ciudadanía",
]

const RELATED_SERVICE_BY_CATEGORY: Record<NewsCategory, string> = {
  "Alertas USCIS": "Consulta de Caso USCIS",
  "Permisos y Visas": "Permiso de Trabajo (EAD)",
  "Asilo y Corte": "Asilo Afirmativo y Defensivo",
  "Residencia y Ciudadanía": "Naturalización y Ciudadanía",
}

interface CachedNewsPayload {
  timestamp: number
  result: NewsFeedResult
}

/**
 * Decodifica entidades HTML (`&#8220;`, `&amp;`, etc.) y elimina etiquetas HTML.
 */
function cleanHtmlText(raw: string | undefined): string {
  if (!raw) return ""

  if (typeof window !== "undefined" && typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(raw, "text/html")
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim()
  }

  return raw
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8216;|&#8217;|&#39;/g, "'")
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/\s+/g, " ")
    .trim()
}

function formatSpanishDate(dateStr: string | undefined): string {
  if (!dateStr) return "Reciente"
  const parsed = new Date(dateStr)
  if (Number.isNaN(parsed.getTime())) return "Reciente"

  return parsed.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

/**
 * Clasifica el artículo evaluando PRIMERO exclusivamente el titular (`title`),
 * evitando que palabras genéricas dentro del resumen secuestren la categoría.
 * Si el titular no contiene una palabra clave unívoca, conserva `defaultCategory`.
 */
function classifyByTitleFirst(
  title: string,
  summary: string,
  defaultCategory: NewsCategory
): {
  category: NewsCategory
  relatedService: string
  isUscisTopic: boolean
} {
  const titleLower = title.toLowerCase()
  const fullLower = `${title} ${summary}`.toLowerCase()

  const mentionsUscisOrDhs =
    defaultCategory === "Alertas USCIS" ||
    fullLower.includes("uscis") ||
    fullLower.includes("dhs") ||
    fullLower.includes("tarifa") ||
    fullLower.includes("estafa") ||
    fullLower.includes("formulario")

  // 1. Evaluar palabras clave en el TITULAR (alta precisión)
  if (
    titleLower.includes("asilo") ||
    titleLower.includes("corte") ||
    titleLower.includes("juez") ||
    titleLower.includes("jueces") ||
    titleLower.includes("tribunal") ||
    titleLower.includes("audiencia") ||
    titleLower.includes("fianza")
  ) {
    return {
      category: "Asilo y Corte",
      relatedService: RELATED_SERVICE_BY_CATEGORY["Asilo y Corte"],
      isUscisTopic: mentionsUscisOrDhs,
    }
  }

  if (
    titleLower.includes("ciudadan") ||
    titleLower.includes("naturalizac") ||
    titleLower.includes("green card") ||
    titleLower.includes("residencia")
  ) {
    return {
      category: "Residencia y Ciudadanía",
      relatedService: RELATED_SERVICE_BY_CATEGORY["Residencia y Ciudadanía"],
      isUscisTopic: mentionsUscisOrDhs,
    }
  }

  if (
    titleLower.includes("permiso de trabajo") ||
    titleLower.includes("tps") ||
    titleLower.includes("visa") ||
    titleLower.includes("h-1b") ||
    titleLower.includes("h-4") ||
    titleLower.includes("ead") ||
    titleLower.includes("empleador")
  ) {
    return {
      category: "Permisos y Visas",
      relatedService: RELATED_SERVICE_BY_CATEGORY["Permisos y Visas"],
      isUscisTopic: mentionsUscisOrDhs,
    }
  }

  if (
    titleLower.includes("uscis") ||
    titleLower.includes("tarifa") ||
    titleLower.includes("estafa") ||
    titleLower.includes("carga pública") ||
    titleLower.includes("dhs")
  ) {
    return {
      category: "Alertas USCIS",
      relatedService: RELATED_SERVICE_BY_CATEGORY["Alertas USCIS"],
      isUscisTopic: true,
    }
  }

  // 2. Si el titular es general, usar la categoría objetivo de la consulta especializada
  return {
    category: defaultCategory,
    relatedService: RELATED_SERVICE_BY_CATEGORY[defaultCategory],
    isUscisTopic: mentionsUscisOrDhs,
  }
}

/**
 * Extrae la imagen original de alta resolución directamente del artículo del sitio de noticias.
 */
function extractOriginalSiteImage(item: WpPostItem): string | null {
  const media = item._embedded?.["wp:featuredmedia"]?.[0]
  const sizes = media?.media_details?.sizes

  const candidate =
    sizes?.large?.source_url ||
    sizes?.medium_large?.source_url ||
    media?.source_url ||
    item.jetpack_featured_media_url

  if (candidate && candidate.startsWith("http")) {
    return candidate.replace(/&amp;/g, "&")
  }

  return null
}

function mapWpPostToArticle(
  item: WpPostItem,
  sourceName: string,
  defaultCategory: NewsCategory
): NewsArticle | null {
  const cleanTitle = cleanHtmlText(item.title?.rendered)
  if (!cleanTitle || !item.link) return null

  const rawExcerpt = cleanHtmlText(item.excerpt?.rendered)
  const cleanSummary =
    rawExcerpt.length > 25
      ? rawExcerpt.slice(0, 220) + (rawExcerpt.length > 220 ? "…" : "")
      : `Nota publicada por ${sourceName} sobre actualizaciones migratorias y trámites en Estados Unidos.`

  const { category, relatedService, isUscisTopic } = classifyByTitleFirst(
    cleanTitle,
    cleanSummary,
    defaultCategory
  )

  const originalImage = extractOriginalSiteImage(item)

  return {
    id: `${sourceName.toLowerCase().replace(/\s+/g, "-")}-${item.id}`,
    title: cleanTitle,
    summary: cleanSummary,
    publishedAt: item.date || new Date().toISOString(),
    formattedDate: formatSpanishDate(item.date),
    sourceName,
    sourceKind: isUscisTopic ? "uscis" : "prensa",
    sourceUrl: item.link,
    category,
    relatedService,
    imageUrl: originalImage || NEWS_CATEGORY_IMAGES[category],
    isOfficialGov: isUscisTopic,
  }
}

async function fetchCategoryFeedWithAxios(
  apiUrl: string,
  sourceName: string,
  searchTerm: string,
  targetCategory: NewsCategory
): Promise<NewsArticle[]> {
  const response = await httpClient.get<WpPostItem[]>(apiUrl, {
    params: {
      search: searchTerm,
      per_page: 5,
      _embed: 1,
    },
  })

  if (!Array.isArray(response.data)) {
    return []
  }

  return response.data
    .map(item => mapWpPostToArticle(item, sourceName, targetCategory))
    .filter((article): article is NewsArticle => article !== null)
}

/**
 * Obtiene noticias migratorias realizando 4 consultas especializadas en paralelo
 * (una por cada categoría del portal: Alertas USCIS, Permisos y Visas, Asilo y Corte,
 * Residencia y Ciudadanía) para garantizar que todas las categorías tengan cobertura real.
 */
export async function fetchImmigrationNews(forceRefresh = false): Promise<NewsFeedResult> {
  if (!forceRefresh && typeof window !== "undefined") {
    try {
      const rawCache = window.sessionStorage.getItem(CACHE_KEY)
      if (rawCache) {
        const parsed = JSON.parse(rawCache) as CachedNewsPayload
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.result.articles.length > 0) {
          return parsed.result
        }
      }
    } catch {
      // Ignorar errores de sessionStorage
    }
  }

  const [alertasUscisRes, permisosVisasRes, asiloCorteRes, residenciaCiudadaniaRes] =
    await Promise.allSettled([
      fetchCategoryFeedWithAxios(
        env.conexionMigranteApiUrl,
        "Conexión Migrante",
        "uscis tarifas",
        "Alertas USCIS"
      ),
      fetchCategoryFeedWithAxios(
        env.elDiarioNyApiUrl,
        "El Diario NY",
        "permiso trabajo tps visa",
        "Permisos y Visas"
      ),
      fetchCategoryFeedWithAxios(
        env.laOpinionApiUrl,
        "La Opinión",
        "asilo corte inmigracion",
        "Asilo y Corte"
      ),
      fetchCategoryFeedWithAxios(
        env.laOpinionApiUrl,
        "La Opinión",
        "ciudadania residencia green card",
        "Residencia y Ciudadanía"
      ),
    ])

  const lists: NewsArticle[][] = [
    alertasUscisRes.status === "fulfilled" ? alertasUscisRes.value : [],
    permisosVisasRes.status === "fulfilled" ? permisosVisasRes.value : [],
    asiloCorteRes.status === "fulfilled" ? asiloCorteRes.value : [],
    residenciaCiudadaniaRes.status === "fulfilled" ? residenciaCiudadaniaRes.value : [],
  ]

  const combinedLive: NewsArticle[] = []
  const seenUrls = new Set<string>()
  const maxLen = Math.max(...lists.map(l => l.length), 0)

  // Intercalar equitativamente 1 artículo de cada una de las 4 consultas por ronda
  for (let i = 0; i < maxLen; i++) {
    for (const list of lists) {
      const candidate = list[i]
      if (candidate && !seenUrls.has(candidate.sourceUrl)) {
        combinedLive.push(candidate)
        seenUrls.add(candidate.sourceUrl)
      }
    }
  }

  // Garantizar que ninguna de las 4 categorías quede vacía si alguna API externa falló
  for (const cat of ALL_CATEGORIES) {
    const countInCat = combinedLive.filter(a => a.category === cat).length
    if (countInCat === 0) {
      const fallbacksForCat = FALLBACK_NEWS_ARTICLES.filter(f => f.category === cat)
      for (const fb of fallbacksForCat) {
        if (!seenUrls.has(fb.sourceUrl)) {
          combinedLive.push(fb)
          seenUrls.add(fb.sourceUrl)
        }
      }
    }
  }

  const result: NewsFeedResult = {
    articles: combinedLive.length > 0 ? combinedLive.slice(0, 20) : FALLBACK_NEWS_ARTICLES,
    fromLiveFeed: combinedLive.length > 0,
    updatedAt: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }

  if (typeof window !== "undefined") {
    try {
      const payload: CachedNewsPayload = {
        timestamp: Date.now(),
        result,
      }
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload))
    } catch {
      // Ignorar si sessionStorage no está disponible
    }
  }

  return result
}
