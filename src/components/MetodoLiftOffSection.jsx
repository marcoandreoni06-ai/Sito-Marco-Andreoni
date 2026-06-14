import { useEffect, useRef } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const fasi = [
  {
    n: '01',
    fase: "L'Hub Digitale ad Alto Margine",
    sub: 'Fase 1 — Il Sito Web',
    body: "Una macchina da conversione su misura: trasforma il traffico in prenotazioni dirette, senza commissioni di piattaforme terze.",
    items: ['Landing Page dedicate', 'Pixel & Analytics avanzato'],
  },
  {
    n: '02',
    fase: 'Il Funnel di Traffico Social & Retargeting',
    sub: "Fase 2 — L'Acceleratore",
    body: "Intercettiamo i clienti dove passano il loro tempo — Instagram, Facebook, TikTok — con campagne sponsorizzate mirate.",
    items: ['Lead Magnet su misura', 'Retargeting intelligente'],
  },
  {
    n: '03',
    fase: 'Il Sistema Operativo assistito da AI',
    sub: "Fase 3 — L'Elemento Differenziante",
    body: "Ti consegniamo un asset definitivo: un database centralizzato che raccoglie ogni prenotazione e contatto generato dalla tua attività.",
    items: ['Pannello AI già configurato', 'Storico clienti proprietario'],
  },
]

const benefici = [
  {
    label: 'Controllo Totale',
    desc: "Non dipendi da algoritmi esterni o da terze parti. L'intero sistema è di tua proprietà.",
  },
  {
    label: 'Ottimizzazione dei Tempi Morti',
    desc: "Spostiamo i flussi di clienti dove e quando ne hai più bisogno, riempiendo l'agenda anche nei giorni più calmi.",
  },
  {
    label: 'Automazione Reale',
    desc: "Tu gestisci la tua attività. L'AI si occupa di organizzare il flusso di lavoro e le prenotazioni.",
  },
]

export default function MetodoLiftOffSection() {
  const listRef = useRef(null)
  const fillRef = useRef(null)

  // Linea-spina che si "disegna" col gradiente mentre la sezione scorre nel viewport.
  // Scrive direttamente lo stile (niente re-render React) per restare fluida con Lenis.
  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      fill.style.height = '100%'
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = list.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const fillPoint = vh * 0.52
      const p = Math.max(0, Math.min(1, (fillPoint - rect.top) / rect.height))
      fill.style.height = (p * 100).toFixed(2) + '%'
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="px-6 pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="mx-auto max-w-6xl">

        {/* Header — icona libera, animazione razzo */}
        <div className="mb-14 flex flex-col items-center text-center md:mb-20">
          <Reveal variant="rocket">
            <img
              src="/rocket-liftoff.png"
              alt="Metodo LiftOff"
              className="mb-5 h-40 w-40 object-contain"
            />
          </Reveal>
          <Reveal delay={40}>
            <Eyebrow>Metodo LiftOff</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Un ecosistema digitale completo{' '}
              <span className="grad-text">in 3 fasi</span>.
            </h2>
          </Reveal>
        </div>

        {/* Fasi — sequenza editoriale numerica con linea che si disegna */}
        <div ref={listRef} className="relative">
          {/* Spina di progresso (desktop): traccia + riempimento gradiente */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 hidden w-px bg-line sm:block"
          >
            <div
              ref={fillRef}
              className="absolute inset-x-0 top-0 grad"
              style={{ height: '0%' }}
            />
          </div>

          <ol className="sm:pl-12">
            {fasi.map((f) => (
              <li
                key={f.n}
                className="grid items-start gap-x-8 gap-y-5 border-t border-line py-10 first:border-t-0 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-x-12 sm:py-16"
              >
                {/* Numero fase + sub-badge */}
                <div>
                  <Reveal variant="pixel-step">
                    <span className="block font-display text-[3.5rem] font-semibold leading-[0.9] tracking-tight grad-text sm:text-7xl md:text-8xl">
                      {f.n}
                    </span>
                  </Reveal>
                  <Reveal delay={140}>
                    <span className="mt-4 inline-block rounded-full border border-line bg-cream px-2.5 py-0.5 font-pixel text-[0.48rem] uppercase tracking-wider text-muted">
                      {f.sub}
                    </span>
                  </Reveal>
                </div>

                {/* Contenuto */}
                <Reveal variant="right" delay={80} className="min-w-0 sm:pt-1">
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-ink sm:text-2xl md:text-[1.7rem]">
                    {f.fase}
                  </h3>
                  <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">
                    {f.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {f.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full grad">
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefici */}
        <Reveal>
          <div className="mb-7 mt-16 border-t border-line pt-12 sm:mt-20">
            <Eyebrow bare>Perché questo metodo funziona dove le altre agenzie falliscono</Eyebrow>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {benefici.map((b, i) => (
            <Reveal key={b.label} delay={i * 70}>
              <div data-cursor className="card-hover h-full rounded-3xl border border-line bg-cream p-6">
                <h4 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {b.label}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={60}>
          <div className="mt-12 text-center">
            <Link to="/contatti" className="btn btn-primary px-7 py-3.5 text-sm">
              Scopri se è giusto per la tua attività
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
