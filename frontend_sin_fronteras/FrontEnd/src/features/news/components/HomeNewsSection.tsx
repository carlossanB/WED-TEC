import { useEffect, useState } from "react"
import Link from "@/app/navigation/Link"
import Icon from "@/shared/ui/Icon"
import SectionHeading from "@/shared/ui/SectionHeading"
import { fetchImmigrationNews } from "../services/newsService"
import type { NewsArticle, NewsSourceKind } from "../types"
import NewsCard from "./NewsCard"

interface HomeNewsSectionProps {
  onOpenConsultation: (serviceTitle: string) => void
}

export default function HomeNewsSection({ onOpenConsultation }: HomeNewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [sourceFilter, setSourceFilter] = useState<NewsSourceKind>("all")
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchImmigrationNews()
      .then(res => {
        if (!mounted) return
        setArticles(res.articles)
        setIsLive(res.fromLiveFeed)
        setLoading(false)
      })
      .catch(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const filtered = articles
    .filter(item => (sourceFilter === "all" ? true : item.sourceKind === sourceFilter))
    .slice(0, 3)

  return (
    <section className="section news-home-section" id="noticias">
      <div className="container">
        <div className="news-home-header">
          <SectionHeading
            eyebrow="ACTUALIDAD MIGRATORIA · FUENTES OFICIALES Y PRENSA"
            title="Noticias y alertas que pueden impactar tu proceso"
            description="Monitoreamos comunicados oficiales de USCIS.gov y medios reconocidos en español para mantenerte al día sobre cambios en permisos, asilo, corte y residencia."
          />

          <div className="news-filter-tabs" role="tablist" aria-label="Filtrar noticias por fuente">
            <button
              type="button"
              role="tab"
              aria-selected={sourceFilter === "all"}
              className={`news-tab-btn ${sourceFilter === "all" ? "is-active" : ""}`}
              onClick={() => setSourceFilter("all")}
            >
              Todas las fuentes
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
        </div>

        {loading ? (
          <div className="news-grid" aria-busy="true">
            {[0, 1, 2].map(item => (
              <div key={item} className="news-skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="news-grid">
            {filtered.map(article => (
              <NewsCard
                key={article.id}
                article={article}
                onOpenConsultation={onOpenConsultation}
              />
            ))}
          </div>
        )}

        <div className="news-home-bottom-bar">
          <div className="news-live-status">
            <span className={`news-status-dot ${isLive ? "is-live" : ""}`} />
            <span>
              {isLive
                ? "Sincronizado en tiempo real con canales oficiales de USCIS.gov y prensa nacional"
                : "Mostrando boletines verificados de USCIS.gov, La Opinión, El Diario NY y Conexión Migrante"}
            </span>
          </div>

          <Link href="/noticias" className="button button-primary news-portal-cta">
            <span>Explorar portal de noticias completo</span>
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  )
}

