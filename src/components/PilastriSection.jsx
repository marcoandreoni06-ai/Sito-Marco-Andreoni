import { Link } from 'react-router-dom'
import { Code2, Bot, Radio, Check, ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'
import VideoFrame from './ui/VideoFrame'
import { VIDEOS } from '../lib/media'

const pilastri = [
  {
    id: 'siti-web',
    n: '01',
    icon: Code2,
    kicker: 'Siti web che vendono',
    video: VIDEOS.web,
    headline: 'Sviluppo web professionale, senza template.',
    body: "Non un biglietto da visita digitale: il tuo venditore migliore, attivo 24/7. Lo costruisco con React e Vite — pagine che caricano in meno di un secondo, ben indicizzate e pensate per convertire.",
    include: [
      'Design responsivo (telefono, tablet, desktop)',
      'SEO on-page (meta-tag, dati strutturati, sitemap)',
      'Performance certificata (Lighthouse 90+/100)',
      'Form contatti con notifica email',
      'Dominio personalizzato e SSL',
      'Assistenza post-lancio',
    ],
    cta: 'Vedi cosa posso costruire',
  },
  {
    id: 'automazioni-ai',
    n: '02',
    icon: Bot,
    kicker: 'Automazioni AI',
    video: VIDEOS.ai,
    headline: "L'AI non è il futuro. È ora.",
    body: 'Ogni giorno ripeti le stesse attività: stesse domande, stessi dati, stesse email. Progetto flussi intelligenti che le svolgono al posto tuo — agenti AI che qualificano lead, scrivono email e raccolgono dati, lasciandoti solo le decisioni.',
    include: [
      'Lead generation automatizzata',
      'Email marketing sequenziale (drip campaigns)',
      'Scraping di dati strutturati',
      'Agenti AI personalizzati per il tuo business',
      'Integrazione con i tuoi strumenti (CRM, fogli, calendari)',
    ],
    cta: "Scopri cosa può automatizzare l'AI",
  },
  {
    id: 'comunicazione',
    n: '03',
    icon: Radio,
    kicker: 'Comunicazione',
    video: VIDEOS.comms,
    headline: 'Non più rumore di fondo. Messaggi che restano.',
    body: 'Ogni giorno vengono pubblicati milioni di contenuti: la maggior parte viene ignorata perché senza strategia. Costruisco una comunicazione che parte dal tuo pubblico e dai tuoi obiettivi — ogni post ha un perché, e un risultato misurabile.',
    include: [
      'Social media management (pianificazione, creazione, analisi)',
      'Copywriting per sito, email e social',
      'Identità visiva coordinata (logo, palette, font)',
      'Storytelling di brand',
      'Calendario editoriale mensile',
    ],
    cta: 'Costruiamo la tua strategia',
  },
]

export default function PilastriSection() {
  return (
    <section id="servizi-offerti" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <Reveal><Eyebrow>Cosa faccio</Eyebrow></Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Soluzioni digitali che portano <span className="grad-text">risultati reali</span>.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Non vendo pacchetti preconfezionati. Costruisco strumenti su misura per il tuo business,
              partendo da un'analisi concreta delle tue esigenze.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {pilastri.map((p, i) => {
            const Icon = p.icon
            const flip = i % 2 === 1
            return (
              <article
                key={p.id}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                {/* Video */}
                <Reveal
                  variant="scale-in"
                  className={flip ? 'md:order-2' : ''}
                >
                  <div className="relative">
                    <VideoFrame src={p.video} className="aspect-[4/3] rounded-[1.4rem]" />
                    <div className="absolute -bottom-4 left-5 rounded-xl border border-line bg-panel px-3.5 py-2 shadow-lg">
                      <span className="font-pixel text-[0.7rem] grad-text">{p.n}</span>
                    </div>
                  </div>
                </Reveal>

                {/* Content */}
                <Reveal delay={80} className={flip ? 'md:order-1' : ''}>
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-cream px-3.5 py-1.5">
                    <Icon className="h-4 w-4 text-violet" />
                    <span className="font-pixel text-[0.58rem] uppercase tracking-wider text-muted">
                      {p.kicker}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
                    {p.headline}
                  </h3>
                  <p className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-muted">
                    {p.body}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {p.include.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full grad">
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contatti"
                    className="link-u mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
                  >
                    {p.cta}
                    <ArrowUpRight className="h-4 w-4 text-violet" />
                  </Link>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
