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

        <ul className="mt-8 flex flex-col gap-3">
          {punti.map((p, i) => (
            <Reveal key={p} delay={i * 60}>
              <li data-cursor className="card-hover flex items-start gap-4 rounded-2xl border border-line bg-panel p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full grad font-pixel text-[0.6rem] text-white">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed text-ink-soft">{p}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-8 text-pretty italic text-muted">
            Se ti riconosci in almeno uno di questi punti, probabilmente possiamo lavorare bene insieme.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
