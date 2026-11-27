import { useEffect, useState, useRef } from "react"
import Link from "@/app/navigation/Link"
import { useRouter } from "@/app/providers/RouterProvider"
import logoBlue from "@/assets/icons/statue_symbol.png"
import logoWhite from "@/assets/icons/statue_symbol_white.png"
import { contact, navigation } from "@/data/navigation"
import Button from "@/shared/ui/Button"
import Icon from "@/shared/ui/Icon"
import ThemeToggle from "@/shared/ui/ThemeToggle"
import MobileMenu from "./MobileMenu"
import ServicesMegaMenu from "./ServicesMegaMenu"

interface HeaderProps {
  onOpenConsultation?: () => void
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const { currentPath, isHome, isServiceDetail, isServicesIndex, isCaseLookup } = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener("scroll", updateHeader, { passive: true })
    return () => window.removeEventListener("scroll", updateHeader)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  useEffect(() => setOpen(false), [currentPath])

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 1180px)")
    const closeOnDesktop = () => {
      if (!mobileViewport.matches) setOpen(false)
    }
    mobileViewport.addEventListener("change", closeOnDesktop)
    return () => mobileViewport.removeEventListener("change", closeOnDesktop)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false)
      setMegaMenuOpen(false)
    }
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setMegaMenuOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setMegaMenuOpen(false)
    }, 180)
  }

  return (
    <>
      <div className="contact-bar">
        <div className="container contact-inner">
          <span>
            <Icon name="globe" /> Atención en todo Estados Unidos
          </span>
          <div>
            <a href={contact.tel}>
              <Icon name="phone" />
              {contact.phone}
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" /> WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}
        onKeyDown={handleKeyDown}
      >
        <div className="container header-inner">
          <Link
            className="brand-logo"
            href="/"
            aria-label="Servicios Sin Fronteras, volver al inicio"
            onClick={() => {
              setOpen(false)
              setMegaMenuOpen(false)
            }}
          >
            <span className="brand-symbol">
              <img src={logoBlue} alt="Estatua de la Libertad - Servicios Sin Fronteras" className="brand-symbol-light" />
              <img src={logoWhite} alt="Estatua de la Libertad - Servicios Sin Fronteras" className="brand-symbol-dark" />
            </span>
            <span className="brand-name">
              <small>SERVICIOS</small>
              <strong>SIN FRONTERAS<span>.</span></strong>
              <span className="brand-line" aria-hidden="true" />
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map(([label, href]) => {
              if (label === "Servicios") {
                const isServicesActive = isServicesIndex || isServiceDetail
                return (
                  <div
                    key={label}
                    className="nav-dropdown-wrapper"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href="/servicios"
                      className={`nav-services-trigger ${isServicesActive ? "active" : ""} ${
                        megaMenuOpen ? "is-open" : ""
                      }`}
                      aria-expanded={megaMenuOpen}
                      aria-haspopup="true"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                      <span>{label}</span>
                      <Icon
                        name="chevron"
                        className={`nav-chevron ${megaMenuOpen ? "chevron-rotated" : ""}`}
                      />
                    </Link>

                    <ServicesMegaMenu
                      isOpen={megaMenuOpen}
                      onClose={() => setMegaMenuOpen(false)}
                    />
                  </div>
                )
              }

              const isItemActive =
                (isHome && href === "#inicio" && currentPath === "/") ||
                (isCaseLookup && href === "/consulta-caso") ||
                (href === "/consulta-caso" && currentPath.startsWith("/consulta-caso")) ||
                (href === "/noticias" && currentPath.startsWith("/noticias"))

              return (
                <Link
                  className={isItemActive ? "active" : ""}
                  key={label}
                  href={href}
                  onClick={() => {
                    setMegaMenuOpen(false)
                  }}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <div className="header-cta">
              <Button onClick={() => onOpenConsultation?.()}>Solicitar evaluación</Button>
            </div>
            <button
              className="menu-toggle"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={open}
          onClose={() => setOpen(false)}
          onOpenConsultation={() => {
            setOpen(false)
            onOpenConsultation?.()
          }}
        />
      </header>
    </>
  )
}
