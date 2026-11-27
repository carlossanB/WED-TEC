import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { matchRoute, normalizePath, type AppRoute } from "@/app/routing/routeMatcher"
import type { ServiceDetail } from "@/types/services"

export interface RouterContextType {
  currentPath: string
  route: AppRoute
  navigate: (to: string) => void
  activeSlug: string | null
  isHome: boolean
  isServicesIndex: boolean
  isServiceDetail: boolean
  isCaseLookup: boolean
  isNewsPortal: boolean
  currentService?: ServiceDetail
}

const RouterContext = createContext<RouterContextType | null>(null)

function getCurrentPath(): string {
  if (typeof window === "undefined") return "/"
  const hash = window.location.hash
  if (hash.startsWith("#/")) return hash.slice(1)
  return `${normalizePath(window.location.pathname)}${window.location.search}`
}

function getDocumentTitle(route: AppRoute): string {
  if (route.kind === "service-detail") return `${route.service.title} | Servicios Sin Fronteras`
  if (route.kind === "services-index") return "Servicios Migratorios y Legales | Servicios Sin Fronteras"
  if (route.kind === "case-lookup") return "Consulta tu caso USCIS | Servicios Sin Fronteras"
  if (route.kind === "news-portal") return "Portal de Noticias Migratorias | Servicios Sin Fronteras"
  return "Servicios Sin Fronteras | Guía clara y humana"
}

function scrollToTarget(anchorId: string, smooth = true): boolean {
  let target = document.getElementById(anchorId)
  if (!target) {
    if (anchorId === "faq" || anchorId === "preguntas-frecuentes") {
      target = document.getElementById("preguntas-frecuentes") || document.getElementById("faq") || document.getElementById("recursos")
    } else if (anchorId === "recursos") {
      target = document.getElementById("recursos") || document.getElementById("preguntas-frecuentes")
    } else if (anchorId === "contacto") {
      target = document.getElementById("contacto")
    }
  }

  if (target) {
    target.scrollIntoView({ behavior: smooth ? "smooth" : "instant", block: "start" })
    return true
  }
  return false
}

function scheduleScroll(anchorId: string) {
  if (scrollToTarget(anchorId, true)) return
  let attempts = 0
  const interval = window.setInterval(() => {
    attempts++
    if (scrollToTarget(anchorId, true) || attempts >= 30) {
      window.clearInterval(interval)
    }
  }, 40)
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)
  const route = useMemo(() => matchRoute(currentPath), [currentPath])

  const navigate = useCallback((to: string) => {
    if (typeof window === "undefined") return

    // Handle "/#section-id" links (e.g. from footer when on a sub-page)
    const homeAnchorMatch = /^\/#([^/].*)$/.exec(to)
    if (homeAnchorMatch) {
      const anchorId = homeAnchorMatch[1]
      if (route.kind !== "home") {
        window.history.pushState({}, "", to)
        setCurrentPath("/")
        scheduleScroll(anchorId)
        return
      }
      scrollToTarget(anchorId, true)
      window.history.pushState({}, "", to)
      return
    }

    if (to.startsWith("#") && !to.startsWith("#/")) {
      const anchorId = to.slice(1)
      if (route.kind !== "home") {
        window.history.pushState({}, "", `/${to}`)
        setCurrentPath("/")
        scheduleScroll(anchorId)
        return
      }
      scrollToTarget(anchorId, true)
      window.history.pushState({}, "", to)
      return
    }

    const path = to.startsWith("#/") ? to.slice(1) : to
    try {
      window.history.pushState({}, "", path)
    } catch {
      window.location.hash = `#${path}`
    }
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [route.kind])

  useEffect(() => {
    const syncPath = () => setCurrentPath(getCurrentPath())
    window.addEventListener("popstate", syncPath)
    window.addEventListener("hashchange", syncPath)
    return () => {
      window.removeEventListener("popstate", syncPath)
      window.removeEventListener("hashchange", syncPath)
    }
  }, [])

  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.startsWith("#") && !hash.startsWith("#/")) {
      scheduleScroll(hash.slice(1))
    }
  }, [currentPath])

  useEffect(() => { document.title = getDocumentTitle(route) }, [route])

  const contextValue = useMemo<RouterContextType>(() => {
    const currentService = route.kind === "service-detail" ? route.service : undefined
    return {
      currentPath, route, navigate,
      activeSlug: route.kind === "service-detail" || route.kind === "service-not-found" ? route.slug : null,
      isHome: route.kind === "home",
      isServicesIndex: route.kind === "services-index",
      isServiceDetail: route.kind === "service-detail",
      isCaseLookup: route.kind === "case-lookup",
      isNewsPortal: route.kind === "news-portal",
      currentService,
    }
  }, [currentPath, navigate, route])

  return <RouterContext.Provider value={contextValue}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) throw new Error("useRouter must be used within a RouterProvider")
  return context
}
