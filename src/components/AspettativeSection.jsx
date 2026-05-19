import Reveal from './Reveal'

export default function AspettativeSection() {
  const steps = [
    {
      num: '01',
      title: 'Ricevo la tua richiesta',
      desc: 'Una notifica mi arriva all\'istante via email e sul database.',
    },
    {
      num: '02',
      title: 'La leggo con attenzione',
      desc: 'Dedico tempo a capire la tua situazione, le tue esigenze, il tuo settore.',
    },
    {
      num: '03',
      title: 'Ti rispondo entro 24 ore',
      desc: 'Con un\'idea chiara di cosa posso fare per te, come, e con che investimento.',
    },
  ]

  return (
    <section className="py-24 px-6 bg-brand-black text-white">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-orange tracking-wider mb-4">
            DOPO L&apos;INVIO
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Cosa succede dopo che clicchi &ldquo;Invia&rdquo;?
          </h2>
        </Reveal>

        <Reveal>
          <div className="grid gap-8 md:grid-cols-3 mb-8">
          {steps.map((s) => (
            <div key={s.num}>
              <span className="text-4xl font-bold text-accent-orange/30">{s.num}</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-brand-gray-200 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-sm text-brand-gray-300 italic border-t border-white/10 pt-6">
          Nessun messaggio automatico. Nessun copia-incolla. Ogni risposta è scritta personalmente da me.
        </p>
        </Reveal>
      </div>
    </section>
  )
}
