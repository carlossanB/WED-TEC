import { useLayoutEffect, type RefObject } from "react"
import { gsap } from "@/shared/lib/gsap"

export function useAsylumSectionMotion(
  scope: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  useLayoutEffect(() => {
    const root = scope.current
    if (!enabled || !root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const reveals = Array.from(root.querySelectorAll<HTMLElement>(
      ".asylum-content-section .section-head, .asylum-content-section .what-is-it-content, .asylum-content-section .asylum-image-figure, .asylum-content-section .benefits-wrapper, .asylum-content-section .eligibility-list, .asylum-content-section .eligibility-disclaimer, .asylum-content-section .documents-grid, .asylum-content-section .documents-note"
    ))
    const steps = Array.from(root.querySelectorAll<HTMLElement>("#asylum-process .timeline-step"))

    const context = gsap.context(() => {
      reveals.forEach(element => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          }
        )
      })

      steps.forEach((step, index) => {
        const circle = step.querySelector<HTMLElement>(".step-circle")
        const body = step.querySelector<HTMLElement>(".timeline-body")
        const line = step.querySelector<HTMLElement>(".step-line")
        if (circle) {
          gsap.fromTo(circle, { scale: 0.78, opacity: 0.45 }, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: step, start: "top 75%", toggleActions: "play none none reverse" },
          })
        }
        if (body) {
          gsap.fromTo(body, { y: 20, opacity: 0.35 }, {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 75%", toggleActions: "play none none reverse" },
          })
        }
        if (line && index < steps.length - 1) {
          gsap.fromTo(line, { scaleY: 0, transformOrigin: "top center" }, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: step, start: "top 72%", end: "bottom 62%", scrub: 0.4 },
          })
        }
      })
    }, root)

    return () => context.revert()
  }, [enabled, scope])
}
