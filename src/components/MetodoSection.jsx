import { Link } from 'react-router-dom'
import Icon from './Icon'
import Reveal from './Reveal'

const fasi = [
  {
    fase: '1. Ascolto',
    desc: 'Ci conosciamo. Analizzo il tuo business, i tuoi obiettivi, il tuo mercato, i tuoi competitor. Capisco cosa ti serve davvero.',
    durata: '1-2 incontri',
  },
  {
    fase: '2. Strategia',
    desc: 'Progetto la soluzione: architettura del sito, flussi di automazione, piano contenuti. Ti presento un documento chiaro con costi e tempi.',
    durata: '2-5 giorni',
  },
  {
    fase: '3. Esecuzione',
    desc: 'Costruisco tutto con l\'aiuto di tecnologie moderne e agenti AI. Ogni fase ti viene mostrata e approvata prima di procedere.',
    durata: '1-4 settimane',
  },
  {
    fase: '4. Ottimizzazione',
    desc: 'Lancio, monitoraggio, aggiustamenti. Il progetto non finisce online: lo seguo per assicurarmi che funzioni e porti risultati.',
    durata: 'Continua',
  },
]

export default function MetodoSection() {
  return (
    <section className="py-24 px-6 bg-brand-black text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-16">
          <Reveal variant="pixel-step">
            <p className="text-xs font-pixel text-accent-coral tracking-wider mb-4">
              IL METODO
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Un metodo chiaro per risultati certi.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-brand-gray-200 leading-relaxed">
              Non improvviso. Ogni progetto segue un processo collaudato in 4 fasi.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {fasi.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-accent-coral/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.fase}</h3>
              <p className="text-sm text-brand-gray-200 leading-relaxed mb-3">{f.desc}</p>
              <span className="text-xs font-pixel text-accent-orange/60">{f.durata}</span>
            </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-brand-black transition-all hover:bg-brand-gray-200"
          >
            Inizia con una chiamata conoscitiva gratuita
            <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
