import PageTransition from '../components/fx/PageTransition'
import SEO from '../seo/SEO'
import { getPersonSchema, getBreadcrumbSchema } from '../lib/structuredData'
import ChiSonoHero from '../components/ChiSonoHero'
import StoriaSection from '../components/StoriaSection'
import MissioneSection from '../components/MissioneSection'
import CompetenzeSection from '../components/CompetenzeSection'
import ComeLavoroSection from '../components/ComeLavoroSection'
import PerChiSection from '../components/PerChiSection'
import FaqSection from '../components/FaqSection'
import CtaSection from '../components/CtaSection'

export default function ChiSono() {
  return (
    <PageTransition>
      <SEO
        title="Chi Sono"
        description="Marco Andreoni \u2014 Consulente in comunicazione digitale e automazione AI. Scopri la mia storia, le mie competenze e come posso aiutare la tua impresa a crescere online."
        canonicalUrl="https://marcoandreoni.marco-andreoni06.workers.dev/chi-sono"
        structuredData={[
          getPersonSchema(),
          getBreadcrumbSchema([
            { label: 'Home', url: '/' },
            { label: 'Chi Sono', url: '/chi-sono' },
          ]),
        ]}
      />

      <ChiSonoHero />
      <StoriaSection />
      <MissioneSection />
      <CompetenzeSection />
      <ComeLavoroSection />
      <PerChiSection />
      <FaqSection />
      <CtaSection
        headline="Ti ho incuriosito?"
        body="Se sei arrivato fin qui, forse c'è qualcosa che vuoi migliorare. Il primo passo è semplice: 15 minuti gratuiti, senza impegno."
        cta="Prenota 15 minuti gratuiti"
      />
    </PageTransition>
  )
}

