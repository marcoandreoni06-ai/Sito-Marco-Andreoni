const faq = [
  {
    q: 'Quanto costa un progetto?',
    a: 'Dipende dalla complessità. Un sito vetrina ha un investimento diverso da un progetto con automazioni AI e database. Dopo la chiamata conoscitiva, ti preparo un preventivo chiaro e dettagliato, senza sorprese.',
  },
  {
    q: 'Quanto tempo ci vuole?',
    a: 'Un sito base richiede 1-2 settimane. Progetti più complessi (con database, automazioni, strategia contenuti) possono arrivare a 4-6 settimane. Ogni fase ha scadenze precise che concorderemo insieme.',
  },
  {
    q: 'Devo avere già un dominio e hosting?',
    a: 'No. Mi occupo io di tutto: dominio, certificato SSL, Cloudflare Pages per l\'hosting. Ti basta avere le idee chiare.',
  },
  {
    q: 'Posso aggiornare il sito da solo dopo?',
    a: 'Certo. Se vuoi, ti lascio accesso e ti spiego le basi per modificare testi e immagini. Se preferisci che me ne occupi io, abbiamo un rapporto continuativo.',
  },
  {
    q: 'Fai solo siti o anche altro?',
    a: 'Siti web, automazioni AI, social media management, consulenza strategica, identità visiva. Ogni progetto è diverso. Se hai un\'esigenza che non trovi qui, parliamone.',
  },
  {
    q: 'Lavori solo a Fano / Marche?',
    a: 'Preferisco i progetti in presenza nella zona di Fano e provincia, ma seguo da remoto clienti in tutta Italia. La prima chiamata conoscitiva è sempre gratuita, ovunque tu sia.',
  },
]

import Reveal from './Reveal'

export default function FaqSection({ items }) {
  const data = items || faq

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-violet tracking-wider mb-4">
            FAQ
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-10">
            Prima di contattarmi, forse ti stai chiedendo...
          </h2>
        </Reveal>

        <Reveal>
          <div className="space-y-6">
          {data.map((item) => (
            <details key={item.q} className="group border-b border-brand-gray-100 pb-6">
              <summary className="flex cursor-pointer items-center justify-between text-brand-black font-semibold list-none">
                <span>{item.q}</span>
                <span className="text-brand-gray-300 transition-transform group-open:rotate-45 text-lg leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-brand-gray-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}
