import { getServiceBySlug } from "@/data/servicesData"
import type { ServiceDetail } from "@/types/services"

export type AppRoute =
  | { kind: "home" }
  | { kind: "services-index" }
  | { kind: "service-detail"; slug: string; service: ServiceDetail }
  | { kind: "service-not-found"; slug: string }
  | { kind: "case-lookup" }
  | { kind: "news-portal" }
  | { kind: "privacy-policy" }
  | { kind: "terms-conditions" }
  | { kind: "not-found" }

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/index\.html$/, "") || "/"
}

export function matchRoute(pathname: string): AppRoute {
  const path = pathname.split("?")[0].split("#")[0]
  if (path === "/" || path === "") return { kind: "home" }
  if (path === "/servicios" || path === "/servicios/") return { kind: "services-index" }
  if (path === "/consulta-caso" || path === "/consulta-caso/") return { kind: "case-lookup" }
  if (path === "/noticias" || path === "/noticias/") return { kind: "news-portal" }
  if (path === "/politica-de-privacidad" || path === "/politica-de-privacidad/" || path === "/privacidad" || path === "/privacidad/") return { kind: "privacy-policy" }
  if (path === "/terminos-y-condiciones" || path === "/terminos-y-condiciones/" || path === "/terminos" || path === "/terminos/") return { kind: "terms-conditions" }

  if (path.startsWith("/servicios/")) {
    const slug = path.replace("/servicios/", "").split("/")[0]
    const service = getServiceBySlug(slug)
    return service ? { kind: "service-detail", slug, service } : { kind: "service-not-found", slug }
  }

  return { kind: "not-found" }
}
