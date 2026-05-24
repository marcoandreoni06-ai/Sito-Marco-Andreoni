import SEO from '../seo/SEO'
import { getPersonSchema, getBreadcrumbSchema } from '../lib/structuredData'
import ChiSonoHero from '../components/ChiSonoHero'
import StoriaSection from '../components/StoriaSection'
import MissioneSection from '../components/MissioneSection'
import Metodo3ISection from '../components/Metodo3ISection'
import CompetenzeSection from '../components/CompetenzeSection'
import ComeLavoroSection from '../components/ComeLavoroSection'
import PerChiSection from '../components/PerChiSection'
import FaqSection from '../components/FaqSection'
import CtaSection from '../components/CtaSection'

export default function ChiSono() {
  return (
    <>
      <SEO
        title="Chi Sono"
        description="Marco Andreoni \u2014 Consulente in comunicazione digitale e automazione AI. Scopri la mia storia, il metodo 3I e come posso aiutare la tua impresa a crescere online."
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
      <Metodo3ISection />
      <CompetenzeSection />
      <ComeLavoroSection />
      <PerChiSection />
      <FaqSection />
      <CtaSection
        headline="Ti ho incuriosito?"
        body="Se sei arrivato fin qui, probabilmente c'\u00e8 qualcosa che vuoi migliorare del tuo modo di comunicare online. O forse vuoi iniziare e non sai da dove partire. In entrambi i casi, il primo passo \u00e8 semplice."
        cta="Prenota 15 minuti gratuiti \u2192"
      />
    </>
  )
}
