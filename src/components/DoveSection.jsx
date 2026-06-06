import { MapPin } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

export default function DoveSection() {
  return (
    <section className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_0.8fr]">
          <div>
            <Reveal><Eyebrow>Dove sono</Eyebrow></Reveal>
            <Reveal>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-4xl">
                Opero principalmente nelle Marche.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted">
                <p>
                  La mia base è a <strong className="font-semibold text-ink">Fano</strong>, in provincia di
                  Pesaro e Urbino. Lavoro volentieri in presenza in tutta la zona delle Marche, ma seguo
                  progetti da remoto in tutta Italia.
                </p>
                <p>
                  Se sei della zona, possiamo incontrarci per un caffè e parlare del tuo progetto dal vivo.
                  Se sei più lontano, una videochiamata funziona altrettanto bene.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale-in" delay={60}>
            <div className="grad-ring relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] bg-cream">
              <div className="halftone absolute inset-0 opacity-[0.06]" />
              <div className="relative text-center">
                <MapPin className="mx-auto h-9 w-9 text-violet" />
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">Fano</p>
                <p className="font-pixel text-[0.55rem] uppercase tracking-wider text-muted">Marche · Italia</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
