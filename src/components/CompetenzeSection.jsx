import { Code2, Bot, Gauge, Database, Palette, PenLine } from 'lucide-react'
import Reveal from './Reveal'
import Eyebrow from './ui/Eyebrow'

const competenze = [
  {
    icon: Code2,
    area: 'Sviluppo Web',
    desc: 'Siti e web app performanti, responsive, SEO-ready. Architettura modulare e componenti riutilizzabili.',
    tools: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
  },
  {
    icon: Bot,
    area: 'AI & Automazione',
    desc: 'Agenti AI autonomi, lead generation, scraping dati, email automation, prompt engineering avanzato.',
    tools: ['Claude Code', 'Open Code', 'Gemini', 'C.R.A.F.T.'],
  },
  {
    icon: Gauge,
    area: 'SEO & Performance',
    desc: 'Meta-tag dinamici, dati strutturati JSON-LD, sitemap automatica, Core Web Vitals, Lighthouse 100/100.',
    tools: ['React Helmet', 'Vite sitemap', 'Lighthouse'],
  },
  {
    icon: Database,
    area: 'Database & Backend',
    desc: 'Database cloud, API REST, serverless functions, gestione sicura delle credenziali.',
    tools: ['Supabase', 'Cloudflare', 'Resend'],
  },
  {
    icon: Palette,
    area: 'Design & Brand',
    desc: 'Identità visiva coordinata, graphic design, principi UX, wireframing.',
    tools: ['Figma', 'Photoshop', 'Tailwind'],
  },
  {
    icon: PenLine,
    area: 'Comunicazione & Content',
    desc: 'Copywriting persuasivo, strategia social, storytelling, calendario editoriale.',
    tools: ['Copywriting', 'Social', 'Storytelling'],
  },
]

export default function CompetenzeSection() {
  return (
    <section id="competenze" className="border-t border-line bg-cream px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <Reveal><Eyebrow>Competenze</Eyebrow></Reveal>
          <Reveal>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Cosa so fare.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competenze.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.area} delay={(i % 3) * 70}>
                <div data-cursor className="group h-full rounded-3xl border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong">
                  <div className="grad-ring flex h-12 w-12 items-center justify-center rounded-2xl bg-cream">
                    <Icon className="h-5 w-5 text-violet transition-colors group-hover:text-orange" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{c.area}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{c.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tools.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
