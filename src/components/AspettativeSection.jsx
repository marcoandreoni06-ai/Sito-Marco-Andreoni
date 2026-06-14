import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const steps = [
  { num: '01', title: 'Ricevo la tua richiesta', desc: 'Mi arriva subito una notifica via email, direttamente nella mia casella.' },
  { num: '02', title: 'La leggo con attenzione', desc: 'Dedico tempo a capire la tua situazione, le tue esigenze, il tuo settore.' },
  { num: '03', title: 'Ti rispondo entro 24 ore', desc: "Con un'idea chiara di cosa posso fare per te, come, e con quale investimento." },
]

export default function AspettativeSection() {
  return (
    <section className="border-y border-line bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal><Eyebrow>Dopo l'invio</Eyebrow></Reveal>
        <Reveal>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-4xl">
            Cosa succede dopo che clicchi “Invia”?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 70}>
              <div data-cursor className="card-hover rounded-2xl border border-line bg-panel p-7">
                <span className="font-display text-4xl font-semibold leading-none grad-text">{s.num}</span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-pretty text-sm italic text-muted">
            Nessun messaggio automatico. Nessun copia-incolla. Ogni risposta è scritta personalmente da me.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
