import Reveal from './Reveal'

export default function DoveSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-coral tracking-wider mb-4">
            DOVE SONO
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-6">
            Opero principalmente nelle Marche.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="text-brand-gray-400 leading-relaxed space-y-4">
          <p>
            La mia base è a <strong className="text-brand-black">Fano</strong>, in provincia di Pesaro e Urbino. Lavoro volentieri in presenza per tutta la zona delle Marche, ma seguo progetti da remoto in tutta Italia.
          </p>
          <p>
            Se sei della zona, possiamo incontrarci per un caffè e parlare del tuo progetto dal vivo. Se sei più lontano, una videochiamata funziona altrettanto bene.
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
