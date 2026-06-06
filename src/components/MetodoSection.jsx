import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const fasi = [
  {
    n: '01',
    fase: 'Ascolto',
    durata: '1–2 incontri',
    desc: 'Ci conosciamo. Analizzo il tuo business, i tuoi obiettivi, il tuo mercato e i tuoi competitor. Capisco cosa ti serve davvero.',
  },
  {
    n: '02',
    fase: 'Strategia',
    durata: '2–5 giorni',
    desc: 'Progetto la soluzione: architettura del sito, flussi di automazione, piano contenuti. Ti presento un documento chiaro con costi e tempi.',
  },
  {
    n: '03',
    fase: 'Esecuzione',
    durata: '1–4 settimane',
    desc: 'Costruisco tutto con tecnologie moderne e agenti AI. Ogni fase ti viene mostrata e approvata prima di procedere.',
  },
  {
    n: '04',
    fase: 'Ottimizzazione',
    durata: 'Continua',
    desc: 'Lancio, monitoraggio, aggiustamenti. Il progetto non finisce online: lo seguo per assicurarmi che funzioni e porti risultati.',
  },
]

export default function MetodoSection() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><Eyebrow>Il metodo</Eyebrow></Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Un metodo chiaro per <span className="grad-text">risultati certi</span>.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Non improvviso. Ogni progetto segue un processo collaudato in quattro fasi, dalla prima
              chiacchierata fino al lancio e oltre.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <Link to="/contatti" className="btn btn-primary mt-8 px-6 py-3 text-sm">
              Inizia con una call gratuita
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Steps */}
        <ol className="relative">
          <span className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
          {fasi.map((f, i) => (
            <Reveal key={f.n} delay={i * 60} as="li" className="relative flex gap-6 pb-10 last:pb-0">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-panel font-pixel text-[0.62rem] text-ink shadow-sm">
                <span className="grad-text">{f.n}</span>
              </span>
              <div className="pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">{f.fase}</h3>
                  <span className="rounded-full border border-line bg-cream px-2.5 py-0.5 font-pixel text-[0.5rem] uppercase tracking-wider text-muted">
                    {f.durata}
                  </span>
                </div>
                <p className="mt-2.5 max-w-md text-pretty text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
