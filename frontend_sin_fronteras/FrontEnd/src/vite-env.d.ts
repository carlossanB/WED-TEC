/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_LA_OPINION_API_URL?: string
  readonly VITE_EL_DIARIO_NY_API_URL?: string
  readonly VITE_CONEXION_MIGRANTE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
