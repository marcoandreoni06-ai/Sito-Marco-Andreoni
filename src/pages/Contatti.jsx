import SEO from '../seo/SEO'
import { getBreadcrumbSchema } from '../lib/structuredData'
import ContactForm from '../components/ContactForm'
import ContattiAltriSection from '../components/ContattiAltriSection'
import DoveSection from '../components/DoveSection'
import AspettativeSection from '../components/AspettativeSection'
import CtaSection from '../components/CtaSection'
import FaqSection from '../components/FaqSection'
import Reveal from '../components/Reveal'


const contattiFaq = [
  {
    q: 'Quanto costa una consulenza?',
    a: 'La prima chiamata conoscitiva di 15 minuti è gratuita e senza impegno. Solo dopo, se decidiamo di lavorare insieme, ti presento un preventivo dettagliato.',
  },
  {
    q: 'Offri assistenza anche dopo il progetto?',
    a: 'Sì. Ogni progetto include un periodo di assistenza post-lancio. Per aggiornamenti o modifiche successive, possiamo concordare un piano di manutenzione continuativo.',
  },
  {
    q: 'Lavori anche con partite IVA?',
    a: 'Certo. Lavoro regolarmente con partite IVA, ditte individuali e società. Emissione di fattura per ogni prestazione.',
  },
  {
    q: 'Accetti pagamenti rateali?',
    a: 'Per progetti più consistenti, valutiamo insieme un piano di pagamento personalizzato. Parliamone nella chiamata conoscitiva.',
  },
]

export default function Contatti() {
  return (
    <>
      <SEO
        title="Contatti"
        description="Contatta Marco Andreoni per una consulenza gratuita. Raccontami il tuo progetto e ti rispondo entro 24 ore con un'idea chiara di come possiamo lavorare insieme."
        canonicalUrl="https://www.marcandreoni.it/contatti"
        structuredData={[
          getBreadcrumbSchema([
            { label: 'Home', url: '/' },
            { label: 'Contatti', url: '/contatti' },
          ]),
        ]}
      />

      <section className="relative pt-22 pb-16 px-6 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="/video/hf_20260518_170736_536080c3-8e58-4040-9339-62a07abbaff3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white" />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <Reveal variant="pixel-step">
            <p className="text-xs font-pixel text-accent-orange mb-6 tracking-wider">
              CONTATTI
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-black leading-tight">
              Hai un progetto in mente? Parliamone.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-brand-gray-400 max-w-xl mx-auto">
              Raccontami cosa fai, cosa vuoi ottenere e cosa ti blocca. Ti rispondo entro 24 ore con un'idea chiara di come possiamo lavorare insieme.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal variant="pixel-step">
            <p className="text-xs font-pixel text-accent-violet tracking-wider mb-2">
              SCRIVIMI
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-sm text-brand-gray-400 mb-8">
              Compila il form qui sotto. Più dettagli mi dai, più mirata sarà la mia risposta.
            </p>
          </Reveal>
          <ContactForm />
        </div>
      </section>

      <ContattiAltriSection />
      <DoveSection />
      <AspettativeSection />

      <section className="pb-24">
        <FaqSection items={contattiFaq} />
      </section>

      <CtaSection
        headline="Non aspettare il momento perfetto."
        body="Il momento perfetto non arriva mai. Arriva il momento in cui decidi che è il caso di iniziare. Il tuo sito non deve essere perfetto al lancio: deve essere ben fatto, pensato per crescere, e costruito sulla tua identità. Il resto viene da sé, con il tempo, con i contenuti, con il lavoro costante. Se aspetti di avere tutto pronto, non inizierai mai. Inizia con una chiacchierata. Il resto lo costruiamo insieme."
        cta="Prenota 15 minuti gratuiti \u2192"
      />
    </>
  )
}
