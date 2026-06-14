import { ArrowUpRight } from 'lucide-react'
import MagneticButton from './ui/MagneticButton'
import Aurora from './fx/Aurora'
import Reveal from './Reveal'

export default function CtaSection({ headline, body, cta }) {
  return (
    <section className="px-6 py-20 md:py-28">
      <Reveal variant="scale-in" className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-16 text-center sm:px-16 sm:py-20">
          <Aurora intensity={0.55} className="opacity-70" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-5xl">
              {headline}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-paper/70">{body}</p>
            <div className="mt-9 flex justify-center">
              <MagneticButton to="/contatti" variant="light" className="px-8 py-4 text-sm">
                {cta}
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
