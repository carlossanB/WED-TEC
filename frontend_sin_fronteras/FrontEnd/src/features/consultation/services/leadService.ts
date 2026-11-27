import type { LeadFormData } from "../types"

export interface LeadSubmissionResponse {
  success: boolean
  message: string
  bitrixLeadId?: number | string | null
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

/**
 * Envía los datos del formulario de consulta de leads hacia el endpoint del backend (/api/leads).
 * El backend se encarga de la validación y de la integración segura con Bitrix24 CRM.
 */
export async function submitLead(data: LeadFormData): Promise<LeadSubmissionResponse> {
  const primaryUrl = API_BASE_URL ? `${API_BASE_URL}/api/leads` : "/api/leads"
  let response: Response

  try {
    response = await fetch(primaryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
  } catch (netErr) {
    // Si la llamada directa falló (ej. direct host/CORS) y había una URL base diferente de la relativa,
    // reintenta con el proxy relativo /api/leads configurado en Vite
    if (API_BASE_URL && primaryUrl !== "/api/leads") {
      try {
        response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        })
      } catch {
        throw netErr
      }
    } else {
      throw netErr
    }
  }

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const errorMsg =
      payload?.message ||
      (response.status === 400
        ? "Por favor revisa los datos ingresados en el formulario."
        : "No fue posible procesar tu solicitud en este momento. Por favor intenta de nuevo o comunícate vía WhatsApp.")
    throw new Error(errorMsg)
  }

  return {
    success: payload?.success ?? true,
    message: payload?.message || "Hemos recibido tus datos correctamente.",
    bitrixLeadId: payload?.bitrixLeadId ?? null,
  }
}
