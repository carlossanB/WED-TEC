import { useEffect } from "react"

export function useScrollReveal(pathname: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (!elements.length) return
    document.documentElement.classList.add("has-scroll-reveal")
    if (!("IntersectionObserver" in window)) {
      elements.forEach(element => element.classList.add("is-visible"))
      return () => document.documentElement.classList.remove("has-scroll-reveal")
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" })

    elements.forEach(element => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("has-scroll-reveal")
    }
  }, [pathname])
}
