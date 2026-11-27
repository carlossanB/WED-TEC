import Link from "@/app/navigation/Link"
import type { AppRoute } from "@/app/routing/routeMatcher"
import ServiceDetailPage from "./components/ServiceDetailPage"
import ServicesIndexPage from "./components/ServicesIndexPage"

interface ServicesRouteProps {
  route: Extract<AppRoute, { kind: "services-index" | "service-detail" | "service-not-found" }>
  onOpenConsultation: (serviceTitle: string) => void
}

export default function ServicesRoute({ route, onOpenConsultation }: ServicesRouteProps) {
  if (route.kind === "services-index") return <ServicesIndexPage />
  if (route.kind === "service-detail") return <ServiceDetailPage service={route.service} onOpenConsultation={onOpenConsultation} />

  return (
    <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
      <span className="eyebrow">404 · SERVICIO NO ENCONTRADO</span>
      <h1 style={{ marginTop: "16px", fontSize: "32px" }}>El servicio solicitado no existe</h1>
      <p style={{ margin: "16px auto", maxWidth: "500px", color: "var(--muted)" }}>
        No pudimos encontrar el trámite específico que buscas. Revisa nuestro catálogo de 12 servicios o contáctanos para orientarte.
      </p>
      <div style={{ marginTop: "24px" }}>
        <Link href="/servicios" className="button button-primary">Ver todos los servicios</Link>
      </div>
    </div>
  )
}
