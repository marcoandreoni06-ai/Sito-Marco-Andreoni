import { Ear, Unlock, BadgeEuro, LifeBuoy } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const cards = [
  {
    icon: Ear,
    title: 'Ascolto vero',
    desc: 'Non parto da un template. Parto da te: ogni soluzione è pensata per il tuo caso specifico.',
  },
  {
    icon: Unlock,
    title: 'Nessun vendor lock-in',
    desc: 'Tecnologie open source e dati di tua proprietà. Se domani cambi fornitore, porti via tutto.',
  },
  {
    icon: BadgeEuro,
    title: 'Prezzi trasparenti',
    desc: 'Sai cosa paghi e perché. Nessuna voce nascosta, nessun costo ricorrente imposto.',
  },
  {
    icon: LifeBuoy,
    title: 'Supporto reale',
    desc: 'Non sparisco dopo il lancio. Ogni progetto include assistenza e aggiornamenti.',
  },
]

export default function PercheMeSection() {
  return (
    <section className="border-t border-line bg-cream px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <Reveal><Eyebrow>Perché scegliermi</Eyebrow></Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Cosa ottieni lavorando con me.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <Reveal key={card.title} delay={i * 70}>
                <div
                  data-cursor
                  className="group h-full rounded-3xl border border-line bg-panel p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgba(157,100,241,0.45)]"
                >
                  <div className="grad-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-ink transition-colors">
                    <Icon className="h-5 w-5 text-violet transition-colors group-hover:text-orange" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">{card.title}</h3>
                  <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted">{card.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
