import { Plus } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const faq = [
  { q: 'Quanto costa un progetto?', a: 'Dipende dalla complessità. Un sito vetrina ha un investimento diverso da un progetto con automazioni AI e database. Dopo la chiamata conoscitiva, ti preparo un preventivo chiaro e dettagliato, senza sorprese.' },
  { q: 'Quanto tempo ci vuole?', a: 'Un sito base richiede 1-2 settimane. Progetti più complessi (con database, automazioni, strategia contenuti) possono arrivare a 4-6 settimane. Ogni fase ha scadenze precise che concorderemo insieme.' },
  { q: 'Devo avere già un dominio e hosting?', a: 'No. Mi occupo io di tutto: dominio, certificato SSL, hosting. Ti basta avere le idee chiare.' },
  { q: 'Posso aggiornare il sito da solo dopo?', a: 'Certo. Se vuoi, ti lascio accesso e ti spiego le basi per modificare testi e immagini. Se preferisci che me ne occupi io, abbiamo un rapporto continuativo.' },
  { q: 'Fai solo siti o anche altro?', a: 'Siti web, automazioni AI, social media management, consulenza strategica, identità visiva. Ogni progetto è diverso. Se hai un\'esigenza che non trovi qui, parliamone.' },
  { q: 'Lavori solo a Fano / Marche?', a: 'Preferisco i progetti in presenza nella zona di Fano e provincia, ma seguo da remoto clienti in tutta Italia. La prima chiamata conoscitiva è sempre gratuita, ovunque tu sia.' },
]

export default function FaqSection({ items, title = 'Prima di contattarmi, forse ti stai chiedendo…' }) {
  const data = items || faq

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
        <Reveal>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {title}
          </h2>
        </Reveal>

        <div className="mt-12">
          {data.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <details data-cursor className="group border-t border-line py-5 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-display text-lg font-medium tracking-tight text-ink">
                  <span>{item.q}</span>
                  <span className="grad-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr] group-open:pt-3">
                  <p className="overflow-hidden text-pretty text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
