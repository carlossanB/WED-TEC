import { useState, useMemo, useEffect } from "react"
import Link from "@/app/navigation/Link"
import { useRouter } from "@/app/providers/RouterProvider"
import { contact } from "@/data/navigation"
import { servicesData, serviceCategories } from "@/data/servicesData"
import Icon from "@/shared/ui/Icon"

function getCategoryFromPath(path: string) {
  const category = new URLSearchParams(path.split("?")[1] ?? "").get("categoria")
  return serviceCategories.some(item => item.id === category) ? category! : "all"
}

export default function ServicesIndexPage() {
  const { currentPath } = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>(() => getCategoryFromPath(currentPath))
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => { setSelectedCategory(getCategoryFromPath(currentPath)) }, [currentPath])

  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
      const matchesCategory =
        selectedCategory === "all" || service.categorySlug === selectedCategory

      const matchesSearch =
        searchQuery.trim() === "" ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.keyForm.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="services-index-page">
      <section className="services-index-header">
        <div className="container">
          <nav className="service-breadcrumbs" aria-label="Ruta de navegación">
            <Link href="/" className="breadcrumb-link">
              <Icon name="back" />
              <span>Inicio</span>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current" aria-current="page">
              Catálogo de Servicios
            </span>
          </nav>

          <div className="index-title-area">
            <span className="eyebrow">CATÁLOGO COMPLETO</span>
            <h1>12 Soluciones para tu Camino Migratorio</h1>
            <p>
              Explora cada uno de nuestros servicios especializados. Haz clic en cualquiera de ellos
              para conocer sus requisitos, tiempos, beneficios y cómo te acompañamos paso a paso.
            </p>
          </div>

          <div className="services-filter-bar">
            <div className="search-input-wrapper">
              <Icon name="search" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar por trámite (ej: asilo, permiso, corte, I-130)..."
                aria-label="Buscar servicios"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Borrar búsqueda"
                >
                  <Icon name="close" />
                </button>
              )}
            </div>

            <div className="category-pills" role="tablist">
              <button
                className={`category-pill ${selectedCategory === "all" ? "is-active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                Todos ({servicesData.length})
              </button>
              {serviceCategories.map(cat => {
                const count = servicesData.filter(s => s.categorySlug === cat.id).length
                return (
                  <button
                    key={cat.id}
                    className={`category-pill ${selectedCategory === cat.id ? "is-active" : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span className="pill-count">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="services-index-grid-section">
        <div className="container">
          {filteredServices.length === 0 ? (
            <div className="no-services-found">
              <Icon name="info" />
              <h3>No se encontraron trámites coincidentes</h3>
              <p>Intenta con otros términos o limpia tu búsqueda para ver todos los servicios.</p>
              <button
                className="button button-secondary"
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchQuery("")
                }}
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="all-services-cards-grid">
              {filteredServices.map(service => (
                <article key={service.slug} className="catalog-service-card">
                  <div className="catalog-card-header">
                    <span className="catalog-icon-box">
                      <Icon name={service.icon} />
                    </span>
                    <div className="catalog-badge-group">
                      <span className="tag">{service.category}</span>
                      <span className="form-tag">{service.keyForm}</span>
                    </div>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>

                  <div className="catalog-card-footer">
                    <span className="catalog-time">
                      <Icon name="clock" /> {service.estimatedTime}
                    </span>
                    <Link href={`/servicios/${service.slug}`} className="text-link catalog-link">
                      <span>Ver página del servicio</span>
                      <Icon name="arrow" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="index-help-banner">
            <div className="help-banner-content">
              <h3>¿No encuentras el trámite exacto o tienes dudas sobre tu caso?</h3>
              <p>
                Nuestros orientadores pueden evaluar tu historial y orientarte hacia la opción legal
                más adecuada para tu situación.
              </p>
            </div>
            <div className="help-banner-actions">
              <a href={contact.tel} className="button button-primary">
                <Icon name="phone" />
                <span>Llamar {contact.phone}</span>
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="button button-whatsapp"
              >
                <Icon name="whatsapp" />
                <span>WhatsApp ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
