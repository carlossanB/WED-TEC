import { useRef } from "react"
import Link from "@/app/navigation/Link"
import servicesBanner from "@/assets/images/optimized/banner-seccion-servicios.webp"
import { siteImages } from "@/data/media"
import Icon from "@/shared/ui/Icon"
import ResponsiveImage from "@/shared/ui/ResponsiveImage"
import { useServicesMotion } from "../hooks/useServicesMotion"

const topics = [
  { label: "Todos los servicios", icon: "columns", href: "/servicios" },
  { label: "Protección", icon: "shield", href: "/servicios?categoria=proteccion" },
  { label: "Familia", icon: "people", href: "/servicios?categoria=familia-alivio" },
  { label: "Estatus y trabajo", icon: "briefcase", href: "/servicios?categoria=estatus-trabajo" },
  { label: "Defensa en corte", icon: "scale", href: "/servicios?categoria=defensa-corte" },
]

const serviceCategories = [
  {
    title: "Protección y defensa",
    description: "Orientación para asilo, protección humanitaria y procesos ante la corte.",
    examples: [
      { label: "Asilo", href: "/servicios/asilo" },
      { label: "Visa U", href: "/servicios/visa-u" },
      { label: "Defensa en corte", href: "/servicios/representante-en-corte" },
    ],
    icon: "shield",
    image: siteImages.trustCouple,
    href: "/servicios?categoria=proteccion",
  },
  {
    title: "Familia y alivio legal",
    description: "Alternativas para reunificación familiar, residencia y alivio migratorio.",
    examples: [
      { label: "Peticiones familiares", href: "/servicios/peticion-familiar" },
      { label: "Ajuste de estatus", href: "/servicios/ajuste-de-estatus" },
      { label: "Perdones", href: "/servicios/waiver-perdon-migratorio" },
    ],
    icon: "people",
    image: siteImages.heroFamily,
    href: "/servicios?categoria=familia-alivio",
  },
  {
    title: "Estatus, trabajo y ciudadanía",
    description: "Información para trabajar, obtener residencia y avanzar hacia la ciudadanía.",
    examples: [
      { label: "Permiso de trabajo", href: "/servicios/permiso-de-trabajo" },
      { label: "Naturalización", href: "/servicios/naturalizacion" },
      { label: "Residencia", href: "/servicios/ajuste-de-estatus" },
    ],
    icon: "briefcase",
    image: siteImages.statusFamily,
    href: "/servicios?categoria=estatus-trabajo",
  },
]

export default function FeaturedServices() {
  const section = useRef<HTMLElement>(null)
  useServicesMotion(section)

  return (
    <section className="services-showcase" id="servicios" ref={section} aria-labelledby="featured-services-title">
      <div className="services-showcase-banner">
        <img src={servicesBanner} width="2048" height="768" alt="" loading="lazy" decoding="async" />
        <div className="container services-showcase-banner-content" data-services-intro>
          <span className="eyebrow">NUESTROS SERVICIOS</span>
          <h2 id="featured-services-title">Explora las opciones que<br />se ajustan a <span>tu situación</span></h2>
          <p>Cada proceso migratorio es único. Por eso, te ofrecemos una variedad de servicios diseñados para acompañarte en cada etapa de tu proyecto.</p>
          <Link href="/servicios" className="services-banner-link">
            Ver todos los servicios <Icon name="arrow" />
          </Link>
        </div>
      </div>

      <div className="container services-showcase-body">
        <nav className="services-topic-nav" aria-label="Explorar servicios por tema" data-services-topics>
          {topics.map((topic, index) => (
            <Link key={topic.label} href={topic.href} className={`services-topic-pill${index === 0 ? " is-featured" : ""}`}>
              <Icon name={topic.icon} />
              <span>{topic.label}</span>
            </Link>
          ))}
        </nav>

        <div className="service-category-grid">
          {serviceCategories.map(category => (
            <article className="service-category-card" data-service-category key={category.title}>
              <div className="service-category-media">
                <ResponsiveImage image={category.image} pictureClassName="editorial-media" />
              </div>
              <div className="service-category-content">
                <span className="icon-box"><Icon name={category.icon} /></span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <ul aria-label={`Ejemplos de ${category.title}`}>
                  {category.examples.map(example => (
                    <li key={example.label}><Link href={example.href}>{example.label}</Link></li>
                  ))}
                </ul>
                <Link href={category.href} className="text-link">
                  <span>Ver más</span><Icon name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <svg className="services-showcase-wave" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 18C280 64 512 94 770 94c249 0 454-34 670-72v74H0Z" />
      </svg>
    </section>
  )
}
