import { useLayoutEffect } from "react"
import { gsap, ScrollTrigger } from "@/shared/lib/gsap"

export function useEditorialImageReveals(routeKey: string) {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-editorial-image]")
    )
    if (!elements.length) return

    const context = gsap.context(() => {
      elements.forEach(element => {
        const image = element.querySelector<HTMLImageElement>("img")
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        })

        timeline.fromTo(
          element,
          { autoAlpha: 0, y: 18, clipPath: "inset(0 0 14% 0 round 12px)" },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0 0 0% 0 round 12px)",
            duration: 0.72,
            ease: "power3.out",
          }
        )

        if (image) {
          timeline.fromTo(
            image,
            { scale: 1.045 },
            { scale: 1, duration: 0.9, ease: "power2.out", clearProps: "transform" },
            0
          )
        }
      })
    })

    let active = true
    const images = elements
      .map(element => element.querySelector<HTMLImageElement>("img"))
      .filter((image): image is HTMLImageElement => Boolean(image))

    void Promise.allSettled(
      images.map(image => (image.complete ? Promise.resolve() : image.decode()))
    ).then(() => {
      if (active) ScrollTrigger.refresh()
    })

    return () => {
      active = false
      context.revert()
    }
  }, [routeKey])
}
