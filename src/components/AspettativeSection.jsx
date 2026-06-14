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

        <div className="relative mt-12 md:mt-14">
          {/* Connettore orizzontale (desktop): collega i 3 nodi in sequenza */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px md:block"
            style={{
              background: 'linear-gradient(90deg, var(--color-violet), var(--color-mauve), var(--color-orange))',
              opacity: 0.5,
            }}
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 90} as="li">
                <div className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-panel shadow-sm">
                    <span className="font-display text-xl font-semibold grad-text">{s.num}</span>
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
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
