import { BookOpen, Flame, Drama } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const card3i = [
  {
    n: 'I',
    icon: BookOpen,
    title: 'Informare',
    claim: 'I tuoi clienti non comprano ciò che non capiscono.',
    desc: 'Ogni pagina, post ed email ha un obiettivo: educare il tuo pubblico. Trasformo la tua competenza in contenuti di valore che portano il cliente a una decisione consapevole.',
    esempi: [
      'Un artigiano che racconta come nasce un tavolo su misura',
      'Guide e approfondimenti pubblicati su LinkedIn',
      'Un sito che risponde alle domande prima ancora che vengano poste',
    ],
  },
  {
    n: 'II',
    icon: Flame,
    title: 'Ispirare',
    claim: 'Le persone comprano emozioni, poi giustificano con la logica.',
    desc: 'Un design pulito, una storia ben raccontata, un flusso naturale perché progettato con cura: tutto questo crea fiducia. E la fiducia trasforma un visitatore in cliente.',
    esempi: [
      'Una homepage che racconta chi sei in 5 secondi',
      'Immagini coerenti che parlano la lingua del tuo brand',
      'Una timeline visiva della tua storia o del tuo processo',
    ],
  },
  {
    n: 'III',
    icon: Drama,
    title: 'Intrattenere',
    claim: 'Nessuno ha mai comprato da un noioso.',
    desc: 'Rendere interessante ciò che fai: l\'angolo giusto, il dettaglio che incuriosisce, il formato che tiene incollato. Non serve un budget da multinazionale, serve capire cosa rende unica la tua storia.',
    esempi: [
      'Un reel sul “dietro le quinte” della lavorazione',
      'Un post che rompe uno stereotipo del tuo settore',
      'Una newsletter che è un appuntamento, non una pubblicità',
    ],
  },
]

export default function Metodo3ISection() {
  return (
    <section id="metodo-3i" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <Reveal><Eyebrow>Il mio approccio</Eyebrow></Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Il metodo <span className="grad-text">3I</span>: Informare, Ispirare, Intrattenere.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Tre parole guidano ogni progetto, grande o piccolo. Tre pilastri su cui costruisco
              strategie, contenuti e tecnologie. Tre promesse a chi lavora con me.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {card3i.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.title} delay={i * 80}>
                <div
                  data-cursor
                  className="group flex h-full flex-col rounded-3xl border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-32px_rgba(157,100,241,0.4)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-semibold leading-none grad-text">{c.n}</span>
                    <span className="grad-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-cream">
                      <Icon className="h-5 w-5 text-violet transition-colors group-hover:text-orange" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm font-medium text-ink-soft">{c.claim}</p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{c.desc}</p>
                  <ul className="mt-6 space-y-2 border-t border-line pt-5">
                    {c.esempi.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full grad" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
