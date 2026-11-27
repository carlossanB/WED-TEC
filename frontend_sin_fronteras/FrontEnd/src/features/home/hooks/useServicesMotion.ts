import { useLayoutEffect, type RefObject } from "react"
import { gsap } from "@/shared/lib/gsap"

export function useServicesMotion(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = scope.current
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const intro = section.querySelector<HTMLElement>("[data-services-intro]")
    const topics = section.querySelector<HTMLElement>("[data-services-topics]")
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-service-category]"))
    if (!intro || !topics || !cards.length) return

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
        defaults: { ease: "power3.out" },
      })
        .from(intro, { autoAlpha: 0, y: 22, duration: 0.72 })
        .from(topics.children, { autoAlpha: 0, y: 14, duration: 0.45, stagger: 0.065 }, "-=0.25")

      gsap.from(cards, {
        autoAlpha: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: topics, start: "bottom 82%", once: true },
      })
    }, section)

    return () => context.revert()
  }, [scope])
}
