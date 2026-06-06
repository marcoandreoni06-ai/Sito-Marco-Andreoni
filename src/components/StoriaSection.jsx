import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'
import VideoFrame from './ui/VideoFrame'
import { VIDEOS } from '../lib/media'

export default function StoriaSection() {
  return (
    <section id="la-mia-storia" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
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
                  che sa fare, ma fatica a raccontarsi. Tra le colline marchigiane e la costa adriatica, ho
                  visto decine di piccole imprese — artigiani del legno, del metallo, della ceramica;
                  negozianti con prodotti di qualità; professionisti competenti — sparire dal radar digitale.
                </p>
                <p>Non perché facessero prodotti scadenti. Anzi.</p>
                <p>
                  Perché non parlavano la lingua del web. Perché il loro sito era fermo al 2015, perché su
                  Instagram postavano senza strategia, perché le email che mandavano non arrivavano mai a
                  nessuno.
                </p>
                <p>
                  Ho iniziato a studiare <strong className="font-semibold text-ink">Comunicazione e Media
                  Digitali</strong> all'università con un obiettivo chiaro: diventare il ponte tra queste due
                  realtà. Da una parte il mondo che sa fare — l'artigiano, il commerciante, il professionista.
                  Dall'altra il mondo che cambia — l'intelligenza artificiale, gli algoritmi, le piattaforme
                  che si evolvono.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale-in" delay={60} className="lg:pt-16">
            <VideoFrame src={VIDEOS.web} className="aspect-[3/4] rounded-[1.5rem]" />
          </Reveal>
        </div>

        {/* Pull quote */}
        <Reveal>
          <blockquote className="mt-16 max-w-4xl border-l-2 border-violet pl-6 sm:mt-20 sm:pl-8">
            <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
              Oggi, dopo tre anni di progetti sul campo, aiuto queste realtà a{' '}
              <span className="grad-text">esistere online con la stessa qualità</span> con cui esistono
              nella vita reale. Unendo ciò che so fare meglio: progettare strategie, scrivere codice,
              raccontare storie, automatizzare processi.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
