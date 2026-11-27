import { useLayoutEffect, type RefObject } from "react"
import { gsap, ScrollTrigger } from "@/shared/lib/gsap"

export function useProcessProgress(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = scope.current
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const progress = Array.from(section.querySelectorAll<HTMLElement>("[data-process-progress]"))
    const copies = Array.from(section.querySelectorAll<HTMLElement>(".step-copy"))
    if (progress.length !== copies.length - 1 || copies.length < 2) return

    const media = gsap.matchMedia()
    const buildTimeline = (axis: "scaleX" | "scaleY") => {
      const headerHeight = () => document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0
      const canPin = section.offsetHeight + headerHeight() + 24 <= window.innerHeight

      gsap.set(progress, { scaleX: axis === "scaleX" ? 0 : 1, scaleY: axis === "scaleY" ? 0 : 1 })
      gsap.set(copies.slice(1), { opacity: 0.78, y: 10 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: canPin ? () => `top ${headerHeight()}px` : "top 70%",
          end: canPin ? () => `+=${Math.max(650, Math.round(window.innerHeight * 0.9))}` : "bottom 45%",
          pin: canPin,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      progress.forEach((line, index) => {
        const position = index * 1.1
        timeline
          .to(line, { [axis]: 1, ease: "none", duration: 1 }, position)
          .to(copies[index + 1], { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }, position + 0.7)
      })
    }

    media.add("(min-width: 641px)", () => buildTimeline("scaleX"))
    media.add("(max-width: 640px)", () => buildTimeline("scaleY"))

    let active = true
    void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh() })
    const services = document.querySelector<HTMLElement>("#servicios")
    const observer = services && new ResizeObserver(() => requestAnimationFrame(() => { if (active) ScrollTrigger.refresh() }))
    if (services && observer) observer.observe(services)

    return () => {
      active = false
      observer?.disconnect()
      media.revert()
    }
  }, [scope])
}
