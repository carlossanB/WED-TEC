import Link from "@/app/navigation/Link"
import Icon from "@/shared/ui/Icon"
import type { Service } from "@/types/content"

interface ExtendedService extends Service {
  slug?: string
  badge?: string
}

export default function ServiceCard({
  service,
}: {
  service: ExtendedService
  onSelect?: (title: string) => void
}) {
  const serviceSlug = service.slug || service.id

  return (
    <article className="service-card" id={service.id} data-reveal>
      <div className="card-top">
        <span className="icon-box">
          <Icon name={service.icon} />
        </span>
        <span className="tag">{service.category}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="service-card-actions">
        <Link
          href={`/servicios/${serviceSlug}`}
          className="text-link"
          aria-label={`Ver página completa de ${service.title}`}
        >
          <span>Conoce más</span>
          <Icon name="arrow" />
        </Link>
      </div>
    </article>
  )
}
