import { faq } from "@/data/faq"
import Accordion from "@/shared/ui/Accordion"
import Icon from "@/shared/ui/Icon"
import SectionHeading from "@/shared/ui/SectionHeading"

export default function FAQ() {
  return (
    <section className="section container faq-grid" id="recursos" data-reveal>
      <div id="faq" aria-hidden="true" style={{ position: "relative", top: "-90px", display: "block", visibility: "hidden" }} />
      <div>
        <SectionHeading
          eyebrow="INFORMACIÓN QUE ORIENTA"
          title="Tus preguntas\nson un buen comienzo."
          description="Respuestas generales para acercarte a tu siguiente paso."
        />
        <a href="#contacto" className="text-link">Hablemos de tus dudas <Icon name="arrow" /></a>
      </div>
      <div id="preguntas-frecuentes">
        {faq.map(item => <Accordion key={item.question} {...item} />)}
      </div>
    </section>
  )
}
