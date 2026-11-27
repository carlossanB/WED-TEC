import { contact } from "@/data/navigation"
import Icon from "@/shared/ui/Icon"
import type { CaseLookupResult } from "../types"

interface CaseResultBubbleProps {
  data: CaseLookupResult
  onOpenConsultation: () => void
}

export default function CaseResultBubble({
  data,
  onOpenConsultation,
}: CaseResultBubbleProps) {
  const isApproved =
    data.status.toLowerCase().includes("approv") ||
    data.statusTitle?.toLowerCase().includes("aprobad")

  return (
    <div className="cl-bubble-wrap">
      <div className="cl-bubble-avatar">
        <Icon name="shield" />
      </div>

      <div className="cl-bubble-body">
        <div className="cl-bubble-source">
          <span className="cl-bubble-source-dot" />
          Resultado oficial de USCIS.gov
        </div>

        <div className="cl-result-card">
          <div className="cl-result-header">
            <div className="cl-result-badges">
              <span className="cl-receipt-badge">{data.receiptNumber}</span>
              <span className="cl-form-badge">{data.formType}</span>
            </div>
            <div className="cl-status-badge">
              <Icon name="check" />
              {data.statusTitle || data.status}
            </div>
          </div>

          <div className="cl-result-section">
            <h3 className="cl-section-label">Descripción del estado</h3>
            <p>{data.statusDetails}</p>
            {data.lastUpdated && (
              <small className="cl-last-updated">
                ◦ Última actualización: {data.lastUpdated}
              </small>
            )}
          </div>

          {data.history.length > 0 && (
            <div className="cl-result-section">
              <h3 className="cl-section-label">
                Historial de eventos{" "}
                <span className="cl-history-count">{data.history.length}</span>
              </h3>
              <ol className="cl-timeline">
                {data.history.map((milestone, i) => (
                  <li key={i} className={`cl-timeline-item ${i === 0 ? "cl-timeline-item--first" : ""}`}>
                    <div className="cl-timeline-dot" />
                    <div className="cl-timeline-content">
                      <strong>{milestone.description || "—"}</strong>
                      {milestone.date && <time>{milestone.date}</time>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="cl-result-footer">
            <span className="cl-result-source">
              <Icon name="shield" />
              Servicio de Ciudadanía e Inmigración de EE. UU.
            </span>
            <a href="https://www.uscis.gov" target="_blank" rel="noreferrer" aria-label="Ver en USCIS">
              <Icon name="external" />
            </a>
          </div>
        </div>

        <div className="cl-interpretation-inline">
          <div className="cl-interpretation-inline-header">
            <Icon name="document" />
            <strong>¿Qué significa este estado?</strong>
          </div>
          <p>
            {data.statusTitle || data.status}
            {isApproved
              ? ". ¡Tu petición fue aprobada! Ahora debes seguir las instrucciones de tu aviso."
              : ". Revisa los detalles de tu caso a continuación."}
          </p>
          {isApproved ? (
            <ul className="cl-next-steps-list">
              <li><Icon name="check" />Revisa tu aviso de aprobación.</li>
              <li><Icon name="check" />Sigue las instrucciones y guarda una copia del aviso.</li>
              <li><Icon name="check" />Consulta los próximos pasos con un asesor.</li>
            </ul>
          ) : (
            <ul className="cl-next-steps-list">
              <li><Icon name="check" />Lee detenidamente el estado de tu caso.</li>
              <li><Icon name="check" />Consulta con un asesor si tienes dudas.</li>
              <li><Icon name="check" />Mantén tu información de contacto actualizada con USCIS.</li>
            </ul>
          )}
          <a
            href="https://www.uscis.gov"
            target="_blank"
            rel="noreferrer"
            className="cl-uscis-link"
          >
            Más información en USCIS
            <Icon name="external" />
          </a>
        </div>

        <div className="cl-advisor-card">
          <div className="cl-advisor-eyebrow">
            <span className="cl-advisor-line" />
            No tienes que hacerlo solo
          </div>
          <h2>¿Dudas sobre los<br />próximos pasos?</h2>
          <p>Estamos aquí para escucharte y ayudarte a seguir con confianza.</p>
          <button type="button" className="cl-advisor-btn" onClick={onOpenConsultation}>
            Habla con un asesor
            <Icon name="arrow" />
          </button>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="cl-advisor-whatsapp">
            <Icon name="whatsapp" />
            También por WhatsApp
            <Icon name="arrow" />
          </a>
          <small className="cl-advisor-footnote">
            <Icon name="heart" />
            Tu tranquilidad es parte del proceso.
          </small>
        </div>
      </div>
    </div>
  )
}
