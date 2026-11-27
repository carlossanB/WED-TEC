import Link from "@/app/navigation/Link"
import { needs } from "@/data/services"
import Icon from "@/shared/ui/Icon"

export default function NeedShortcuts() {
  return (
    <section className="needs-section" data-reveal aria-labelledby="needs-heading-title">
      <div className="container">
        <div className="needs-heading">
          <span className="eyebrow">
            <span className="small-line" /> EMPECEMOS POR TI · PUNTO DE PARTIDA
          </span>
          <div className="needs-heading-main">
            <h2 id="needs-heading-title">¿Qué necesitas hoy?</h2>
            <p>
              No tienes que conocer el nombre técnico del formulario. Elige tu situación actual para
              ir directo al trámite que te corresponde.
            </p>
          </div>
        </div>

        <div className="needs-grid">
          {needs.map(need => (
            <Link href={`/servicios/${need.slug}`} key={need.slug} className="need-card">
              <div className="need-card-icon">
                <Icon name={need.icon} />
              </div>
              <div className="need-card-body">
                <strong>{need.title}</strong>
                <small>{need.subtitle}</small>
              </div>
              <span className="need-card-arrow" aria-hidden="true">
                <Icon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
