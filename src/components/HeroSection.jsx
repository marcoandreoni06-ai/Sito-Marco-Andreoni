import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import VideoFrame from './ui/VideoFrame'
import Aurora from './fx/Aurora'
import PixelRain from './fx/PixelRain'
import { VIDEOS } from '../lib/media'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36 md:pb-24">
      <Aurora intensity={0.5} />
      <PixelRain count={20} className="opacity-70" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="reveal reveal-fade-up is-visible mb-7 flex justify-center">
          <span className="eyebrow text-muted">Marketing · AI · Sviluppo web</span>
        </p>

        <h1 className="reveal reveal-fade-up is-visible font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl" style={{ animationDelay: '90ms' }}>
          Trasformo la tua comunicazione
          <br className="hidden sm:block" /> in un{' '}
          <span className="grad-text-anim">vantaggio competitivo</span>.
        </h1>

        <p className="reveal reveal-fade-up is-visible mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: '180ms' }}>
          Marketing strategico, automazione AI e identità digitale per piccole imprese e
          professionisti che vogliono crescere senza sprecare tempo. Ogni progetto è costruito su
          misura, partendo da chi sei e dove vuoi arrivare.
        </p>

        <div className="reveal reveal-fade-up is-visible mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '270ms' }}>
          <MagneticButton to="/contatti" className="px-7 py-3.5 text-sm">
            Prenota una consulenza gratuita
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton to="/chi-sono" variant="ghost" className="px-7 py-3.5 text-sm" strength={0.25}>
            Scopri come lavoro
          </MagneticButton>
        </div>

        <div className="reveal reveal-fade-up is-visible mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-faint" style={{ animationDelay: '340ms' }}>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-violet" /> Fano · Marche
          </span>
          <span className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-orange" /> Prima call di 15 minuti gratuita
          </span>
        </div>
      </div>

      {/* Cinematic video showcase */}
      <div className="reveal reveal-scale-in is-visible relative z-10 mx-auto mt-16 max-w-5xl" style={{ animationDelay: '220ms' }}>
        <VideoFrame
          src={VIDEOS.hero}
          priority
          className="aspect-[16/10] rounded-[1.6rem] shadow-[0_50px_120px_-50px_rgba(157,100,241,0.55)] sm:aspect-[16/9]"
        />

        {/* floating brand chips */}
        <div className="absolute -left-3 top-8 hidden rounded-2xl border border-line bg-panel/90 px-4 py-3 shadow-xl backdrop-blur md:block">
          <p className="font-pixel text-[0.55rem] uppercase tracking-wider text-faint">Performance</p>
          <p className="mt-1 font-display text-xl font-semibold text-ink">
            <span className="grad-text">100</span>/100
          </p>
          <p className="text-[0.7rem] text-muted">Lighthouse</p>
        </div>
        <div className="absolute -right-3 bottom-10 hidden rounded-2xl border border-line bg-panel/90 px-4 py-3 shadow-xl backdrop-blur md:block">
          <p className="font-pixel text-[0.55rem] uppercase tracking-wider text-faint">Stack</p>
          <p className="mt-1 font-display text-base font-semibold text-ink">React · Vite · AI</p>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative z-10 mt-14 flex justify-center">
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-line-strong p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full grad" />
        </span>
      </div>
    </section>
  )
}
