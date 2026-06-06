import SEO from '../seo/SEO'
import { getOrganizationSchema, getBreadcrumbSchema } from '../lib/structuredData'
import HeroSection from '../components/HeroSection'
import TrustBar from '../components/TrustBar'
import PilastriSection from '../components/PilastriSection'
import StatsSection from '../components/StatsSection'
import MetodoSection from '../components/MetodoSection'
import PercheMeSection from '../components/PercheMeSection'
import CtaSection from '../components/CtaSection'

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Marketing strategico, automazione AI e identità digitale per piccole imprese e professionisti nelle Marche. Sviluppo siti web performanti con React, AI automation e comunicazione digitale."
        canonicalUrl="https://marcoandreoni.marco-andreoni06.workers.dev"
        structuredData={[
          getOrganizationSchema(),
          getBreadcrumbSchema([{ label: 'Home', url: '/' }]),
        ]}
      />

      <HeroSection />
      <TrustBar />
      <PilastriSection />
      <StatsSection />
      <MetodoSection />
      <PercheMeSection />
      <CtaSection
        headline="Il primo passo è una chiacchierata."
        body="Niente presentazioni, niente preventivi forzati. Prenota 15 minuti gratuiti: mi racconti cosa fai, cosa vorresti ottenere e cosa ti blocca. Se c'è feeling, costruiamo qualcosa insieme."
        cta="Prenota i tuoi 15 minuti gratuiti"
      />
    </>
  )
}
