const canali = [
  { label: 'Email', value: 'marco@marcandreoni.it', href: 'mailto:marco@marcandreoni.it' },
  { label: 'LinkedIn', value: 'linkedin.com/in/marcoandreoni', href: 'https://linkedin.com/in/marcoandreoni' },
  { label: 'Instagram', value: '@marcoandreoni', href: 'https://instagram.com/marcoandreoni' },
  { label: 'Telefono', value: '(disponibile dopo il primo contatto)', href: null },
]

import Reveal from './Reveal'

export default function ContattiAltriSection() {
  return (
    <section className="py-24 px-6 bg-brand-cream">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-purple tracking-wider mb-4">
            ALTRI CONTATTI
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-4">
            Preferisci un contatto diretto?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-brand-gray-400 mb-10">
            Puoi trovarmi anche su questi canali.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid gap-4 sm:grid-cols-2">
          {canali.map((c) => (
            <div key={c.label} className="rounded-xl border border-brand-gray-200 bg-white p-5">
              <p className="text-xs font-pixel text-brand-gray-300 uppercase tracking-wider mb-1">{c.label}</p>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-black hover:text-accent-purple transition-colors">
                  {c.value}
                </a>
              ) : (
                <p className="text-sm text-brand-gray-300">{c.value}</p>
              )}
            </div>
          ))}
        </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-sm text-brand-gray-300 italic">
          Rispondo a tutte le richieste entro 24 ore, dal lunedì al venerdì. Se mi contatti nel weekend, riceverai risposta il lunedì successivo.
        </p>
        </Reveal>
      </div>
    </section>
  )
}
