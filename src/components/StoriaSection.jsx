import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

export default function StoriaSection() {
  return (
    <section id="la-mia-storia" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div>
            <Reveal><Eyebrow>La mia storia</Eyebrow></Reveal>
            <Reveal>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Da dove vengo.
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted">
                <p className="text-lg text-ink-soft">
                  Sono nato e cresciuto a <strong className="font-semibold text-ink">Fano</strong>, una città
                  che sa fare ma fatica a raccontarsi. Qui ho visto decine di piccole imprese — artigiani,
                  negozianti, professionisti — sparire dal radar digitale.
                </p>
                <p>Non per la qualità del loro lavoro. Ma perché non parlavano la lingua del web.</p>
                <p>
                  Ho studiato <strong className="font-semibold text-ink">Comunicazione e Media Digitali</strong>{' '}
                  con un obiettivo: fare da ponte tra il mondo che sa fare e il mondo che cambia — AI,
                  algoritmi, piattaforme che si evolvono.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Pull quote */}
        <Reveal>
          <blockquote className="mt-16 max-w-4xl border-l-2 border-violet pl-6 sm:mt-20 sm:pl-8">
            <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
              Oggi aiuto queste realtà a{' '}
              <span className="grad-text">esistere online con la stessa qualità</span> con cui esistono
              nella vita reale: strategia, codice, storytelling e automazioni.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
