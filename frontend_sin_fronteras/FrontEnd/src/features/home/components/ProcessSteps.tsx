import { useRef } from "react"
import { siteImages } from "@/data/media"
import ResponsiveImage from "@/shared/ui/ResponsiveImage"
import SectionHeading from "@/shared/ui/SectionHeading"
import { useProcessProgress } from "../hooks/useProcessProgress"

const steps = [
  ["Cuéntanos qué necesitas.", "Te escuchamos con respeto para entender qué te preocupa y qué apoyo buscas."],
  ["Revisamos contigo las opciones disponibles.", "Te ayudamos a orientarte con información clara, sin promesas ni respuestas universales."],
  ["Te conectamos con el apoyo adecuado para avanzar.", "Te acercamos a profesionales y recursos apropiados para tu situación."],
  ["Acompañamos tu siguiente paso.", "Te ayudamos a mantener claridad sobre documentos, fechas y próximos avances."],
]

export default function ProcessSteps() {
  const process = useRef<HTMLElement>(null)
  useProcessProgress(process)

  return (
    <section className="process-section" id="acompanamiento" ref={process}>
      <div className="container">
        <div className="process-intro">
          <SectionHeading eyebrow="CÓMO TE ACOMPAÑAMOS" title="Un siguiente paso, con más claridad." description="No tienes que recorrer este camino sin orientación." />
          <div className="process-media" data-editorial-image>
            <ResponsiveImage image={siteImages.documentSigning} pictureClassName="editorial-media" />
            <span>Revisamos cada documento contigo.</span>
          </div>
        </div>
        <div className="steps-grid">
          {steps.map(([title, description], index) => (
            <article key={title} data-process-step>
              {index < steps.length - 1 && <span className="process-progress" aria-hidden="true"><span data-process-progress /></span>}
              <span className="step-number">0{index + 1}</span>
              <div className="step-copy">
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
