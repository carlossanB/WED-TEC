import Icon from "@/shared/ui/Icon"
import type { CaseLookupError } from "../types"

const ERROR_LABELS: Record<CaseLookupError["kind"], string> = {
  NOT_FOUND: "Caso no encontrado",
  INVALID_RECEIPT: "Número inválido",
  RATE_LIMITED: "Límite de consultas alcanzado",
  OFFLINE: "Sin conexión al backend",
  SERVER_ERROR: "Error del servidor",
}

export default function CaseErrorBubble({ error }: { error: CaseLookupError }) {
  return (
    <div className="cl-bubble-wrap">
      <div className="cl-bubble-avatar cl-bubble-avatar--error">
        <Icon name="info" />
      </div>
      <div className="cl-bubble-body">
        <div className="cl-error-banner" role="alert">
          <strong>{ERROR_LABELS[error.kind]}</strong>
          <p>{error.message}</p>
        </div>
      </div>
    </div>
  )
}
