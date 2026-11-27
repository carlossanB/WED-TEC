import { useLayoutEffect, type RefObject } from "react"
import { gsap } from "@/shared/lib/gsap"

export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })

      timeline
        .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 10, duration: 0.45 })
        .from("[data-hero-title]", { autoAlpha: 0, y: 24, duration: 0.7 }, "-=0.18")
        .from("[data-hero-copy]", { autoAlpha: 0, y: 14, duration: 0.5 }, "-=0.35")
        .from("[data-hero-actions]", { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.28")
        .from("[data-hero-support]", { autoAlpha: 0, duration: 0.35 }, "-=0.18")
        .from("[data-hero-visual]", { autoAlpha: 0, x: 28, duration: 0.75 }, "-=0.86")
        .from("[data-hero-image]", { scale: 1.06, duration: 1.1 }, "-=0.75")
        .from("[data-hero-note]", { autoAlpha: 0, y: 18, duration: 0.5 }, "-=0.65")
    }, scope)

    return () => context.revert()
  }, [scope])
}
