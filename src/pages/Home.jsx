import PageTransition from '../components/fx/PageTransition'
import SEO from '../seo/SEO'
import { getOrganizationSchema, getBreadcrumbSchema } from '../lib/structuredData'
import HeroSection from '../components/HeroSection'
import TrustBar from '../components/TrustBar'
import MetodoLiftOffSection from '../components/MetodoLiftOffSection'
import StatsSection from '../components/StatsSection'
import CtaSection from '../components/CtaSection'

export default function Home() {
  return (
    <PageTransition>
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
      <MetodoLiftOffSection />
      <StatsSection />
      <CtaSection
        headline="Il primo passo è una chiacchierata."
        body="Niente preventivi forzati. 15 minuti gratuiti: mi racconti cosa ti blocca e, se c'è feeling, costruiamo qualcosa insieme."
        cta="Prenota i tuoi 15 minuti gratuiti"
      />
    </PageTransition>
  )
}
