import Aurora from './fx/Aurora'
import PixelRain from './fx/PixelRain'

export default function ContattiHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-36 sm:pt-40">
      <Aurora intensity={0.4} />
      <PixelRain count={14} className="opacity-60" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="reveal reveal-fade-up is-visible mb-7 flex justify-center">
          <span className="eyebrow text-muted">Contatti</span>
        </p>
        <h1 className="reveal reveal-fade-up is-visible font-display text-[2.4rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl" style={{ animationDelay: '90ms' }}>
          Hai un progetto in mente? <span className="grad-text-anim">Parliamone</span>.
        </h1>
        <p className="reveal reveal-fade-up is-visible mx-auto mt-7 max-w-xl text-pretty leading-relaxed text-muted sm:text-lg" style={{ animationDelay: '180ms' }}>
          Raccontami cosa fai, cosa vuoi ottenere e cosa ti blocca. Ti rispondo entro 24 ore con
          un'idea chiara di come possiamo lavorare insieme.
        </p>
      </div>
    </section>
  )
}
