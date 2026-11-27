import Icon from "@/shared/ui/Icon"
import SectionHeading from "@/shared/ui/SectionHeading"

export default function Testimonials() {
  return (
    <section className="stories-section" id="historias" data-reveal>
      <div className="container stories-grid">
        <SectionHeading
          eyebrow="HISTORIAS REALES"
          title="Detrás de cada proceso,\nhay una historia."
          description="Un espacio para escuchar experiencias compartidas con autorización y respeto por cada persona."
        />
        <div className="testimonial-placeholder">
          <span className="placeholder-label">CONTENIDO DE MUESTRA</span>
          <span className="play-placeholder"><Icon name="play" /></span>
          <h3>Testimonio pendiente de aprobación</h3>
          <p>Publicaremos aquí material autorizado.<br />Sin nombres ni resultados de muestra.</p>
        </div>
      </div>
    </section>
  )
}
