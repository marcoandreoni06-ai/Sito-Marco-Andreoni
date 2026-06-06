import { Check } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const fasiDettaglio = [
  {
    n: '01',
    fase: 'Conoscenza',
    durata: 'gratuita · 15 minuti',
    desc: 'Una chiamata senza impegno. Mi racconti cosa fai, cosa vorresti ottenere e cosa ti blocca. Io ti racconto come lavoro e quali sono i prossimi passi.',
    punti: [
      "Hai un'idea chiara di cosa ti serve (anche se non lavoreremo insieme)",
      'So se posso aiutarti e come',
      "Decidiamo se procedere con un'analisi più approfondita",
    ],
  },
  {
    n: '02',
    fase: 'Analisi e proposta',
    durata: '',
    desc: "Se c'è feeling, approfondisco. Analizzo il tuo mercato, i tuoi competitor, la tua situazione attuale. Progetto una strategia su misura.",
    punti: ['Obiettivi e KPI', 'Soluzione tecnica e creativa', 'Tempistiche dettagliate', 'Investimento trasparente, nessuna voce nascosta'],
  },
  {
    n: '03',
    fase: 'Esecuzione e revisioni',
    durata: '',
    desc: 'Costruisco tutto con tecnologie moderne e agenti AI. Ogni fase viene condivisa con te, mai a scatola chiusa.',
    punti: ['Wireframe / bozza visiva', 'Sviluppo e integrazione', 'Contenuti e testi', 'Revisioni e approvazione finale'],
  },
  {
    n: '04',
    fase: 'Lancio e supporto',
    durata: '',
    desc: 'Deploy su dominio personalizzato, SSL attivo, Google Search Console configurata. Il sito è live. Ma non finisce qui.',
    punti: ['Monitoraggio delle performance', 'Aggiustamenti post-lancio', 'Assistenza continuativa', 'Report periodico sui risultati'],
  },
]

export default function ComeLavoroSection() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 max-w-2xl">
          <Reveal><Eyebrow>Come lavoro</Eyebrow></Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Dal primo contatto al progetto finito.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {fasiDettaglio.map((f, i) => (
            <Reveal key={f.n} delay={i * 60}>
              <div className="grid gap-6 rounded-3xl border border-line bg-panel p-7 sm:grid-cols-[auto_1fr] sm:p-9">
                <span className="font-display text-5xl font-semibold leading-none grad-text sm:text-6xl">{f.n}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{f.fase}</h3>
                    {f.durata && (
                      <span className="rounded-full border border-line bg-cream px-2.5 py-0.5 font-pixel text-[0.5rem] uppercase tracking-wider text-muted">
                        {f.durata}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{f.desc}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {f.punti.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full grad">
                          <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
