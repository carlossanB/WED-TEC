import { useLayoutEffect, useRef, useState } from "react"
import logo from "@/assets/icons/logo_sin_fronteras-removebg-preview.png"
import { gsap } from "@/shared/lib/gsap"

export default function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const loader = loaderRef.current
    if (!loader) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(false)
      return
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIsVisible(false),
        defaults: { ease: "power3.out" },
      })

      timeline
        .fromTo("[data-loader-brand]", { autoAlpha: 0, y: 18, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 })
        .to("[data-loader-progress]", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.1")
        .to("[data-loader-brand]", { autoAlpha: 0, y: -10, duration: 0.22 })
        .fromTo(
          "[data-loader-panel]",
          { xPercent: index => index % 2 === 0 ? -105 : 105, yPercent: index => index < 2 ? -105 : 105 },
          { xPercent: 0, yPercent: 0, duration: 0.55, stagger: 0.045, ease: "power3.inOut" },
          "-=0.08",
        )
        .to(loader, { autoAlpha: 0, duration: 0.25, ease: "power2.inOut" })
    }, loader)

    return () => context.revert()
  }, [])

  if (!isVisible) return null

  return (
    <div className="initial-loader" ref={loaderRef} role="status" aria-label="Cargando sitio">
      <div className="initial-loader-content">
        <div className="initial-loader-brand" data-loader-brand>
          <img className="initial-loader-logo" src={logo} alt="Logo de Servicios Sin Fronteras" />
          <small>SERVICIOS</small>
          <strong>SIN FRONTERAS<span>.</span></strong>
        </div>
        <span className="initial-loader-track" aria-hidden="true">
          <span className="initial-loader-progress" data-loader-progress />
        </span>
      </div>
      <span className="initial-loader-panel loader-panel-tl" data-loader-panel aria-hidden="true" />
      <span className="initial-loader-panel loader-panel-tr" data-loader-panel aria-hidden="true" />
      <span className="initial-loader-panel loader-panel-bl" data-loader-panel aria-hidden="true" />
      <span className="initial-loader-panel loader-panel-br" data-loader-panel aria-hidden="true" />
    </div>
  )
}
