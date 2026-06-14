import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'
import Aurora from './fx/Aurora'

const valori = [
  { k: '01', title: 'Trasparenza', desc: 'Ti spiego ogni scelta in italiano semplice. Niente buzzword per confonderti.' },
  { k: '02', title: 'Qualità sopra quantità', desc: 'Preferisco un progetto ben fatto a dieci fatti a metà.' },
  { k: '03', title: 'Risultati misurabili', desc: 'Se non si misura, non si migliora. KPI chiari dal giorno uno.' },
  { k: '04', title: 'Relazioni lunghe', desc: 'Cerco chi vuole un percorso di crescita, non un sito “tanto per esserci”.' },
]

export default function MissioneSection() {
  return (
    <section className="px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="scale-in">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-14 sm:px-12 sm:py-16 md:px-14 md:py-20">
            <Aurora intensity={0.5} className="opacity-55" />

            <div className="relative z-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              {/* Intro */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow className="border-white/15 bg-white/10 text-white/70">Missione</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-5xl">
                  Cosa guida ogni mio progetto.
                </h2>
                <div className="mt-6 space-y-4 text-pretty leading-relaxed text-paper/65">
                  <p>La tecnologia deve essere al servizio delle persone, non il contrario.</p>
                  <p>
                    La mia missione è <strong className="font-semibold text-paper">rendere il digitale
                    accessibile, comprensibile e redditizio</strong> per chi non è nativo digitale: strumenti
                    che fanno il lavoro per te.
                  </p>
                </div>
              </div>

              {/* Valori — dark glass */}
              <div className="grid gap-4 sm:grid-cols-2">
                {valori.map((v, i) => (
                  <Reveal key={v.title} variant="right" delay={i * 70}>
                    <div
                      data-cursor
                      className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                    >
                      <span className="font-pixel text-[0.62rem] grad-text">{v.k}</span>
                      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-paper">{v.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-paper/60">{v.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
