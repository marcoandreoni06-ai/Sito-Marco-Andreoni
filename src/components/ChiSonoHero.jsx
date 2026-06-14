import { ArrowUpRight, MapPin } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import Aurora from './fx/Aurora'

export default function ChiSonoHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36 md:pb-20">
      <Aurora intensity={0.9} variant="duo" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-halftone" />

      <div className="hero-ticks relative z-10 mx-auto w-full max-w-4xl px-1 py-2 text-center">
        <p className="reveal reveal-fade-up is-visible mb-7 flex justify-center">
          <span className="grad-ring inline-flex items-center gap-2.5 rounded-full bg-panel/70 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full grad" />
            </span>
            <span className="eyebrow no-tick text-ink-soft">Chi sono</span>
          </span>
        </p>
        <h1 className="reveal reveal-fade-up is-visible font-display text-[2.5rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl" style={{ animationDelay: '90ms' }}>
          Non costruisco solo siti. Costruisco <span className="grad-text-anim">ponti</span> tra la
          tua idea e chi deve conoscerla.
        </h1>
        <p className="reveal reveal-fade-up is-visible mx-auto mt-7 max-w-xl text-pretty leading-relaxed text-muted sm:text-lg" style={{ animationDelay: '180ms' }}>
          Marco Andreoni — consulente in comunicazione digitale e automazione AI.
        </p>
        <p className="reveal reveal-fade-up is-visible mt-3 inline-flex items-center gap-1.5 text-sm text-faint" style={{ animationDelay: '220ms' }}>
          <MapPin className="h-3.5 w-3.5 text-violet" /> Fano, Marche — Italia
        </p>

        <div className="reveal reveal-fade-up is-visible mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '300ms' }}>
          <MagneticButton href="#competenze" className="px-7 py-3.5 text-sm">
            Scopri come posso aiutarti
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#la-mia-storia" variant="ghost" className="px-7 py-3.5 text-sm" strength={0.25}>
            Leggi la mia storia
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
