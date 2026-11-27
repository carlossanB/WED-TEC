import { useEffect, useRef, useState } from "react"
import Link from "@/app/navigation/Link"
import { navigation } from "@/data/navigation"
import { servicesData } from "@/data/servicesData"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenConsultation?: () => void
}

export default function MobileMenu({ isOpen, onClose, onOpenConsultation }: MobileMenuProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) closeRef.current?.focus()
    else setServicesExpanded(false)
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        className={`mobile-menu-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={onClose}
        aria-label="Cerrar navegación móvil"
        tabIndex={isOpen ? 0 : -1}
        aria-hidden={!isOpen}
      />
      <nav
        id="mobile-navigation"
        className={`mobile-menu ${isOpen ? "is-open" : ""}`}
        aria-label="Navegación móvil"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="mobile-menu-heading">
          <span>Explora Sin Fronteras</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar menú">
            <Icon name="close" />
          </button>
        </div>
        {navigation.map(([label, href]) => {
          if (label === "Servicios") {
            return (
              <div key={label} className="mobile-nav-services-group">
                <button
                  type="button"
                  className="mobile-services-toggle"
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  aria-expanded={servicesExpanded}
                >
                  <span>Servicios (12)</span>
                  <Icon
                    name="chevron"
                    className={`mobile-chevron ${servicesExpanded ? "chevron-rotated" : ""}`}
                  />
                </button>

                <div className={`mobile-services-sublist ${servicesExpanded ? "is-open" : ""}`} inert={!servicesExpanded}>
                  <Link
                    href="/servicios"
                    className="mobile-service-subitem mobile-service-all"
                    onClick={onClose}
                  >
                    <Icon name="search" />
                    <strong>Ver catálogo completo</strong>
                  </Link>

                  {servicesData.map(service => (
                    <Link
                      key={service.slug}
                      href={`/servicios/${service.slug}`}
                      className="mobile-service-subitem"
                      onClick={onClose}
                    >
                      <Icon name={service.icon} />
                      <div className="mobile-subitem-info">
                        <span>{service.shortTitle}</span>
                        <small>{service.keyForm}</small>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <Link href={href} key={label} onClick={onClose} className="mobile-nav-link">
              {label}
            </Link>
          )
        })}

        <div className="mobile-menu-actions">
          <Button onClick={onOpenConsultation}>Solicita una evaluación inicial</Button>
        </div>
      </nav>
    </>
  )
}
