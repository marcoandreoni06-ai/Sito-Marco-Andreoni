import { ArrowUpRight } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import Aurora from './fx/Aurora'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 sm:pt-40 md:pb-32">
      <Aurora intensity={0.95} variant="duo" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="reveal reveal-fade-up is-visible mb-7 flex justify-center">
          <span className="eyebrow no-tick text-muted">Marketing · AI · Sviluppo web</span>
        </p>

        <h1 className="reveal reveal-fade-up is-visible font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl" style={{ animationDelay: '90ms' }}>
          Trasformo la tua comunicazione
          <br className="hidden sm:block" /> in un{' '}
          <span className="grad-text-anim">vantaggio competitivo</span>.
        </h1>

        <div className="reveal reveal-fade-up is-visible mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '180ms' }}>
          <MagneticButton to="/contatti" className="px-7 py-3.5 text-sm">
            Prenota una consulenza gratuita
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton to="/chi-sono" variant="ghost" className="px-7 py-3.5 text-sm" strength={0.25}>
            Scopri come lavoro
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
