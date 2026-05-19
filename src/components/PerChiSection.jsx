import Reveal from './Reveal'

export default function PerChiSection() {
  const punti = [
    'Ha un prodotto o servizio di qualità ma fatica a farlo conoscere online',
    'Non ha tempo da dedicare al digitale (e non vuole imparare)',
    'Ha già bruciato soldi con agenzie che promettevano e non mantenevano',
    'Vuole capire cosa funziona e perché, non solo "avere un sito"',
    'Crede nel lungo termine, non nel risultato immediato',
  ]

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-salmon tracking-wider mb-4">
            PER CHI LAVORO
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-6">
            I progetti che amo di più.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-brand-gray-400 leading-relaxed mb-8">
            Mi trovi bene con chi:
          </p>
        </Reveal>
        <Reveal delay={150}>
          <ul className="space-y-4">
          {punti.map((p, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-salmon/10 text-accent-salmon text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-brand-gray-500 leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 text-brand-gray-400 italic">
          Se ti riconosci in almeno uno di questi punti, probabilmente possiamo lavorare bene insieme.
        </p>
        </Reveal>
      </div>
    </section>
  )
}
