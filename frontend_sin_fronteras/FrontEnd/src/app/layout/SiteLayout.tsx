import type { ReactNode } from "react"
import Icon from "@/shared/ui/Icon"
import FloatingWhatsApp from "./FloatingWhatsApp"
import Footer from "./Footer"
import Header from "./Header"
import InitialLoader from "./InitialLoader"
import MockChatBot from "./MockChatBot"

interface SiteLayoutProps {
  children: ReactNode
  onOpenConsultation: (serviceTitle: string) => void
}

export default function SiteLayout({ children, onOpenConsultation }: SiteLayoutProps) {
  return (
    <>
      <InitialLoader />
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header onOpenConsultation={() => onOpenConsultation("")} />
      <main id="contenido">{children}</main>
      <Footer onSelect={onOpenConsultation} />
      <button
        type="button"
        className="mobile-contact"
        onClick={() => onOpenConsultation("")}
        style={{ border: "none", cursor: "pointer" }}
      >
        <Icon name="phone" /> Solicita una evaluación inicial
      </button>
      <FloatingWhatsApp />
      <MockChatBot />
    </>
  )
}
