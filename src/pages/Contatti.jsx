import { Mail, Phone, Clock } from 'lucide-react'
import { LinkedinIcon, InstagramIcon } from '../components/ui/SocialIcons'
import SEO from '../seo/SEO'
import { getBreadcrumbSchema } from '../lib/structuredData'
import ContattiHero from '../components/ContattiHero'
import ContactForm from '../components/ContactForm'
import AspettativeSection from '../components/AspettativeSection'
import DoveSection from '../components/DoveSection'
import FaqSection from '../components/FaqSection'
import CtaSection from '../components/CtaSection'
import Reveal from '../components/Reveal'
import PageTransition from '../components/fx/PageTransition'

const contattiFaq = [
  { q: 'Quanto costa una consulenza?', a: 'La prima call di 15 minuti è gratuita e senza impegno. Solo dopo, se decidiamo di lavorare insieme, ti presento un preventivo dettagliato.' },
  { q: 'Offri assistenza anche dopo il progetto?', a: 'Sì, ogni progetto include assistenza post-lancio. Per gli aggiornamenti successivi possiamo concordare un piano di manutenzione.' },
  { q: 'Lavori anche con partite IVA?', a: 'Certo. Lavoro con partite IVA, ditte individuali e società, con fattura per ogni prestazione.' },
  { q: 'Accetti pagamenti rateali?', a: 'Per i progetti più consistenti valutiamo insieme un piano di pagamento personalizzato.' },
]

const canali = [
  { icon: Mail, label: 'Email', value: 'marco.andreoni06@gmail.com', href: 'mailto:marco.andreoni06@gmail.com' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/marcoandreoni', href: 'https://linkedin.com/in/marcoandreoni' },
  { icon: InstagramIcon, label: 'Instagram', value: '@marcoandreoni', href: 'https://instagram.com/marcoandreoni' },
  { icon: Phone, label: 'Telefono', value: 'Dopo il primo contatto', href: null },
]

export default function Contatti() {
  return (
    <PageTransition>
      <SEO
        title="Contatti"
        description="Contatta Marco Andreoni per una consulenza gratuita. Raccontami il tuo progetto e ti rispondo entro 24 ore con un'idea chiara di come possiamo lavorare insieme."
        canonicalUrl="https://marcoandreoni.marco-andreoni06.workers.dev/contatti"
        structuredData={[
          getBreadcrumbSchema([
            { label: 'Home', url: '/' },
            { label: 'Contatti', url: '/contatti' },
          ]),
        ]}
      />

      <ContattiHero />

      <section className="px-6 pb-8 pt-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <Reveal variant="left">
            <ContactForm />
          </Reveal>

          <Reveal variant="right" delay={80} className="lg:pt-2">
            <aside className="flex flex-col gap-4">
              <div className="rounded-3xl border border-line bg-panel p-6">
                <p className="font-pixel text-[0.6rem] uppercase tracking-wider text-faint">Contatto diretto</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Preferisci scrivermi direttamente? Mi trovi anche qui.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  {canali.map((c) => {
                    const Icon = c.icon
                    const inner = (
                      <>
                        <span className="grad-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-violet">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-pixel text-[0.5rem] uppercase tracking-wider text-faint">{c.label}</span>
                          <span className="block truncate text-sm font-medium text-ink">{c.value}</span>
                        </span>
                      </>
                    )
                    return c.href ? (
                      <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl border border-transparent p-2 transition-colors hover:border-line hover:bg-cream">
                        {inner}
                      </a>
                    ) : (
                      <div key={c.label} className="flex items-center gap-3 rounded-2xl p-2 opacity-80">{inner}</div>
                    )
                  })}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-line bg-cream p-6">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 grad" />
                <div className="flex items-center gap-3">
                  <span className="grad-ring flex h-10 w-10 items-center justify-center rounded-xl bg-panel text-violet">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="relative flex h-2 w-2" title="Disponibile">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full grad" />
                  </span>
                </div>
                <p className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">Risposta entro 24 ore</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  Dal lunedì al venerdì. Se scrivi nel weekend, ti rispondo il lunedì successivo.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <AspettativeSection />
      <DoveSection />
      <FaqSection items={contattiFaq} title="Le domande che ricevo più spesso." />

      <CtaSection
        headline="Non aspettare il momento perfetto."
        body="Il momento perfetto non arriva mai: arriva quello in cui decidi di iniziare. Il tuo sito non deve essere perfetto al lancio, ma pensato per crescere."
        cta="Prenota 15 minuti gratuiti"
      />
    </PageTransition>
  )
}
