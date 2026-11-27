import { NEWS_CATEGORY_IMAGES } from "@/data/newsData"
import Icon from "@/shared/ui/Icon"
import type { NewsArticle } from "../types"

interface NewsCardProps {
  article: NewsArticle
  featured?: boolean
  onOpenConsultation: (serviceTitle: string) => void
}

export default function NewsCard({
  article,
  featured = false,
  onOpenConsultation,
}: NewsCardProps) {
  const fallbackImage = NEWS_CATEGORY_IMAGES[article.category]

  return (
    <article className={`news-card ${featured ? "news-card--featured" : ""}`}>
      <div className="news-card-media">
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={e => {
            if (e.currentTarget.src !== fallbackImage) {
              e.currentTarget.src = fallbackImage
            }
          }}
        />
        <span className="news-card-category-badge">{article.category}</span>
      </div>

      <div className="news-card-body">
        <div className="news-card-meta">
          <span
            className={`news-source-pill ${
              article.isOfficialGov ? "news-source-pill--gov" : "news-source-pill--press"
            }`}
          >
            <Icon name={article.isOfficialGov ? "shield" : "globe"} />
            {article.sourceName}
          </span>
          <time className="news-card-date" dateTime={article.publishedAt}>
            <Icon name="clock" />
            {article.formattedDate}
          </time>
        </div>

        <h3 className="news-card-title">
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`Leer nota completa en ${article.sourceName}`}
          >
            {article.title}
          </a>
        </h3>

        <p className="news-card-summary">{article.summary}</p>

        <div className="news-card-footer">
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="news-external-link"
          >
            <span>Leer en {article.sourceName}</span>
            <Icon name="external" />
          </a>

          <button
            type="button"
            className="news-consult-btn"
            onClick={() => onOpenConsultation(article.relatedService)}
          >
            <span>¿Te afecta? Consultar</span>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </article>
  )
}

