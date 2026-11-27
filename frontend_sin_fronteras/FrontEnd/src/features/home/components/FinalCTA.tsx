import { contact } from "@/data/navigation"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"

interface FinalCTAProps {
  onOpenConsultation?: () => void
}

export default function FinalCTA({ onOpenConsultation }: FinalCTAProps) {
  return (
    <section className="final-section" id="contacto" data-reveal>
      <div className="container final-inner">
        <div>
          <span className="eyebrow">ESTAMOS PARA ESCUCHARTE</span>
          <h2>Tu próximo paso<br />puede empezar hoy.</h2>
          <p>Conversemos con claridad sobre lo que necesitas y cómo puedes avanzar.</p>
        </div>
        <div className="final-actions">
          <Button onClick={onOpenConsultation}>Solicita una evaluación inicial</Button>
          <a href={contact.tel}><Icon name="phone" />{contact.phone}</a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" style={{ color: "#25D366" }} />
            Escríbenos por WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <small>Información general. Cada situación requiere una revisión individual.</small>
        </div>
      </div>
    </section>
  )
}
