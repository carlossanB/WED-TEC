import { useEffect, useState } from "react"
import Link from "@/app/navigation/Link"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"
import NewsCard from "./components/NewsCard"
import { fetchImmigrationNews } from "./services/newsService"
import type { NewsArticle, NewsCategory, NewsSourceKind } from "./types"

interface NewsPortalPageProps {
  onOpenConsultation: (serviceTitle: string) => void
}

const CATEGORIES: Array<"Todas" | NewsCategory> = [
  "Todas",
  "Alertas USCIS",
  "Permisos y Visas",
  "Asilo y Corte",
  "Residencia y Ciudadanía",
]

export default function NewsPortalPage({ onOpenConsultation }: NewsPortalPageProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [isLive, setIsLive] = useState(false)
  const [updatedAt, setUpdatedAt] = useState("")
  const [sourceFilter, setSourceFilter] = useState<NewsSourceKind>("all")
  const [categoryFilter, setCategoryFilter] = useState<"Todas" | NewsCategory>("Todas")
  const [searchQuery, setSearchQuery] = useState("")

  const loadFeed = async (force = false) => {
    if (force) setRefreshing(true)
    else setLoading(true)

    try {
      const result = await fetchImmigrationNews(force)
      setArticles(result.articles)
      setIsLive(result.fromLiveFeed)
      setUpdatedAt(result.updatedAt)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    void loadFeed(false)
  }, [])

  const filteredArticles = articles.filter(article => {
    if (sourceFilter !== "all" && article.sourceKind !== sourceFilter) return false
    if (categoryFilter !== "Todas" && article.category !== categoryFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchesTitle = article.title.toLowerCase().includes(q)
      const matchesSummary = article.summary.toLowerCase().includes(q)
      const matchesSource = article.sourceName.toLowerCase().includes(q)
      return matchesTitle || matchesSummary || matchesSource
    }
    return true
  })

  const featuredArticle = filteredArticles[0]
  const remainingArticles = filteredArticles.slice(1)

  return (
    <main className="news-portal-page">
      <section className="news-portal-hero">
        <div className="container">
          <div className="news-portal-breadcrumb">
            <Link href="/">
              <Icon name="back" /> Volver al inicio
            </Link>
            <span>/</span>
            <span>Portal de Noticias Migratorias</span>
          </div>

          <div className="news-portal-hero-grid">
            <div>
              <span className="eyebrow">PORTAL DE ACTUALIDAD MIGRATORIA EN EE. UU.</span>
              <h1>Alertas oficiales de USCIS y cobertura de medios prestigiosos.</h1>
              <p>
                Consulta en un solo lugar los últimos comunicados gubernamentales de{" "}
                <strong>USCIS.gov</strong> y reportajes verificados de{" "}
                <strong>La Opinión, El Diario NY y Conexión Migrante</strong>. Si una
                medida impacta tu trámite, solicita orientación personalizada.
              </p>
            </div>

            <div className="news-portal-status-card">
              <div className="news-portal-status-top">
                <span className={`news-status-dot ${isLive ? "is-live" : ""}`} />
                <strong>{isLive ? "Feed en vivo conectado" : "Boletín verificado activo"}</strong>
              </div>
              <p>
                Fuentes sindicadas: <strong>USCIS.gov en Español</strong> y canales de prensa
                migratoria de EE. UU.
                {updatedAt ? ` · Última revisión: ${updatedAt}` : ""}
              </p>
              <button
                type="button"
                className="news-refresh-btn"
                onClick={() => void loadFeed(true)}
                disabled={refreshing || loading}
              >
                <Icon name="clock" />
                <span>{refreshing ? "Actualizando fuentes…" : "Actualizar noticias ahora"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="news-portal-controls-section">
        <div className="container">
          <div className="news-portal-toolbar">
            <div className="news-filter-tabs" role="tablist" aria-label="Filtrar por tipo de fuente">
              <button
                type="button"
                role="tab"
                aria-selected={sourceFilter === "all"}
                className={`news-tab-btn ${sourceFilter === "all" ? "is-active" : ""}`}
                onClick={() => setSourceFilter("all")}
              >
                Todas ({articles.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={sourceFilter === "uscis"}
                className={`news-tab-btn ${sourceFilter === "uscis" ? "is-active" : ""}`}
                onClick={() => setSourceFilter("uscis")}
              >
                <Icon name="shield" /> Oficial USCIS.gov
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={sourceFilter === "prensa"}
                className={`news-tab-btn ${sourceFilter === "prensa" ? "is-active" : ""}`}
                onClick={() => setSourceFilter("prensa")}
              >
                <Icon name="globe" /> Prensa en Español
              </button>
            </div>

            <div className="news-search-box">
              <Icon name="search" className="news-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar por tema (ej. TPS, asilo, residencia, USCIS, La Opinión)…"
                aria-label="Buscar noticias migratorias"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="news-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Limpiar búsqueda"
                >
                  <Icon name="close" />
                </button>
              )}
            </div>
          </div>

          <div className="news-category-pills" role="group" aria-label="Categorías migratorias">
            {CATEGORIES.map(category => {
              const count =
                category === "Todas"
                  ? articles.length
                  : articles.filter(a => a.category === category).length

              return (
                <button
                  key={category}
                  type="button"
                  className={`news-category-pill ${categoryFilter === category ? "is-active" : ""}`}
                  onClick={() => {
                    setCategoryFilter(category)
                    if (
                      category !== "Todas" &&
                      sourceFilter !== "all" &&
                      !articles.some(
                        a => a.category === category && a.sourceKind === sourceFilter
                      )
                    ) {
                      setSourceFilter("all")
                    }
                  }}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section news-portal-list-section">
        <div className="container">
          {loading ? (
            <div className="news-grid" aria-busy="true">
              {[0, 1, 2, 3, 4, 5].map(n => (
                <div key={n} className="news-skeleton-card" />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="news-empty-state">
              <Icon name="search" />
              <h2>No encontramos noticias con ese filtro</h2>
              <p>
                Intenta con otro término de búsqueda o restablece las categorías para ver todas las
                publicaciones recientes.
              </p>
              <Button
                onClick={() => {
                  setSourceFilter("all")
                  setCategoryFilter("Todas")
                  setSearchQuery("")
                }}
              >
                Restablecer filtros
              </Button>
            </div>
          ) : (
            <>
              {featuredArticle && (
                <div className="news-featured-wrapper">
                  <NewsCard
                    article={featuredArticle}
                    featured
                    onOpenConsultation={onOpenConsultation}
                  />
                </div>
              )}

              {remainingArticles.length > 0 && (
                <div className="news-grid">
                  {remainingArticles.map(article => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      onOpenConsultation={onOpenConsultation}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <div className="news-portal-cta-banner">
            <div>
              <span className="eyebrow">ORIENTACIÓN PERSONALIZADA</span>
              <h2>¿Tienes dudas sobre cómo te afecta una nueva medida migratoria?</h2>
              <p>
                Cada caso es distinto. Nuestros orientadores revisan tu situación particular y te
                explican con claridad tus opciones reales antes de presentar cualquier documento.
              </p>
            </div>
            <div className="news-portal-cta-actions">
              <Button onClick={() => onOpenConsultation("Orientación sobre Noticias Migratorias")}>
                Solicitar evaluación de mi caso
              </Button>
              <Link href="/consulta-caso" className="button button-secondary">
                Consultar estatus en USCIS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

