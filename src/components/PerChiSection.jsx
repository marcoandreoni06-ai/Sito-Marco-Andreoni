import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const punti = [
  'Ha un prodotto di qualità ma fatica a farlo conoscere online',
  'Non ha tempo da dedicare al digitale (e non vuole impararlo)',
  'Ha già bruciato soldi con agenzie che promettevano e non mantenevano',
  'Vuole capire cosa funziona e perché, non solo “avere un sito”',
  'Crede nel lungo termine, non nel risultato immediato',
]

export default function PerChiSection() {
  return (
    <section className="border-t border-line bg-cream px-6 py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal><Eyebrow>Per chi lavoro</Eyebrow></Reveal>
        <Reveal>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            I progetti che amo di più.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 leading-relaxed text-muted">Mi trovo bene con chi:</p>
        </Reveal>

        <ul className="mt-10">
          {punti.map((p, i) => (
            <Reveal
              key={p}
              as="li"
              variant="left"
              delay={i * 70}
              className="block border-t border-line py-6 last:border-b"
            >
              <div className="flex items-baseline gap-5 sm:gap-7">
                <span className="font-display text-3xl font-semibold leading-none grad-text sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-lg leading-relaxed text-ink-soft sm:text-xl">{p}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-10 max-w-xl text-pretty text-lg italic leading-relaxed text-muted">
            Se ti riconosci in almeno uno di questi punti, probabilmente possiamo lavorare bene insieme.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
