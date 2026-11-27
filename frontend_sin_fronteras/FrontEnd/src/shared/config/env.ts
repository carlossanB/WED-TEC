const DEFAULT_API_BASE_URL = "http://localhost:3001"
const DEFAULT_LA_OPINION_API_URL = "https://laopinion.com/wp-json/wp/v2/posts"
const DEFAULT_EL_DIARIO_NY_API_URL = "https://eldiariony.com/wp-json/wp/v2/posts"
const DEFAULT_CONEXION_MIGRANTE_API_URL = "https://conexionmigrante.com/wp-json/wp/v2/posts"

/**
 * Normaliza una URL eliminando espacios y barras diagonales sobrantes al final.
 */
function normalizeUrl(rawUrl: string | undefined): string {
  return (rawUrl ?? "").trim().replace(/\/+$/, "")
}

/**
 * Configuración centralizada de variables de entorno del Frontend.
 * Puedes editar los valores en el archivo `.env` en la raíz de `FrontEnd/`.
 */
export const env = {
  apiBaseUrl: normalizeUrl(import.meta.env.VITE_API_BASE_URL) || DEFAULT_API_BASE_URL,
  laOpinionApiUrl: normalizeUrl(import.meta.env.VITE_LA_OPINION_API_URL) || DEFAULT_LA_OPINION_API_URL,
  elDiarioNyApiUrl:
    normalizeUrl(import.meta.env.VITE_EL_DIARIO_NY_API_URL) || DEFAULT_EL_DIARIO_NY_API_URL,
  conexionMigranteApiUrl:
    normalizeUrl(import.meta.env.VITE_CONEXION_MIGRANTE_API_URL) || DEFAULT_CONEXION_MIGRANTE_API_URL,
} as const
