import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const valori = [
  { k: '01', title: 'Trasparenza', desc: 'Ti spiego ogni scelta in italiano semplice. Niente buzzword per confonderti.' },
  { k: '02', title: 'Qualità sopra quantità', desc: 'Preferisco un progetto ben fatto a dieci fatti a metà.' },
  { k: '03', title: 'Risultati misurabili', desc: 'Se non si misura, non si migliora. KPI chiari dal giorno uno.' },
  { k: '04', title: 'Relazioni lunghe', desc: 'Cerco chi vuole un percorso di crescita, non un sito “tanto per esserci”.' },
]

export default function MissioneSection() {
  return (
    <section className="border-y border-line bg-cream px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal><Eyebrow>Missione</Eyebrow></Reveal>
            <Reveal>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
                Cosa guida ogni mio progetto.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted">
                <p>La tecnologia deve essere al servizio delle persone, non il contrario.</p>
                <p>
                  La mia missione è <strong className="font-semibold text-ink">rendere il digitale
                  accessibile, comprensibile e redditizio</strong> per chi non è nativo digitale: strumenti
                  che fanno il lavoro per te.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {valori.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-line bg-panel p-6">
                  <span className="font-pixel text-[0.62rem] grad-text">{v.k}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
