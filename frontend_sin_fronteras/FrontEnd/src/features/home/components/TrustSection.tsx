import { useRef } from "react"
import { siteImages } from "@/data/media"
import Icon from "@/shared/ui/Icon"
import ResponsiveImage from "@/shared/ui/ResponsiveImage"
import { useTrustMotion } from "../hooks/useTrustMotion"

const reasons = [
  ["people",   "Acompañamiento humano",         "Atención cercana y escucha respetuosa."],
  ["shield",   "Transparencia en cada paso",    "Información clara desde el principio."],
  ["globe",    "Atención desde cualquier lugar","Estamos en todo Estados Unidos."],
  ["document", "Tu proceso organizado",         "Claridad sobre documentos y próximos pasos."],
] as const

export default function TrustSection() {
  const section = useRef<HTMLElement>(null)
  useTrustMotion(section)

  return (
    <section className="trust-section" id="confianza" ref={section}>
      {/* Glows */}
      <div className="trust-glow trust-glow-one" aria-hidden="true" />
      <div className="trust-glow trust-glow-two" aria-hidden="true" />

      {/* Olas animadas */}
      <div className="trust-waves" aria-hidden="true">
        <svg className="trust-wave trust-wave-1" viewBox="0 0 1440 170" preserveAspectRatio="none">
          <path d="M0,80 C180,140 360,20 540,80 C720,140 900,20 1080,80 C1260,140 1380,60 1440,80 L1440,170 L0,170 Z" />
        </svg>
        <svg className="trust-wave trust-wave-2" viewBox="0 0 1440 170" preserveAspectRatio="none">
          <path d="M0,100 C240,30 480,150 720,90 C960,30 1200,140 1440,100 L1440,170 L0,170 Z" />
        </svg>
        <svg className="trust-wave trust-wave-3" viewBox="0 0 1440 170" preserveAspectRatio="none">
          <path d="M0,50 C300,130 600,10 900,70 C1080,110 1300,40 1440,90 L1440,170 L0,170 Z" />
        </svg>
      </div>

      <div className="container trust-inner">

        {/* ── Columna izquierda: texto + imagen ── */}
        <div className="trust-story" data-trust-intro>
          <span className="eyebrow trust-eyebrow">
            <span className="trust-eyebrow-line" aria-hidden="true" />
            PERSONAS ANTES QUE PROCESOS
          </span>

          <h2>
            La confianza empieza<br />
            por cómo te <span className="trust-accent">acompañamos.</span>
          </h2>

          <p>
            Información clara, atención respetuosa y acompañamiento
            para que no tengas que recorrer este camino a solas.
          </p>

          {/* Imagen con caption bar */}
          <div className="trust-visual" data-trust-image>
            <ResponsiveImage image={siteImages.trustCouple} pictureClassName="editorial-media" />
            <div className="trust-visual-caption">
              <span className="trust-visual-caption-text">
                <Icon name="shield" />
                Un acompañamiento más humano.
              </span>
              <span className="trust-visual-dots">
                <span className="trust-visual-counter">01 — 04</span>
                <span className="trust-dots" aria-hidden="true">
                  <span className="trust-dot is-active" />
                  <span className="trust-dot" />
                  <span className="trust-dot" />
                  <span className="trust-dot" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Columna derecha: 4 cards horizontales ── */}
        <div className="trust-reasons">
          {reasons.map(([icon, title, description]) => (
            <article className="trust-card" key={title} data-trust-reason>
              <span className="trust-card-icon" aria-hidden="true">
                <Icon name={icon} />
              </span>
              <div className="trust-card-body">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
