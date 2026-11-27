import { useLayoutEffect, type RefObject } from "react"
import { gsap } from "@/shared/lib/gsap"

export function useTrustMotion(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = scope.current
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const intro = section.querySelector<HTMLElement>("[data-trust-intro]")
    const reasons = Array.from(section.querySelectorAll<HTMLElement>("[data-trust-reason]"))
    const image = section.querySelector<HTMLElement>("[data-trust-image]")
    if (!intro || !reasons.length) return

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
        defaults: { ease: "power3.out" },
      })
        .from(intro, { autoAlpha: 0, x: -28, duration: 0.72 })
        .from(reasons, { autoAlpha: 0, y: 22, duration: 0.55, stagger: 0.11 }, "-=0.38")
        .from(image, { autoAlpha: 0, y: 26, duration: 0.7 }, "-=0.56")

      if (image) {
        gsap.to(image, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
        })
      }
    }, section)

    return () => context.revert()
  }, [scope])
}
