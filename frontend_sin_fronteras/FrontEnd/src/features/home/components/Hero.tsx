import { useRef } from "react"
import { siteImages } from "@/data/media"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"
import ResponsiveImage from "@/shared/ui/ResponsiveImage"
import { useHeroAnimation } from "../hooks/useHeroAnimation"

interface HeroProps {
  onOpenConsultation?: () => void
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  const hero = useRef<HTMLElement>(null)
  useHeroAnimation(hero)

  return (
    <section className="hero-landing" id="inicio" ref={hero}>
      <ResponsiveImage image={siteImages.heroStatue} pictureClassName="hero-background" eager dataHeroImage />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero hero-statue container">
        <div className="hero-content">
          <span className="eyebrow" data-hero-eyebrow><span className="small-line" /> CERCA DE TI, EN CADA PASO</span>
          <h1 data-hero-title>Orientación migratoria clara, honesta <span>y a tu lado.</span></h1>
          <p data-hero-copy>Te ayudamos a entender tu camino migratorio, preparar tus trámites y coordinar el respaldo de abogados de inmigración licenciados cuando tu caso lo requiere.</p>
          <div className="hero-actions" data-hero-actions>
            <Button onClick={onOpenConsultation}>Solicita una evaluación inicial</Button>
            <a className="text-link" href="#servicios">Explora tus opciones <Icon name="arrow" /></a>
          </div>
          <div className="hero-support" data-hero-support><Icon name="check" /> Atención cercana <span>·</span> En todo Estados Unidos</div>
        </div>

        <div className="hero-visual hero-statue-space" data-hero-visual>
          <div className="photo-note" data-hero-note>
            <span className="photo-note-icon"><Icon name="heart" /></span>
            <div><strong>Tu historia importa.</strong><span>El siguiente paso lo damos contigo.</span></div>
          </div>
        </div>

        <div className="legal-note"><Icon name="shield" /><p>Te acompañamos y conectamos con profesionales. La información de este sitio es general y no constituye asesoramiento legal.</p></div>
      </div>
    </section>
  )
}
