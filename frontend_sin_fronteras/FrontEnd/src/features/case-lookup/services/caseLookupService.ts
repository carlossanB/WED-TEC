import {
  axios,
  getAxiosErrorMessage,
  httpClient,
  type ApiErrorPayload,
  type ApiSuccessEnvelope,
} from "@/shared/api/httpClient"
import type { CaseLookupResponse, CaseLookupResult } from "../types"

/**
 * Consulta el estado oficial de un número de recibo en USCIS a través del backend usando Axios.
 */
export async function lookupCase(receiptNumber: string): Promise<CaseLookupResponse> {
  try {
    const response = await httpClient.post<ApiSuccessEnvelope<CaseLookupResult>>(
      "/api/uscis/case-status",
      {
        receiptNumber: receiptNumber.trim().toUpperCase(),
      }
    )

    return {
      ok: true,
      data: response.data.data,
    }
  } catch (error: unknown) {
    if (axios.isAxiosError<ApiErrorPayload>(error)) {
      const status = error.response?.status

      if (status === 429) {
        return {
          ok: false,
          error: {
            kind: "RATE_LIMITED",
            message: getAxiosErrorMessage(
              error,
              "Demasiadas consultas. Espera un momento e intenta de nuevo."
            ),
          },
        }
      }

      if (status === 404) {
        return {
          ok: false,
          error: {
            kind: "NOT_FOUND",
            message: getAxiosErrorMessage(
              error,
              "Número de caso no encontrado en el sistema USCIS."
            ),
          },
        }
      }

      if (status === 422 || status === 400) {
        return {
          ok: false,
          error: {
            kind: "INVALID_RECEIPT",
            message: getAxiosErrorMessage(error, "Número de recibo inválido."),
          },
        }
      }

      if (status) {
        return {
          ok: false,
          error: {
            kind: "SERVER_ERROR",
            message: getAxiosErrorMessage(error, `Error del servidor (${status}).`),
          },
        }
      }
    }

    return {
      ok: false,
      error: {
        kind: "OFFLINE",
        message:
          "No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo en puerto 3001.",
      },
    }
  }
}
