import Reveal from './Reveal'

export default function MissioneSection() {
  const valori = [
    {
      title: 'Trasparenza',
      desc: 'Ti spiego ogni scelta, tecnica e strategica, in italiano semplice. Niente buzzword per confonderti.',
    },
    {
      title: 'Qualità sopra quantità',
      desc: 'Preferisco un progetto ben fatto che dieci fatti a metà. Non ho fretta.',
    },
    {
      title: 'Risultati misurabili',
      desc: 'Se non si può misurare, non si può migliorare. Ogni progetto ha KPI chiari fin dal giorno uno.',
    },
    {
      title: 'Relazioni lunghe',
      desc: 'Non cerco il cliente facile. Cerco chi vuole costruire un percorso di crescita, non un sitino "tanto per esserci".',
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl mb-16">
          <Reveal variant="pixel-step">
            <p className="text-xs font-pixel text-accent-violet tracking-wider mb-4">
              MISSIONE
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-6">
              Cosa guida ogni mio progetto.
            </h2>
          </Reveal>
          <p className="text-brand-gray-400 leading-relaxed mb-4">
            Credo che la tecnologia debba essere al servizio delle persone, non il contrario.
          </p>
          <p className="text-brand-gray-400 leading-relaxed">
            La mia missione è <strong className="text-brand-black">rendere il digitale accessibile, comprensibile e redditizio</strong> per chi non è nativo digitale. Per l'artigiano che non ha tempo di imparare SEO, per il negoziante che non sa cosa sia un funnel, per il professionista che vuole farsi trovare online senza diventare un programmatore.
          </p>
          <p className="text-brand-gray-400 leading-relaxed mt-4">
            Non ti insegnerò a fare il mio lavoro. Ti darò strumenti che fanno il lavoro per te.
          </p>
        </div>

        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
          {valori.map((v) => (
            <div key={v.title} className="flex gap-4">
              <span className="text-accent-orange font-bold text-lg flex-shrink-0">{v.title.split(' ')[0][0]}</span>
              <div>
                <h3 className="font-bold text-brand-black mb-1">{v.title}</h3>
                <p className="text-sm text-brand-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}
