import { useEffect, useState } from "react"
import SiteLayout from "@/app/layout/SiteLayout"
import { RouterProvider, useRouter } from "@/app/providers/RouterProvider"
import CaseLookupPage from "@/features/case-lookup/CaseLookupPage"
import ConsultationDialog from "@/features/consultation/ConsultationDialog"
import HomePage from "@/features/home/HomePage"
import PrivacyPolicyPage from "@/features/legal/PrivacyPolicyPage"
import TermsConditionsPage from "@/features/legal/TermsConditionsPage"
import NewsPortalPage from "@/features/news/NewsPortalPage"
import ServicesRoute from "@/features/services/ServicesRoute"
import { useEditorialImageReveals } from "@/shared/hooks/useEditorialImageReveals"
import { useScrollReveal } from "@/shared/hooks/useScrollReveal"

function AppContent() {
  const { currentPath, route } = useRouter()
  const [consultationModal, setConsultationModal] = useState<{ isOpen: boolean; serviceTitle: string }>({
    isOpen: false,
    serviceTitle: "",
  })

  useEditorialImageReveals(currentPath)
  useScrollReveal(currentPath)

  useEffect(() => {
    document.documentElement.lang = "es"
  }, [])

  const handleOpenConsultation = (serviceTitle?: string) => {
    setConsultationModal({
      isOpen: true,
      serviceTitle: serviceTitle || "",
    })
  }

  const handleCloseConsultation = () => {
    setConsultationModal(prev => ({ ...prev, isOpen: false }))
  }

  const content =
    route.kind === "home"
      ? <HomePage onOpenConsultation={handleOpenConsultation} />
      : route.kind === "services-index" || route.kind === "service-detail" || route.kind === "service-not-found"
        ? <ServicesRoute route={route} onOpenConsultation={handleOpenConsultation} />
        : route.kind === "case-lookup"
          ? <CaseLookupPage onOpenConsultation={() => handleOpenConsultation("Consulta de Caso USCIS")} />
          : route.kind === "news-portal"
            ? <NewsPortalPage onOpenConsultation={handleOpenConsultation} />
            : route.kind === "privacy-policy"
              ? <PrivacyPolicyPage />
              : route.kind === "terms-conditions"
                ? <TermsConditionsPage />
                : <HomePage onOpenConsultation={handleOpenConsultation} />

  return (
    <SiteLayout onOpenConsultation={handleOpenConsultation}>
      {content}
      <ConsultationDialog
        isOpen={consultationModal.isOpen}
        serviceTitle={consultationModal.serviceTitle}
        onClose={handleCloseConsultation}
      />
    </SiteLayout>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  )
}
