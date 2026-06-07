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
                  Pesaro e Urbino. Lavoro in presenza nelle Marche e da remoto in tutta Italia.
                </p>
                <p>
                  Se sei della zona, ci vediamo per un caffè. Se sei lontano, una videochiamata
                  funziona altrettanto bene.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale-in" delay={60}>
            <div className="grad-ring relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-cream">
              <iframe
                title="Mappa — Via Vittorio De Sica 1, Fano"
                src="https://www.openstreetmap.org/export/embed.html?bbox=13.0088825%2C43.8193989%2C13.0168825%2C43.8243989&layer=mapnik&marker=43.8218989%2C13.0128825"
                className="absolute inset-0 h-full w-full grayscale-[0.25] contrast-[1.05]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* tint on-palette, non bloccante */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
                style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-orange))' }}
              />
              {/* indirizzo */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center gap-2.5 rounded-2xl border border-line bg-panel/90 px-4 py-3 shadow-lg backdrop-blur">
                <span className="grad-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream text-violet">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold tracking-tight text-ink">Fano · Marche</span>
                  <span className="block truncate text-xs text-muted">Via Vittorio De Sica 1, 61032</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
