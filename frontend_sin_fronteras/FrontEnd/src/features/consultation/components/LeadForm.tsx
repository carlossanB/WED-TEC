import { useState, type FormEvent } from "react"
import Link from "@/app/navigation/Link"
import { contact } from "@/data/navigation"
import { services, additionalServices } from "@/data/services"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"
import { submitLead } from "../services/leadService"
import type { FormStatus, LeadFormData, UrgencyLevel } from "../types"
import { validateLeadForm, type FormValidationErrors } from "../utils/validateLeadForm"

interface LeadFormProps {
  initialService?: string
  onClose: () => void
}

export default function LeadForm({ initialService = "", onClose }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: "",
    contact: "",
    service: initialService,
    urgency: "media",
    location: "",
    description: "",
    consent: false,
  })

  const [errors, setErrors] = useState<FormValidationErrors>({})
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const allAvailableServices = [
    ...services.map(s => s.title),
    ...additionalServices.map(s => s.title),
  ]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (status === "submitting") return

    const validation = validateLeadForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setErrorMessage("Por favor revisa los campos señalados antes de continuar.")
      return
    }

    try {
      setStatus("submitting")
      setErrors({})
      setErrorMessage("")
      await submitLead(formData)
      setStatus("success")
    } catch (err: unknown) {
      setStatus("error")
      const rawMsg = err instanceof Error ? err.message : ""
      const isNetworkError =
        !rawMsg ||
        rawMsg.includes("Failed to fetch") ||
        rawMsg.includes("NetworkError") ||
        rawMsg.includes("Network request failed") ||
        rawMsg.includes("Load failed")

      const msg = isNetworkError
        ? "No se pudo conectar con el servidor backend (puerto 3001). Asegúrate de iniciar el backend (`pnpm dev` en BackendSinFronteras) o comunícate directamente por WhatsApp o teléfono."
        : rawMsg || "Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo o llámanos directamente."
      setErrorMessage(msg)
    }
  }

  const handleFieldChange = <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
    if (errorMessage) {
      setErrorMessage("")
    }
  }

  if (status === "success") {
    const isAlta = formData.urgency === "alta"

    return (
      <div className="lead-form-success" role="alert" aria-live="polite">
        <div className="lead-success-icon">
          <Icon name="check" />
        </div>
        <h3>{isAlta ? "¡Solicitud prioritaria recibida!" : "¡Hemos recibido tu solicitud!"}</h3>
        <p>
          Gracias, <strong>{formData.fullName}</strong>. {isAlta
            ? "Debido a la urgencia alta de tu trámite, tu caso ha ingresado a nuestra cola de atención preferencial. Un orientador revisará los datos preliminares y se comunicará contigo a la brevedad dentro de nuestro horario hábil."
            : `Un orientador revisará los detalles preliminares de tu caso y se comunicará contigo al contacto proporcionado (${formData.contact}) dentro de nuestro horario hábil.`
          }
        </p>

        <div className="lead-success-details">
          <strong>Resumen de tu solicitud:</strong>
          <div>Trámite de interés: {formData.service || "Orientación general"}</div>
          <div>Nivel de urgencia: {formData.urgency.toUpperCase()}</div>
          {formData.location && <div>Ubicación: {formData.location}</div>}
        </div>

        {isAlta && (
          <div className="lead-urgent-actions" style={{ margin: "16px 0", padding: "14px 16px", background: "rgba(0, 46, 127, 0.06)", borderRadius: "8px", border: "1px solid rgba(0, 46, 127, 0.16)" }}>
            <p style={{ margin: "0 0 10px 0", fontSize: "12.5px", color: "var(--heading)", fontWeight: 650 }}>
              ¿Plazo urgente o necesitas respuesta inmediata? Comunícate de forma directa:
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="button button-primary" style={{ minHeight: "38px", fontSize: "11px", padding: "0 14px" }}>
                <Icon name="whatsapp" /> Escribir por WhatsApp
              </a>
              <a href={contact.tel} className="button button-secondary" style={{ minHeight: "38px", fontSize: "11px", padding: "0 14px" }}>
                <Icon name="phone" /> {contact.phone}
              </a>
            </div>
          </div>
        )}

        <div className="lead-form-actions" style={{ width: "100%" }}>
          <Button onClick={onClose}>Cerrar y volver al sitio</Button>
        </div>

        {!isAlta && (
          <div className="lead-form-direct-contact" style={{ marginTop: "16px" }}>
            <span>¿Es un caso urgente?</span>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" /> Escríbenos por WhatsApp directo
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: "10px 14px",
            borderRadius: "6px",
            background: "rgba(217, 56, 58, 0.1)",
            color: "#d9383a",
            fontSize: "12.5px",
            border: "1px solid rgba(217, 56, 58, 0.25)",
          }}
        >
          {errorMessage}
        </div>
      )}

      <div className="lead-form-group">
        <label className="lead-form-label" htmlFor="lead-name">
          <span>Nombre completo <span className="required-mark" aria-hidden="true">*</span></span>
        </label>
        <input
          id="lead-name"
          type="text"
          className={`lead-form-input ${errors.fullName ? "is-invalid" : ""}`}
          placeholder="Ej. María Elena González"
          required
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "lead-name-error" : undefined}
          value={formData.fullName}
          onChange={e => handleFieldChange("fullName", e.target.value)}
          disabled={status === "submitting"}
          autoComplete="name"
        />
        {errors.fullName && (
          <span id="lead-name-error" className="lead-field-error" role="alert">
            {errors.fullName}
          </span>
        )}
      </div>

      <div className="lead-form-group">
        <label className="lead-form-label" htmlFor="lead-contact">
          <span>Teléfono o correo electrónico <span className="required-mark" aria-hidden="true">*</span></span>
        </label>
        <input
          id="lead-contact"
          type="text"
          className={`lead-form-input ${errors.contact ? "is-invalid" : ""}`}
          placeholder="Ej. (555) 234-5678 o tu-correo@ejemplo.com"
          required
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={errors.contact ? "lead-contact-error" : undefined}
          value={formData.contact}
          onChange={e => handleFieldChange("contact", e.target.value)}
          disabled={status === "submitting"}
          autoComplete="email tel"
        />
        {errors.contact && (
          <span id="lead-contact-error" className="lead-field-error" role="alert">
            {errors.contact}
          </span>
        )}
      </div>

      <div className="lead-form-group">
        <label className="lead-form-label" htmlFor="lead-service">
          <span>Servicio o trámite de interés</span>
          <span className="optional-mark">Orientación personalizada</span>
        </label>
        <select
          id="lead-service"
          className="lead-form-select"
          value={formData.service}
          onChange={e => handleFieldChange("service", e.target.value)}
          disabled={status === "submitting"}
        >
          <option value="">-- Selecciona un servicio (opcional) --</option>
          {allAvailableServices.map(title => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
          <option value="Otro / No estoy seguro">Otro / Aún no estoy seguro de mi trámite</option>
        </select>
      </div>

      <div className="lead-form-grid">
        <div className="lead-form-group">
          <label className="lead-form-label" htmlFor="lead-urgency">
            <span>Urgencia de atención</span>
          </label>
          <select
            id="lead-urgency"
            className="lead-form-select"
            value={formData.urgency}
            onChange={e => handleFieldChange("urgency", e.target.value as UrgencyLevel)}
            disabled={status === "submitting"}
          >
            <option value="baja">Baja (planificando a futuro)</option>
            <option value="media">Media (en los próximos meses)</option>
            <option value="alta">Alta (plazos o corte próxima)</option>
          </select>
        </div>

        <div className="lead-form-group">
          <label className="lead-form-label" htmlFor="lead-location">
            <span>Estado donde resides</span>
            <span className="optional-mark">EE. UU. o país</span>
          </label>
          <input
            id="lead-location"
            type="text"
            className={`lead-form-input ${errors.location ? "is-invalid" : ""}`}
            placeholder="Ej. Texas, Florida, NY..."
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "lead-location-error" : undefined}
            value={formData.location}
            onChange={e => handleFieldChange("location", e.target.value)}
            disabled={status === "submitting"}
          />
          {errors.location && (
            <span id="lead-location-error" className="lead-field-error" role="alert">
              {errors.location}
            </span>
          )}
        </div>
      </div>

      {formData.urgency === "alta" && (
        <div className="lead-urgent-callout" role="alert">
          <div className="lead-urgent-callout-header">
            <Icon name="shield" />
            <strong>Atención prioritaria para plazos o corte próxima</strong>
          </div>
          <p>
            Si tu audiencia de corte o vencimiento legal es inminente, te recomendamos comunicarte de inmediato dentro de nuestro horario hábil por canal directo:
          </p>
          <div className="lead-urgent-callout-actions">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="button button-primary lead-urgent-btn">
              <Icon name="whatsapp" /> Escribir por WhatsApp
            </a>
            <a href={contact.tel} className="button button-secondary lead-urgent-btn">
              <Icon name="phone" /> {contact.phone}
            </a>
          </div>
        </div>
      )}

      <div className="lead-form-group">
        <label className="lead-form-label" htmlFor="lead-description">
          <span>Descripción general del caso</span>
          <span className="optional-mark">Breve resumen</span>
        </label>
        <textarea
          id="lead-description"
          className={`lead-form-textarea ${errors.description ? "is-invalid" : ""}`}
          placeholder="Explícanos brevemente tus dudas o antecedentes principales (no incluyas datos confidenciales)."
          rows={3}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "lead-description-error" : undefined}
          value={formData.description}
          onChange={e => handleFieldChange("description", e.target.value)}
          disabled={status === "submitting"}
        />
        {errors.description && (
          <span id="lead-description-error" className="lead-field-error" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <div className="lead-legal-notice">
        <Icon name="shield" />
        <div>
          <strong>Aviso importante:</strong> Este primer contacto tiene fines informativos y de orientación preliminar. No constituye asesoramiento legal ni determina la elegibilidad en un trámite. <em>No se solicitan documentos ni números A (Alien Number) en esta fase.</em>
        </div>
      </div>

      <div className="lead-form-group">
        <label className="lead-form-checkbox-label">
          <input
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "lead-consent-error" : undefined}
            checked={formData.consent}
            onChange={e => handleFieldChange("consent", e.target.checked)}
            disabled={status === "submitting"}
          />
          <span>
            Acepto ser contactado para recibir orientación sobre mi consulta y declaro haber leído y aceptado las{" "}
            <Link href="/politica-de-privacidad" target="_blank" style={{ color: "var(--secondary)", textDecoration: "underline" }}>
              Políticas de Privacidad
            </Link>{" "}
            y los{" "}
            <Link href="/terminos-y-condiciones" target="_blank" style={{ color: "var(--secondary)", textDecoration: "underline" }}>
              Términos y Condiciones
            </Link>.
          </span>
        </label>
        {errors.consent && (
          <span id="lead-consent-error" className="lead-field-error" role="alert">
            {errors.consent}
          </span>
        )}
      </div>

      <div className="lead-sla-notice">
        <Icon name="clock" />
        <p>
          <strong>Compromiso de respuesta:</strong> Un orientador de Sin Fronteras revisará tu caso y te contactará por teléfono o WhatsApp ({contact.phone}) dentro de nuestro horario hábil (máximo 24 h hábiles).
        </p>
      </div>

      <div className="lead-form-actions">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Enviando solicitud..." : "Solicitar orientación ahora"}
        </Button>
      </div>

      <div className="lead-form-direct-contact">
        <span>O si prefieres atención inmediata:</span>
        <a href={contact.tel}>
          <Icon name="phone" /> {contact.phone}
        </a>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" /> WhatsApp
        </a>
      </div>
    </form>
  )
}
