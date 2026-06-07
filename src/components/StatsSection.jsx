import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'
import CountUp from './fx/CountUp'

const stats = [
  { value: 3, suffix: '', label: 'Anni di progetti', desc: 'Sul campo, tra collaborazioni e formazione continua.' },
  { value: 24, suffix: 'h', label: 'Tempo di risposta', desc: 'Ogni richiesta, letta e risposta entro un giorno.' },
  { value: 100, suffix: '%', label: 'Su misura', desc: 'Zero template. Ogni progetto parte da te.' },
]

export default function StatsSection() {
  return (
    <section className="border-y border-line bg-cream px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal><Eyebrow>In numeri</Eyebrow></Reveal>
        <Reveal>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Qualità che si misura, non si racconta.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="bg-paper">
              <div className="h-full p-7">
                <p className="font-display text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                  <span className="grad-text">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </span>
                </p>
                <p className="mt-3 font-semibold text-ink">{s.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
