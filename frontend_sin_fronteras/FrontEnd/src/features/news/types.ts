export type NewsSourceKind = "all" | "uscis" | "prensa"

export type NewsCategory =
  | "Alertas USCIS"
  | "Asilo y Corte"
  | "Permisos y Visas"
  | "Residencia y Ciudadanía"

export interface NewsArticle {
  id: string
  title: string
  summary: string
  publishedAt: string
  formattedDate: string
  sourceName: string
  sourceKind: "uscis" | "prensa"
  sourceUrl: string
  category: NewsCategory
  relatedService: string
  imageUrl: string
  isOfficialGov?: boolean
}

export interface NewsFeedResult {
  articles: NewsArticle[]
  fromLiveFeed: boolean
  updatedAt: string
}

