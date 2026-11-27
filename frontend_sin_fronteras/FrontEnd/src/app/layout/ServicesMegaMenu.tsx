import Link from "@/app/navigation/Link"
import { contact } from "@/data/navigation"
import { servicesData, serviceCategories } from "@/data/servicesData"
import Icon from "@/shared/ui/Icon"

interface ServicesMegaMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function ServicesMegaMenu({ isOpen, onClose }: ServicesMegaMenuProps) {
  if (!isOpen) return null

  return (
    <div
      className="services-mega-menu"
      role="menu"
      aria-label="Catálogo de servicios migratorios"
      onMouseLeave={onClose}
    >
      <div className="mega-menu-inner">
        <div className="mega-menu-topbar">
          <div className="mega-menu-headline">
            <span className="mega-menu-badge">12 SERVICIOS ESPECIALIZADOS</span>
            <h4>Encuentra el trámite exacto para tu caso migratorio</h4>
          </div>
          <Link href="/servicios" className="mega-menu-all-link" onClick={onClose}>
            <span>Ver catálogo completo</span>
            <Icon name="arrow" />
          </Link>
        </div>

        <div className="mega-menu-grid">
          {serviceCategories.map(category => {
            const catServices = servicesData.filter(s => s.categorySlug === category.id)
            return (
              <div key={category.id} className="mega-menu-column">
                <div className="mega-menu-cat-header">
                  <div className="cat-icon-wrap">
                    <Icon name={category.icon} />
                  </div>
                  <div>
                    <h5>{category.name}</h5>
                    <p>{category.description}</p>
                  </div>
                </div>

                <ul className="mega-menu-list">
                  {catServices.map(service => (
                    <li key={service.slug}>
                      <Link
                        href={`/servicios/${service.slug}`}
                        className="mega-menu-item"
                        onClick={onClose}
                      >
                        <div className="item-icon-wrap">
                          <Icon name={service.icon} />
                        </div>
                        <div className="item-content">
                          <strong className="item-title">{service.shortTitle}</strong>
                          <span className="item-form">{service.keyForm}</span>
                        </div>
                        <Icon name="arrow" className="item-arrow" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mega-menu-footer">
          <div className="mega-footer-text">
            <Icon name="chat" />
            <span>
              ¿No estás seguro de cuál trámite necesitas? <strong>Te orientamos sin compromiso.</strong>
            </span>
          </div>
          <div className="mega-footer-actions">
            <a href={contact.tel} className="mega-quick-btn">
              <Icon name="phone" />
              <span>{contact.phone}</span>
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mega-quick-btn mega-quick-whatsapp"
            >
              <Icon name="whatsapp" />
              <span>WhatsApp Inmediato ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
