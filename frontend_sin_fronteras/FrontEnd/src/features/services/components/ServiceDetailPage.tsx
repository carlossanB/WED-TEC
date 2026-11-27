import { useRef, useState } from "react"
import Link from "@/app/navigation/Link"
import { siteImages } from "@/data/media"
import { contact } from "@/data/navigation"
import { getServiceBySlug } from "@/data/servicesData"
import Accordion from "@/shared/ui/Accordion"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"
import ResponsiveImage from "@/shared/ui/ResponsiveImage"
import type { ServiceDetail } from "@/types/services"
import { useAsylumSectionMotion } from "../hooks/useAsylumSectionMotion"

interface ServiceDetailPageProps {
  service: ServiceDetail
  onOpenConsultation?: (serviceTitle: string) => void
}

export default function ServiceDetailPage({
  service,
  onOpenConsultation,
}: ServiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"info" | "requisitos" | "pasos" | "documentos">("info")
  const isAsylum = service.slug === "asilo"
  const contentRef = useRef<HTMLDivElement>(null)
  useAsylumSectionMotion(contentRef, isAsylum)

  const encodedWhatsApp = encodeURIComponent(service.whatsappMessage || `Hola, me interesa el servicio de ${service.title}`)
  const whatsappUrl = `https://wa.me/19292841573?text=${encodedWhatsApp}`

  const relatedServices = service.relatedSlugs
    .map(slug => getServiceBySlug(slug))
    .filter((s): s is ServiceDetail => Boolean(s))

  return (
    <article className={`service-detail-page ${isAsylum ? "asylum-service-page" : ""}`}>
      <div className="service-breadcrumb-bar">
        <div className="container">
          <nav className="service-breadcrumbs" aria-label="Ruta de navegación">
            <Link href="/" className="breadcrumb-link">
              <Icon name="back" />
              <span>Inicio</span>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/servicios" className="breadcrumb-link">
              <span>Servicios</span>
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current" aria-current="page">
              {service.shortTitle}
            </span>
          </nav>
        </div>
      </div>

      <section className="service-hero">
        <div className="container">
          <div className="service-hero-grid">
            <div className="service-hero-main">
              <div className="service-badge-row">
                <span className="service-badge">
                  <Icon name={service.icon} />
                  <span>{service.category}</span>
                </span>
                <span className="service-form-pill">{service.keyForm}</span>
              </div>

              <h1 className="service-hero-title">{service.title}</h1>
              <p className="service-hero-subtitle">{service.description}</p>

              <div className="service-quick-meta">
                <div className="meta-card">
                  <span className="meta-icon">
                    <Icon name="clock" />
                  </span>
                  <div>
                    <strong className="meta-label">Tiempo estimado</strong>
                    <span className="meta-value">{service.estimatedTime}</span>
                  </div>
                </div>

                <div className="meta-card">
                  <span className="meta-icon">
                    <Icon name="people" />
                  </span>
                  <div>
                    <strong className="meta-label">Para quién es</strong>
                    <span className="meta-value">{service.targetAudience}</span>
                  </div>
                </div>
              </div>

              <div className="service-hero-actions">
                {onOpenConsultation ? (
                  <button
                    className="button button-primary"
                    onClick={() => onOpenConsultation(service.title)}
                  >
                    <span>Solicita una evaluación inicial</span>
                    <Icon name="arrow" />
                  </button>
                ) : (
                  <Button href={contact.tel}>
                    <span>Solicita una evaluación inicial</span>
                  </Button>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-whatsapp"
                >
                  <Icon name="whatsapp" />
                  <span>Consulta por WhatsApp ↗</span>
                </a>
              </div>
            </div>

            <aside className="service-hero-aside">
              <div className="aside-card">
                <div className="aside-card-header">
                  <span className="aside-badge">ATENCIÓN EN ESPAÑOL</span>
                  <h3>Acompañamiento Sin Fronteras</h3>
                </div>
                <p className="aside-card-desc">
                  Cada caso migratorio es único. Te brindamos un camino claro, humano y profesional
                  para proteger tu tranquilidad y la de tu familia en Estados Unidos.
                </p>

                <ul className="aside-features">
                  <li>
                    <Icon name="check" />
                    <span>Evaluación honesta y sin falsas promesas</span>
                  </li>
                  <li>
                    <Icon name="check" />
                    <span>Preparación minuciosa de cada formulario</span>
                  </li>
                  <li>
                    <Icon name="check" />
                    <span>Seguimiento continuo hasta la resolución</span>
                  </li>
                  <li>
                    <Icon name="check" />
                    <span>Atención telefónica y digital en todo el país</span>
                  </li>
                </ul>

                <div className="aside-contact-box">
                  <span className="aside-call-label">¿Prefieres llamar ahora?</span>
                  <a href={contact.tel} className="aside-phone-link">
                    <Icon name="phone" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {!isAsylum && (
        <section className="service-nav-tabs-wrapper">
          <div className="container">
            <div className="service-tabs" role="tablist">
              <button
                className={`tab-btn ${activeTab === "info" ? "is-active" : ""}`}
                onClick={() => setActiveTab("info")}
                role="tab"
                aria-selected={activeTab === "info"}
              >
                <Icon name="document" />
                <span>¿En qué consiste?</span>
              </button>
              <button
                className={`tab-btn ${activeTab === "requisitos" ? "is-active" : ""}`}
                onClick={() => setActiveTab("requisitos")}
                role="tab"
                aria-selected={activeTab === "requisitos"}
              >
                <Icon name="check" />
                <span>Requisitos de Elegibilidad</span>
              </button>
              <button
                className={`tab-btn ${activeTab === "pasos" ? "is-active" : ""}`}
                onClick={() => setActiveTab("pasos")}
                role="tab"
                aria-selected={activeTab === "pasos"}
              >
                <Icon name="arrow" />
                <span>Paso a Paso</span>
              </button>
              <button
                className={`tab-btn ${activeTab === "documentos" ? "is-active" : ""}`}
                onClick={() => setActiveTab("documentos")}
                role="tab"
                aria-selected={activeTab === "documentos"}
              >
                <Icon name="card" />
                <span>Documentos Requeridos</span>
              </button>
            </div>
          </div>
        </section>
      )}

      <div
        ref={contentRef}
        className={isAsylum ? "asylum-section-flow" : "container service-main-content"}
      >
        <section id={isAsylum ? "asylum-overview" : undefined} className={`service-section ${isAsylum ? "asylum-content-section" : activeTab === "info" ? "tab-active" : "tab-hidden"}`}>
          <div className="section-head">
            <span className="eyebrow">DETALLES DEL TRÁMITE</span>
            <h2>¿En qué consiste este proceso?</h2>
          </div>
          <div className="what-is-it-content">
            {service.whatIsIt.map((paragraph, idx) => (
              <p key={idx} className="lead-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {isAsylum && (
            <figure className="asylum-image-figure">
              <ResponsiveImage
                image={siteImages.heroFamily}
                pictureClassName="asylum-image-frame"
                imageClassName="asylum-image"
              />
            </figure>
          )}

          <div className="benefits-wrapper">
            <h3 className="subhead-title">Beneficios y derechos asociados</h3>
            <div className="benefits-grid">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="benefit-card">
                  <div className="benefit-icon">
                    <Icon name="check" />
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id={isAsylum ? "asylum-eligibility" : undefined} className={`service-section ${isAsylum ? "asylum-content-section" : activeTab === "requisitos" ? "tab-active" : "tab-hidden"}`}>
          <div className="section-head">
            <span className="eyebrow">CRITERIOS Y CONDICIONES</span>
            <h2>¿Quién es elegible para {service.shortTitle}?</h2>
            <p className="section-subtitle">
              Estos son los requisitos principales contemplados en la ley de inmigración de Estados Unidos.
            </p>
          </div>

          <div className="eligibility-list">
            {service.eligibility.map((item, idx) => (
              <div key={idx} className="eligibility-item">
                <span className="eligibility-number">{idx + 1}</span>
                <div className="eligibility-text">
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="eligibility-disclaimer">
            <Icon name="info" />
            <p>
              <strong>Importante:</strong> Aunque cumplas la mayoría de estos puntos, cada caso tiene
              particularidades. Una revisión personalizada de tus documentos y antecedentes es esencial
              antes de iniciar.
            </p>
          </div>
        </section>

        <section id={isAsylum ? "asylum-process" : undefined} className={`service-section ${isAsylum ? "asylum-content-section" : activeTab === "pasos" ? "tab-active" : "tab-hidden"}`}>
          <div className="section-head">
            <span className="eyebrow">ACOMPAÑAMIENTO INTEGRAL</span>
            <h2>Cómo trabajamos tu caso, paso a paso</h2>
            <p className="section-subtitle">
              Un proceso guiado, transparente y con comunicación constante en cada etapa.
            </p>
          </div>

          <div className="process-timeline">
            {service.processSteps.map(step => (
              <div key={step.step} className="timeline-step">
                <div className="timeline-marker">
                  <span className="step-circle">{step.step}</span>
                  <div className="step-line" />
                </div>
                <div className="timeline-body">
                  <span className="step-counter-tag">Paso {step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id={isAsylum ? "asylum-documents" : undefined} className={`service-section ${isAsylum ? "asylum-content-section" : activeTab === "documentos" ? "tab-active" : "tab-hidden"}`}>
          <div className="section-head">
            <span className="eyebrow">PREPARACIÓN DE TU EXPEDIENTE</span>
            <h2>Documentación que solemos requerir</h2>
            <p className="section-subtitle">
              Tener estos documentos organizados acelerará sustancialmente la preparación de tu caso.
            </p>
          </div>

          {isAsylum && (
            <figure className="asylum-image-figure asylum-image-figure-documents">
              <ResponsiveImage
                image={siteImages.documentSigning}
                pictureClassName="asylum-image-frame"
                imageClassName="asylum-image"
              />
              <figcaption>Imagen ilustrativa · documentos y preparación del expediente</figcaption>
            </figure>
          )}

          <div className="documents-grid">
            {service.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="document-card">
                <div className="doc-icon">
                  <Icon name="document" />
                </div>
                <p>{doc}</p>
              </div>
            ))}
          </div>

          <div className="documents-note">
            <Icon name="shield" />
            <div>
              <strong>¿Te falta algún documento?</strong>
              <p>
                No te detengas: te ayudamos a tramitar certificados, traducciones al inglés y
                declaraciones sustitutas siempre que la ley lo permita.
              </p>
            </div>
          </div>
        </section>

        {service.faqs && service.faqs.length > 0 && (
          <section className="service-faq-section">
            <div className="section-head">
              <span className="eyebrow">DUDAS COMUNES</span>
              <h2>Preguntas Frecuentes sobre {service.shortTitle}</h2>
            </div>

            <div className="service-faq-list">
              {service.faqs.map((faq, idx) => (
                <Accordion key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </section>
        )}

        <section className="service-cta-card">
          <div className="cta-card-content">
            <span className="cta-eyebrow">ESTAMOS AQUÍ PARA TI</span>
            <h2>¿Listo para dar el siguiente paso con tu {service.shortTitle}?</h2>
            <p>
              Conversemos sobre tu situación en un espacio seguro y confidencial. Resolveremos tus
              dudas y te diremos con total transparencia cuáles son tus mejores alternativas legales.
            </p>

            <div className="cta-button-group">
              <a href={contact.tel} className="button button-primary">
                <Icon name="phone" />
                <span>Llamar al {contact.phone}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="button button-whatsapp"
              >
                <Icon name="whatsapp" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="related-services-section">
            <div className="section-head-row">
              <div>
                <span className="eyebrow">SERVICIOS COMPLEMENTARIOS</span>
                <h2>Otros trámites que te pueden interesar</h2>
              </div>
              <Link href="/servicios" className="text-link">
                <span>Ver todos los 12 servicios</span>
                <Icon name="arrow" />
              </Link>
            </div>

            <div className="related-grid">
              {relatedServices.map(rel => (
                <article key={rel.slug} className="related-card">
                  <div className="card-top">
                    <span className="icon-box">
                      <Icon name={rel.icon} />
                    </span>
                    <span className="tag">{rel.category}</span>
                  </div>
                  <h3>{rel.title}</h3>
                  <p>{rel.summary}</p>
                  <Link
                    href={`/servicios/${rel.slug}`}
                    className="text-link"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    <span>Ver detalles</span>
                    <Icon name="arrow" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="service-legal-disclaimer">
          <p>
            <strong>Aviso Legal y Transparencia:</strong> La información contenida en esta página tiene fines
            estrictamente informativos y orientativos, no constituyendo asesoramiento jurídico vinculante. Cada caso
            posee circunstancias particulares que requieren evaluación individual por parte de un profesional
            calificado antes de presentar cualquier solicitud ante USCIS o la Corte de Inmigración.
          </p>
        </div>
      </div>
    </article>
  )
}
