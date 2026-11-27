export { default as Link } from "@/app/navigation/Link"
export type { LinkProps } from "@/app/navigation/Link"
export { RouterProvider, useRouter } from "@/app/providers/RouterProvider"
export type { RouterContextType } from "@/app/providers/RouterProvider"

export const prototypeDestinationNotice =
  "Este destino es informativo. Su contenido debe revisarse y confirmarse con un profesional calificado antes de tomar decisiones legales."

export const SERVICE_ROUTES = {
  asilo: "/servicios/asilo",
  permisoDeTrabajo: "/servicios/permiso-de-trabajo",
  peticionFamiliar: "/servicios/peticion-familiar",
  cancelacionDeRemocion: "/servicios/cancelacion-de-remocion",
  visaVawa: "/servicios/visa-vawa",
  visaU: "/servicios/visa-u",
  naturalizacion: "/servicios/naturalizacion",
  waiverPerdonMigratorio: "/servicios/waiver-perdon-migratorio",
  representanteEnCorte: "/servicios/representante-en-corte",
  apelacion: "/servicios/apelacion",
  fianza: "/servicios/fianza",
  ajusteDeEstatus: "/servicios/ajuste-de-estatus",
} as const
