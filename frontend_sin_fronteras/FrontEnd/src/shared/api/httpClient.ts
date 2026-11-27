import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios"
import { env } from "@/shared/config/env"

const DEFAULT_TIMEOUT_MS = 15_000

export interface ApiSuccessEnvelope<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiErrorPayload {
  message?: string
  error?: string
  statusCode?: number
}

/**
 * Instancia centralizada de Axios para todas las peticiones HTTP del frontend.
 * Configura baseURL, timeouts e interceptores de respuesta de forma transversal.
 */
export const httpClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorPayload>) => Promise.reject(error)
)

/**
 * Extrae el mensaje legible de un error de Axios o de red.
 */
export function getAxiosErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    const serverMessage = error.response?.data?.message || error.response?.data?.error
    if (serverMessage) return serverMessage
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return fallbackMessage
}

export { axios }
