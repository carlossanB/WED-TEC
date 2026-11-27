import { useState, useRef, useEffect } from "react"
import Link from "@/app/navigation/Link"
import { contact } from "@/data/navigation"
import Icon from "@/shared/ui/Icon"
import CaseErrorBubble from "./components/CaseErrorBubble"
import CaseResultBubble from "./components/CaseResultBubble"
import { lookupCase } from "./services/caseLookupService"
import type { CaseLookupError, CaseLookupResult } from "./types"
import { formatReceiptInput, SANDBOX_EXAMPLES, validateReceipt } from "./utils/receiptValidator"

const TERMS_ACCEPTED_KEY = "cl_terms_accepted_v1"

function TermsGate({ onAccept }: { onAccept: () => void }) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="cl-terms-gate" role="region" aria-label="Aviso de uso del servicio">
      <div className="cl-terms-gate-inner">
        <div className="cl-terms-icon-wrap">
          <Icon name="shield" className="cl-terms-gate-icon" />
        </div>

        <span className="cl-chat-eyebrow">ANTES DE CONSULTAR TU CASO</span>
        <h1>Aviso de uso del servicio</h1>
        <p className="cl-terms-gate-lead">
          Esta herramienta consulta en tiempo real el sistema público de <strong>USCIS.gov</strong>.
          La información mostrada es <em>orientativa</em> y no constituye asesoría legal.
        </p>

        <ul className="cl-terms-gate-points" aria-label="Puntos clave del aviso">
          <li>
            <Icon name="check" aria-hidden="true" />
            <span>No almacenamos tu número de recibo ni datos personales.</span>
          </li>
          <li>
            <Icon name="check" aria-hidden="true" />
            <span>Los resultados provienen directamente de USCIS.gov, no de esta plataforma.</span>
          </li>
          <li>
            <Icon name="check" aria-hidden="true" />
            <span>Esta consulta no reemplaza la orientación de un representante acreditado.</span>
          </li>
          <li>
            <Icon name="check" aria-hidden="true" />
            <span>Al continuar aceptas nuestros Términos y Condiciones y nuestra Política de Privacidad.</span>
          </li>
        </ul>

        <label className="cl-terms-gate-checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            aria-required="true"
          />
          <span>
            He leído y acepto los{" "}
            <Link href="/terminos-y-condiciones" target="_blank">Términos y Condiciones</Link>
            {" "}y la{" "}
            <Link href="/politica-de-privacidad" target="_blank">Política de Privacidad</Link>
            {" "}de Servicios Sin Fronteras.
          </span>
        </label>

        <button
          className="cl-terms-gate-btn"
          disabled={!checked}
          onClick={onAccept}
          aria-disabled={!checked}
        >
          <Icon name="arrow" aria-hidden="true" />
          Continuar a la consulta
        </button>

        <p className="cl-terms-gate-footnote">
          <Icon name="shield" aria-hidden="true" />
          Consulta segura · Sin almacenamiento de datos · Información pública de USCIS
        </p>
      </div>
    </div>
  )
}

interface CaseLookupPageProps {
  onOpenConsultation?: () => void
}

type LookupTab = "uscis" | "court"

function formatANumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 9)
  if (!digits) return ""
  if (digits.length <= 3) return `A-${digits}`
  if (digits.length <= 6) return `A-${digits.slice(0, 3)}-${digits.slice(3)}`
  return `A-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

export default function CaseLookupPage({ onOpenConsultation }: CaseLookupPageProps) {
  const [termsAccepted, setTermsAccepted] = useState(() =>
    sessionStorage.getItem(TERMS_ACCEPTED_KEY) === "1"
  )
  const [activeTab, setActiveTab] = useState<LookupTab>("uscis")
  const [receiptInput, setReceiptInput] = useState("")
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CaseLookupResult | null>(null)
  const [error, setError] = useState<CaseLookupError | null>(null)
  const [aNumberInput, setANumberInput] = useState("")
  const [courtOriented, setCourtOriented] = useState(false)
  const [courtError, setCourtError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const validationError = validateReceipt(receiptInput)
  const canSubmit = receiptInput.length === 13 && !validationError && !loading && privacyAccepted

  const handleANumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatANumber(e.target.value)
    setANumberInput(formatted)
    setCourtError("")
    setCourtOriented(false)
  }

  const handleCourtSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = aNumberInput.replace(/\D/g, "")
    if (digits.length < 8 || digits.length > 9) {
      setCourtError("El Número A debe contener 8 o 9 dígitos (ej. A-123-456-789).")
      return
    }
    setCourtOriented(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatReceiptInput(e.target.value)
    setReceiptInput(formatted)
    setResult(null)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setResult(null)
    setError(null)
    const response = await lookupCase(receiptInput)
    setLoading(false)
    if (response.ok) {
      setResult(response.data)
    } else {
      setError(response.error)
    }
  }

  const handleExampleClick = (receipt: string) => {
    setReceiptInput(receipt)
    setResult(null)
    setError(null)
    inputRef.current?.focus()
  }

  useEffect(() => {
    if ((result || error) && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [result, error])

  const hasResponse = !loading && (result || error)

  if (!termsAccepted) {
    return (
      <TermsGate
        onAccept={() => {
          sessionStorage.setItem(TERMS_ACCEPTED_KEY, "1")
          setTermsAccepted(true)
        }}
      />
    )
  }

  return (
    <main className="cl-page">
      <div className="cl-chat-shell">
        <div className="cl-tabs-bar" role="tablist" aria-label="Tipo de trámite a consultar">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "uscis"}
            className={`cl-tab-pill ${activeTab === "uscis" ? "is-active" : ""}`}
            onClick={() => setActiveTab("uscis")}
          >
            <Icon name="document" />
            <span>Trámite en USCIS (Recibo)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "court"}
            className={`cl-tab-pill ${activeTab === "court" ? "is-active" : ""}`}
            onClick={() => setActiveTab("court")}
          >
            <Icon name="scale" />
            <span>Caso en Corte (EOIR / Número A)</span>
          </button>
        </div>

        {activeTab === "uscis" ? (
          <>
            {!hasResponse && !loading && (
              <div className="cl-chat-hero">
                <div className="cl-seal-badge-wrap">
                  <div className="cl-seal-badge" aria-hidden="true">
                    <svg
                      className="cl-seal-svg"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="36" cy="36" r="34" stroke="#ffc100" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65" />
                      <circle cx="36" cy="36" r="30" fill="url(#uscis-seal-grad)" stroke="#ffc100" strokeWidth="2" />
                      {/* Shield background */}
                      <path
                        d="M36 15L22 21V33C22 43.5 28 51.5 36 54C44 51.5 50 43.5 50 33V21L36 15Z"
                        fill="#002E7F"
                        stroke="#ffc100"
                        strokeWidth="1.75"
                        strokeLinejoin="round"
                      />
                      {/* Shield header band */}
                      <path
                        d="M24 23.5L36 18.5L48 23.5V28H24V23.5Z"
                        fill="#001842"
                      />
                      {/* Stars in header band */}
                      <circle cx="30" cy="24" r="1.2" fill="#ffc100" />
                      <circle cx="36" cy="23" r="1.5" fill="#ffc100" />
                      <circle cx="42" cy="24" r="1.2" fill="#ffc100" />
                      {/* Vertical stripes */}
                      <rect x="27" y="28" width="3" height="15" fill="#ffffff" opacity="0.9" />
                      <rect x="33" y="28" width="3" height="17" fill="#ffffff" opacity="0.9" />
                      <rect x="39" y="28" width="3" height="17" fill="#ffffff" opacity="0.9" />
                      <rect x="45" y="28" width="2" height="13" fill="#ffffff" opacity="0.9" />
                      {/* Golden checkmark */}
                      <path
                        d="M29 36L34 41L44 30"
                        stroke="#ffc100"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <radialGradient id="uscis-seal-grad" cx="50%" cy="40%" r="55%">
                          <stop offset="0%" stopColor="#003ba3" />
                          <stop offset="100%" stopColor="#001a45" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="cl-live-status-pill">
                    <span className="cl-live-pulse-dot" />
                    <span>Conexión oficial USCIS.gov · En tiempo real</span>
                  </div>
                </div>

                <span className="cl-chat-eyebrow">VERIFICACIÓN DIRECTA DE EXPEDIENTE</span>
                <h1>Consultar mi trámite en USCIS</h1>
                <p>Ingresa tu número de recibo de 13 caracteres para obtener el estado oficial en tiempo real emitido por USCIS.</p>
              </div>
            )}

            <div
              ref={resultsRef}
              className="cl-results"
              role="region"
              aria-live="polite"
              aria-label="Resultado de la consulta"
            >
              {loading && (
                <div className="cl-bubble-wrap">
                  <div className="cl-bubble-avatar">
                    <Icon name="file-search" />
                  </div>
                  <div className="cl-bubble-body">
                    <div className="cl-loading">
                      <div className="cl-loading-dots">
                        <span /><span /><span />
                      </div>
                      <p>Consultando sistema USCIS…</p>
                    </div>
                  </div>
                </div>
              )}
              {!loading && error && <CaseErrorBubble error={error} />}
              {!loading && result && (
                <CaseResultBubble
                  data={result}
                  onOpenConsultation={onOpenConsultation ?? (() => {})}
                />
              )}
            </div>

            <div className="cl-input-area">
              <form onSubmit={handleSubmit} className="cl-chat-form" noValidate>
                <div className={`cl-chat-input-wrap ${validationError ? "cl-chat-input-wrap--error" : receiptInput.length === 13 && !validationError ? "cl-chat-input-wrap--valid" : ""}`}>
                  <Icon name="document" className="cl-chat-input-icon" />
                  <input
                    ref={inputRef}
                    id="receipt-number"
                    type="text"
                    value={receiptInput}
                    onChange={handleChange}
                    placeholder="Escribe tu número de recibo de USCIS…"
                    maxLength={13}
                    autoComplete="off"
                    spellCheck={false}
                    aria-describedby={validationError ? "receipt-error" : "receipt-hint"}
                    aria-invalid={!!validationError}
                    className="cl-chat-input"
                  />
                  <div className="cl-chat-input-right">
                    {receiptInput.length > 0 && (
                      <span className="cl-char-counter" aria-live="polite">
                        {receiptInput.length}/13
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="cl-chat-send-btn"
                      aria-label="Consultar"
                    >
                      {loading ? (
                        <span className="cl-spinner" aria-label="Consultando…" />
                      ) : (
                        <Icon name="arrow" className="cl-send-icon" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="cl-chat-field-footer" id="receipt-hint">
                  {validationError ? (
                    <span id="receipt-error" className="cl-field-error" role="alert">
                      {validationError}
                    </span>
                  ) : (
                    <span className="cl-field-privacy">
                      <Icon name="shield" />
                      3 letras + 10 dígitos · Ej: EAC9999103403 · No almacenamos tu número
                    </span>
                  )}
                </div>

                <div className="cl-privacy-consent-wrap">
                  <label className="cl-privacy-consent-label" htmlFor="cl-privacy-checkbox">
                    <input
                      type="checkbox"
                      id="cl-privacy-checkbox"
                      checked={privacyAccepted}
                      onChange={e => setPrivacyAccepted(e.target.checked)}
                      className="cl-privacy-consent-checkbox"
                      aria-required="true"
                    />
                    <span className="cl-privacy-consent-text">
                      He leído y acepto la{" "}
                      <Link
                        href="/politica-de-privacidad"
                        target="_blank"
                        className="cl-privacy-policy-link"
                      >
                        Política de Privacidad
                      </Link>{" "}
                      para consultar la información oficial de mi trámite en USCIS.
                    </span>
                  </label>
                </div>
              </form>

              <div className="cl-sandbox-chips">
                <small>Números de prueba:</small>
                {SANDBOX_EXAMPLES.map(receipt => (
                  <button
                    key={receipt}
                    type="button"
                    className="cl-chip"
                    onClick={() => handleExampleClick(receipt)}
                  >
                    {receipt}
                  </button>
                ))}
              </div>

              <div className="cl-court-notice-card">
                <div className="cl-court-notice-header">
                  <Icon name="shield" className="cl-court-notice-icon" />
                  <strong>¿Tienes un caso ante la Corte de Inmigración (EOIR)?</strong>
                </div>
                <p>
                  Los procesos ante la corte no se consultan con un recibo de USCIS sino con tu Número A. Puedes consultar la orientación de tu corte aquí mismo:
                </p>
                <div className="cl-court-notice-actions">
                  <button
                    type="button"
                    className="cl-court-btn cl-court-btn--wa"
                    onClick={() => setActiveTab("court")}
                  >
                    <Icon name="scale" /> Ir a pestaña de Corte (Número A)
                  </button>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="cl-court-btn cl-court-btn--tel">
                    <Icon name="whatsapp" /> Contactar por WhatsApp
                  </a>
                </div>
              </div>

              <p className="cl-not-ai-disclaimer">
                ⚡ Consulta informativa en tiempo real con USCIS.gov · No refleja el expediente interno con Servicios Sin Fronteras ni constituye asesoría legal vinculante.
              </p>
            </div>
          </>
        ) : (
          <div className="cl-court-tab-view">
            <div className="cl-chat-hero">
              <div className="cl-seal-badge-wrap">
                <div className="cl-seal-badge cl-seal-badge--court" aria-hidden="true">
                  <svg
                    className="cl-seal-svg"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="36" cy="36" r="34" stroke="#ffc100" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65" />
                    <circle cx="36" cy="36" r="30" fill="url(#court-seal-grad)" stroke="#ffc100" strokeWidth="2" />
                    {/* Scales of Justice */}
                    <path d="M36 17V49M28 50H44M31 17H41" stroke="#ffc100" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M22 25H50" stroke="#ffc100" strokeWidth="2" strokeLinecap="round" />
                    {/* Left pan */}
                    <path d="M22 25L16 38H28L22 25Z" fill="#ffc100" fillOpacity="0.25" stroke="#ffc100" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Right pan */}
                    <path d="M50 25L44 38H56L50 25Z" fill="#ffc100" fillOpacity="0.25" stroke="#ffc100" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Stars */}
                    <circle cx="28" cy="46" r="1.2" fill="#ffc100" />
                    <circle cx="44" cy="46" r="1.2" fill="#ffc100" />
                    <defs>
                      <radialGradient id="court-seal-grad" cx="50%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#00358a" />
                        <stop offset="100%" stopColor="#00183b" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>

                <div className="cl-live-status-pill">
                  <span className="cl-live-pulse-dot cl-live-pulse-dot--amber" />
                  <span>Corte de Inmigración · Sistema EOIR</span>
                </div>
              </div>

              <span className="cl-chat-eyebrow">DEPARTAMENTO DE JUSTICIA · SISTEMA EOIR</span>
              <h1>Orientación para Casos en Corte de Inmigración</h1>
              <p>
                Los procesos ante la corte de inmigración (EOIR) no son trámites administrativos de USCIS. Se gestionan con tu Número de Extranjero (A-Number de 9 dígitos) y requieren atención prioritaria para audiencias y notificaciones de comparecencia (NTA).
              </p>
            </div>

            <div className="cl-court-form-card">
              <form onSubmit={handleCourtSubmit} className="cl-chat-form" noValidate>
                <label htmlFor="court-a-number" className="cl-court-input-label">
                  <strong>Ingresa tu Número A (Alien Registration Number)</strong>
                  <span>Formato guiado: A-XXX-XXX-XXX (8 o 9 dígitos)</span>
                </label>
                <div className={`cl-chat-input-wrap ${courtError ? "cl-chat-input-wrap--error" : aNumberInput.replace(/\D/g, "").length >= 8 ? "cl-chat-input-wrap--valid" : ""}`}>
                  <Icon name="shield" className="cl-chat-input-icon" />
                  <input
                    id="court-a-number"
                    type="text"
                    value={aNumberInput}
                    onChange={handleANumberChange}
                    placeholder="A-123-456-789"
                    maxLength={13}
                    autoComplete="off"
                    spellCheck={false}
                    className="cl-chat-input"
                  />
                  <div className="cl-chat-input-right">
                    <button
                      type="submit"
                      disabled={aNumberInput.replace(/\D/g, "").length < 8}
                      className="cl-court-submit-btn"
                    >
                      <span>Obtener orientación</span>
                      <Icon name="arrow" />
                    </button>
                  </div>
                </div>
                {courtError && (
                  <span className="cl-field-error" role="alert" style={{ marginTop: "4px", display: "block" }}>
                    {courtError}
                  </span>
                )}
                <span className="cl-field-privacy" style={{ marginTop: "6px" }}>
                  <Icon name="shield" />
                  El Número A se encuentra en tu Notificación de Comparecencia (NTA / I-862), permiso de trabajo (EAD) o recibos oficiales.
                </span>
              </form>

              {courtOriented ? (
                <div className="cl-court-result-box" role="region" aria-live="polite">
                  <div className="cl-court-result-header">
                    <Icon name="check" />
                    <h4>Orientación lista para tu Número A ({aNumberInput})</h4>
                  </div>
                  <p>
                    Para revisar las fechas oficiales de audiencia en el sistema de la corte o recibir acompañamiento con un orientador de Sin Fronteras:
                  </p>

                  <div className="cl-court-options-grid">
                    <div className="cl-court-option-card">
                      <strong>1. Sistema Telefónico Automatizado Oficial (EOIR 24/7):</strong>
                      <p>Línea gratuita de la Corte de Inmigración (español e inglés):</p>
                      <a href="tel:18008987180" className="cl-eoir-phone-link">
                        <Icon name="phone" /> 1-800-898-7180
                      </a>
                      <small>Marca la opción 2 para español e ingresa los 9 dígitos de tu Número A.</small>
                    </div>

                    <div className="cl-court-option-card">
                      <strong>2. Acompañamiento Sin Fronteras:</strong>
                      <p>Revisamos tus plazos, NTA y te conectamos con abogados licenciados de inmigración:</p>
                      <a
                        href={`${contact.whatsapp}?text=${encodeURIComponent(`Hola, tengo un caso en Corte de Inmigración (EOIR) con Número A: ${aNumberInput}. Deseo orientación profesional para mi audiencia.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="button button-primary"
                        style={{ minHeight: "42px", fontSize: "12px", width: "100%", justifyContent: "center" }}
                      >
                        <Icon name="whatsapp" /> Escribir por WhatsApp con este Número A
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cl-court-static-guide">
                  <h4>Canales oficiales para casos en Corte (EOIR):</h4>
                  <ul>
                    <li>
                      <strong>Línea automatizada oficial 24/7:</strong> Llama al <a href="tel:18008987180"><strong>1-800-898-7180</strong></a> (opción 2 para español).
                    </li>
                    <li>
                      <strong>Portal web oficial de la corte:</strong> Puedes consultar en <a href="https://acis.eoir.justice.gov" target="_blank" rel="noreferrer">acis.eoir.justice.gov ↗</a>.
                    </li>
                    <li>
                      <strong>Orientación y defensa:</strong> Si tienes audiencia próxima o orden de comparecencia, contáctanos al <a href={contact.tel}><strong>{contact.phone}</strong></a> o por <a href={contact.whatsapp} target="_blank" rel="noreferrer"><strong>WhatsApp</strong></a>.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
