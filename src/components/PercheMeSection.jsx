import Icon from './Icon'
import Reveal from './Reveal'

const cards = [
  {
    title: 'Ascolto vero',
    desc: 'Non parto da un template. Parto da te. Ogni soluzione è pensata per il tuo caso specifico, non adattata a un pacchetto esistente.',
  },
  {
    title: 'Nessun vendor lock-in',
    desc: 'Tutto ciò che costruisco è basato su tecnologie open source e dati di tua proprietà. Se domani vuoi cambiare fornitore, porti via tutto.',
  },
  {
    title: 'Prezzi trasparenti',
    desc: 'Sai esattamente cosa paghi e perché. Nessuna voce nascosta, nessun costo ricorrente imposto. Preventivi chiari, senza sorprese.',
  },
  {
    title: 'Supporto reale',
    desc: 'Non sparisco dopo il lancio. Ogni progetto include assistenza e aggiornamenti. Perché un sito abbandonato è un sito che non funziona.',
  },
]

export default function PercheMeSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-16">
          <Reveal variant="pixel-step">
            <p className="text-xs font-pixel text-accent-purple tracking-wider mb-4">
              PERCHÉ SCEGLIERMI
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black">
              Cosa ottieni lavorando con me.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="rounded-2xl border border-brand-gray-100 p-8 transition-all hover:border-brand-black/20 hover:shadow-lg">
              <div className="w-10 h-10 rounded-full bg-brand-black text-white flex items-center justify-center mb-5">
                <Icon name="check" className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-black mb-2">{card.title}</h3>
              <p className="text-sm text-brand-gray-400 leading-relaxed">{card.desc}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
