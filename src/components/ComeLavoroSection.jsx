const fasiDettaglio = [
  {
    fase: 'Fase 1: Conoscenza',
    durata: 'gratuita, 15 minuti',
    desc: 'Una chiamata senza impegno. Mi racconti cosa fai, cosa vorresti ottenere e cosa ti blocca. Io ti racconto come lavoro, cosa posso fare per te e quali sono i prossimi passi.',
    punti: [
      "Hai un'idea chiara di cosa ti serve (anche se non lavoreremo insieme)",
      'So se posso aiutarti e come',
      'Decidiamo se procedere con un\'analisi più approfondita',
    ],
  },
  {
    fase: 'Fase 2: Analisi e proposta',
    durata: '',
    desc: 'Se c\'è feeling, approfondisco. Analizzo il tuo mercato, i tuoi competitor, la tua situazione attuale. Progetto una strategia su misura.',
    punti: [
      'Obiettivi e KPI',
      'Soluzione tecnica e creativa',
      'Tempistiche dettagliate',
      'Investimento trasparente (nessuna voce nascosta)',
    ],
  },
  {
    fase: 'Fase 3: Esecuzione e revisioni',
    durata: '',
    desc: 'Costruisco tutto con tecnologie moderne e agenti AI. Ogni fase viene condivisa con te.',
    punti: [
      'Wireframe / bozza visiva',
      'Sviluppo e integrazione',
      'Contenuti e testi',
      'Revisioni e approvazione finale',
    ],
  },
  {
    fase: 'Fase 4: Lancio e supporto',
    durata: '',
    desc: 'Deploy su dominio personalizzato, SSL attivo, Google Search Console configurata. Il sito è live.',
    punti: [
      'Monitoraggio delle performance',
      'Eventuali aggiustamenti post-lancio',
      'Assistenza continuativa (aggiornamenti, modifiche, espansioni)',
      'Report periodico sui risultati',
    ],
  },
]

import Reveal from './Reveal'

export default function ComeLavoroSection() {
  return (
    <section className="py-24 px-6 bg-brand-cream">
      <div className="mx-auto max-w-4xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-salmon tracking-wider mb-4">
            COME LAVORO
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-12">
            Dal primo contatto al progetto finito.
          </h2>
        </Reveal>

        <div className="grid gap-8">
          {fasiDettaglio.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
            <div key={i} className="rounded-2xl border border-brand-gray-200 bg-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-black text-white text-xs font-bold">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-brand-black">{f.fase}</h3>
                {f.durata && (
                  <span className="text-xs font-pixel text-accent-salmon">{f.durata}</span>
                )}
              </div>
              <p className="text-sm text-brand-gray-400 leading-relaxed mb-4">{f.desc}</p>
              <ul className="space-y-1.5">
                {f.punti.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-brand-gray-500">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-violet/50 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
