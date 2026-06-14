import Aurora from './fx/Aurora'

export default function ContattiHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-32 sm:pt-36">
      <Aurora intensity={0.85} variant="duo" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-halftone" />
      <div className="hero-ticks relative z-10 mx-auto w-full max-w-3xl px-1 py-2 text-center">
        <p className="reveal reveal-fade-up is-visible mb-7 flex justify-center">
          <span className="grad-ring inline-flex items-center gap-2.5 rounded-full bg-panel/70 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full grad" />
            </span>
            <span className="eyebrow no-tick text-ink-soft">Contatti</span>
          </span>
        </p>
        <h1 className="reveal reveal-fade-up is-visible font-display text-[2.5rem] font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl" style={{ animationDelay: '90ms' }}>
          Hai un progetto in mente? <span className="grad-text-anim">Parliamone</span>.
        </h1>
        <p className="reveal reveal-fade-up is-visible mx-auto mt-7 max-w-xl text-pretty leading-relaxed text-muted sm:text-lg" style={{ animationDelay: '180ms' }}>
          Raccontami cosa fai e cosa ti blocca. Ti rispondo entro 24 ore con un'idea chiara di
          come lavorare insieme.
        </p>
      </div>
    </section>
  )
}
