import HomeNewsSection from "@/features/news/components/HomeNewsSection"
import FAQ from "./components/FAQ"
import FeaturedServices from "./components/FeaturedServices"
import FinalCTA from "./components/FinalCTA"
import Hero from "./components/Hero"
import NeedShortcuts from "./components/NeedShortcuts"
import ProcessSteps from "./components/ProcessSteps"
import TrustSection from "./components/TrustSection"

interface HomePageProps {
  onOpenConsultation: (serviceTitle: string) => void
}

export default function HomePage({ onOpenConsultation }: HomePageProps) {
  return (
    <>
      <Hero onOpenConsultation={() => onOpenConsultation("")} />
      <NeedShortcuts />
      <FeaturedServices />
      <ProcessSteps />
      <TrustSection />
      <HomeNewsSection onOpenConsultation={onOpenConsultation} />
      <FAQ />
      <FinalCTA onOpenConsultation={() => onOpenConsultation("")} />
    </>
  )
}
