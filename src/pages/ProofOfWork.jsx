import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/fx/PageTransition'
import SEO from '../seo/SEO'
import Reveal from '../components/Reveal'
import Eyebrow from '../components/ui/Eyebrow'
import { getBreadcrumbSchema } from '../lib/structuredData'

const FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'brand', label: 'Brand & Web Design' },
  { id: 'social', label: 'Social Media Ecosystems' },
  { id: 'ai', label: 'AI & Automations' },
]

const projects = [
  {
    id: 'sonora',
    title: 'Sonora',
    tags: ['brand', 'social'],
    tagLabels: ['Brand & Web Design', 'Social Media'],
    contesto: "Target Gen-Z notturno in cerca di un'identità visiva underground e riconoscibile.",
    intervento: "Ecosistema grafico underground: palette scura, griglia social coesa e linguaggio visivo distintivo costruito dalla radice.",
    asset: "Griglia social e template pronti all'uso per il team creativo.",
    accent: 'from-violet to-purple',
  },
  {
    id: 'scatolificio-artigiano',
    title: 'Scatolificio Artigiano',
    tags: ['social', 'brand'],
    tagLabels: ['Social Media', 'Brand & Web Design'],
    contesto: 'Azienda manifatturiera B2B con necessità di posizionamento digitale in un mercato industriale competitivo.',
    intervento: 'Content marketing tecnico: strategia editoriale focalizzata sul prodotto e sul processo artigianale per attrarre lead qualificati.',
    asset: 'Canali social ottimizzati, crescita organica e pipeline di lead qualificati.',
    accent: 'from-orange to-coral',
  },
]

const aiProject = {
  contesto: 'Inefficienza operativa e dati frammentati tra strumenti non integrati.',
  intervento: 'Sviluppo di infrastrutture custom: agenti AI, database centralizzati e workflow automatizzati su misura per il cliente.',
  asset: 'Database proprietari, agenti AI operativi e sistemi di automazione pronti alla scalabilità.',
}

function TagPill({ label }) {
  return (
    <span className="rounded-full border border-line bg-ink/10 px-2.5 py-0.5 font-pixel text-[0.48rem] uppercase tracking-wider text-ink-soft">
      {label}
    </span>
  )
}

function ProjectCard({ project }) {
  return (
    <Reveal>
      <article
        data-cursor
        className="group relative overflow-hidden rounded-3xl border border-line bg-panel transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-28px_rgba(157,100,241,0.35)]"
      >
        {/* Gradient accent strip */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.accent}`} />

        <div className="p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tagLabels.map((t) => <TagPill key={t} label={t} />)}
            </div>
          </div>

          <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
            <div>
              <dt className="font-pixel text-[0.5rem] uppercase tracking-wider text-faint">Contesto</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{project.contesto}</dd>
            </div>
            <div>
              <dt className="font-pixel text-[0.5rem] uppercase tracking-wider text-faint">Intervento</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{project.intervento}</dd>
            </div>
            <div>
              <dt className="font-pixel text-[0.5rem] uppercase tracking-wider text-faint">Asset</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{project.asset}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Reveal>
  )
}

export default function ProofOfWork() {
  const [active, setActive] = useState('all')

  const visible = active === 'all'
    ? projects
    : projects.filter((p) => p.tags.includes(active))

  const showAI = active === 'all' || active === 'ai'

  return (
    <PageTransition>
      <SEO
        title="Lab — Proof of Work"
        description="Una selezione di ecosistemi digitali ingegnerizzati per trasformare l'identità visiva, automatizzare i flussi operativi e generare conversioni. Dalla direzione artistica all'Intelligenza Artificiale."
        canonicalUrl="https://marcoandreoni.marco-andreoni06.workers.dev/lab"
        structuredData={[getBreadcrumbSchema([
          { label: 'Home', url: '/' },
          { label: 'Lab', url: '/lab' },
        ])]}
      />

      {/* Hero ink */}
      <section data-dark-bg className="relative overflow-hidden bg-ink px-6 pb-20 pt-36 md:pt-44">
        {/* Aurora sottile in negativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 20% 60%, #9d64f1 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 30%, #f88e57 0%, transparent 60%)',
          }}
        />
        {/* Halftone chiaro per profondità */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-halftone-light" />

        <div className="hero-ticks hero-ticks-light relative mx-auto max-w-6xl px-1 py-2">
          <Reveal>
            <Eyebrow className="border-white/20 bg-white/10 text-white/70">
              Proof of Work
            </Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Progetti, Sistemi{' '}
              <span
                className="bg-gradient-to-r from-violet to-orange bg-clip-text text-transparent"
              >
                e Infrastrutture
              </span>{' '}
              Digitali.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-paper/60">
              Una selezione di ecosistemi digitali ingegnerizzati per trasformare l'identità visiva,
              automatizzare i flussi operativi e generare conversioni. Dalla direzione artistica
              all'Intelligenza Artificiale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filtri */}
      <section className="border-b border-line bg-cream px-6 py-5">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-4 py-1.5 font-pixel text-[0.55rem] uppercase tracking-wider transition-all duration-200 ${
                  active === f.id
                    ? 'border-violet bg-violet text-white shadow-[0_0_20px_rgba(157,100,241,0.3)]'
                    : 'border-line bg-panel text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Progetti */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">

          {visible.length > 0 && (
            <div className="flex flex-col gap-5">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}

          {/* AI & Automations */}
          {showAI && (
            <Reveal delay={80}>
              <div data-dark-bg className="mt-10 overflow-hidden rounded-3xl border border-line bg-ink text-paper">
                {/* Gradient top strip */}
                <div className="h-1 w-full bg-gradient-to-r from-violet to-orange" />

                <div className="p-8 md:p-10">
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-pixel text-[0.48rem] uppercase tracking-wider text-paper/70">
                      AI & Automations
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                    Workflow & Sistemi AI
                  </h3>

                  <dl className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                    <div>
                      <dt className="font-pixel text-[0.5rem] uppercase tracking-wider text-paper/40">Contesto</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-paper/60">{aiProject.contesto}</dd>
                    </div>
                    <div>
                      <dt className="font-pixel text-[0.5rem] uppercase tracking-wider text-paper/40">Intervento</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-paper/60">{aiProject.intervento}</dd>
                    </div>
                    <div>
                      <dt className="font-pixel text-[0.5rem] uppercase tracking-wider text-paper/40">Asset</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-paper/60">{aiProject.asset}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          )}

          {/* Empty state */}
          {visible.length === 0 && !showAI && (
            <Reveal>
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <p className="font-pixel text-[0.6rem] uppercase tracking-wider text-faint">Nessun progetto</p>
                <p className="text-sm text-muted">Nessun progetto in questa categoria al momento.</p>
                <button
                  onClick={() => setActive('all')}
                  className="link-u mt-2 text-sm font-semibold text-ink"
                >
                  Mostra tutti
                </button>
              </div>
            </Reveal>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-cream px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <Eyebrow>Inizia da qui</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Vuoi un ecosistema digitale{' '}
              <span className="grad-text">costruito su misura</span>?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted">
              Ogni progetto parte da un'analisi reale. Raccontami la tua attività e costruiamo insieme la strategia giusta.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link to="/contatti" className="btn btn-primary mt-9 px-7 py-3.5 text-sm">
              Richiedi un'Analisi
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

    </PageTransition>
  )
}
