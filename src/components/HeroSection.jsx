import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import Aurora from './fx/Aurora'

// Testo diviso in: testo normale | parte con gradiente animato | finale
// Lo spazio prima del "\n" garantisce che su mobile (dove il <br> è nascosto)
// "comunicazione" e "in un" restino separati invece di attaccarsi.
const BEFORE    = "Trasformo la tua comunicazione \nin un "
const GRAD_TEXT = "vantaggio competitivo"
const AFTER     = "."
const FULL      = BEFORE + GRAD_TEXT + AFTER

const BL = BEFORE.length    // lunghezza sezione "before" (auto-calcolata)
const GL = GRAD_TEXT.length // lunghezza sezione con gradiente

// Velocità per tipo di carattere (ms)
function charDelay(ch) {
  if (ch === '\n')  return 75
  if (ch === ' ')   return 40
  if (/[aeiou]/i.test(ch)) return 48
  return 60
}

export default function HeroSection() {
  const [count, setCount]   = useState(0)
  const [phase, setPhase]   = useState('typing') // 'typing' | 'blinking' | 'done'

  useEffect(() => {
    if (count >= FULL.length) {
      // Tipizzazione completa: lampeggia 3 volte poi sparisce
      setPhase('blinking')
      const t = setTimeout(() => setPhase('done'), 2000)
      return () => clearTimeout(t)
    }
    const delay = charDelay(FULL[count])
    const t = setTimeout(() => setCount(c => c + 1), delay)
    return () => clearTimeout(t)
  }, [count])

  // Sezione "before" (include lo \n che genera il <br>)
  const beforeTyped = FULL.slice(0, Math.min(count, BL))
  const beforeLines = beforeTyped.split('\n')

  // Sezione gradiente
  const gradTyped = count > BL
    ? FULL.slice(BL, Math.min(count, BL + GL))
    : ''

  // Il punto finale
  const afterTyped = count > BL + GL ? AFTER : ''

  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden px-6 pb-20 pt-32 sm:pt-36">
      <Aurora intensity={0.95} variant="duo" />
      {/* Texture halftone di brand, dissolta in un bagliore centrale */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-halftone" />

      <div className="hero-ticks relative z-10 mx-auto w-full max-w-5xl px-1 py-2 text-center">
        {/* Eyebrow — chip con anello gradiente + pulse "disponibile" */}
        <p className="reveal reveal-fade-up is-visible mb-8 flex justify-center">
          <span className="grad-ring inline-flex items-center gap-2.5 rounded-full bg-panel/70 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full grad" />
            </span>
            <span className="eyebrow no-tick text-ink-soft text-[0.5rem]! sm:text-[0.6rem]!">Marketing · AI · Sviluppo web</span>
          </span>
        </p>

        {/* Headline typewriter */}
        <h1 className="font-display text-[2.7rem] font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5rem]">
          {beforeLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < beforeLines.length - 1 && (
                <br className="hidden sm:block" />
              )}
            </span>
          ))}
          {gradTyped && (
            <span className="grad-text-anim">{gradTyped}</span>
          )}
          {afterTyped}
          {/* Cursore lampeggiante */}
          {phase !== 'done' && (
            <span
              aria-hidden="true"
              className={phase === 'blinking' ? 'cursor-type cursor-type-done' : 'cursor-type'}
            />
          )}
        </h1>

        {/* CTA — appare con piccolo delay indipendente dalla tipizzazione */}
        <div
          className="reveal reveal-fade-up is-visible mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '500ms' }}
        >
          <MagneticButton to="/contatti" className="px-7 py-3.5 text-sm">
            Prenota una consulenza gratuita
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton to="/lab" variant="ghost" className="px-7 py-3.5 text-sm" strength={0.25}>
            Guarda i miei lavori
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
