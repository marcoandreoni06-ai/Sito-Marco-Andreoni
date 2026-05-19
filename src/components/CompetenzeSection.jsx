const competenze = [
  {
    area: 'Sviluppo Web',
    competenze: 'Siti e web app performanti, responsive, SEO-ready. Architettura modulare e componenti riutilizzabili.',
    strumenti: 'React, Vite, Tailwind CSS, JavaScript',
  },
  {
    area: 'AI & Automazione',
    competenze: 'Agenti AI autonomi, flussi di lead generation, scraping dati, email automation, prompt engineering avanzato.',
    strumenti: 'Claude Code, Open Code, Gemini, metodo C.R.A.F.T.',
  },
  {
    area: 'SEO & Performance',
    competenze: 'Meta-tag dinamici, dati strutturati JSON-LD, sitemap automatica, Core Web Vitals, Lighthouse 100/100.',
    strumenti: 'React Helmet, Vite plugin sitemap, Lighthouse',
  },
  {
    area: 'Database & Backend',
    competenze: 'Database PostgreSQL cloud, API REST, serverless functions, gestione sicura delle credenziali.',
    strumenti: 'Supabase, Cloudflare Pages Functions, Resend',
  },
  {
    area: 'Design & Brand',
    competenze: 'Identità visiva coordinata, graphic design, UX principles, wireframing.',
    strumenti: 'Figma, Photoshop, Tailwind',
  },
  {
    area: 'Comunicazione & Content',
    competenze: 'Copywriting persuasivo, strategia social, storytelling, calendario editoriale.',
    strumenti: '\u2014',
  },
]

import Reveal from './Reveal'

export default function CompetenzeSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-violet tracking-wider mb-4">
            COMPETENZE
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-10">
            Cosa so fare.
          </h2>
        </Reveal>

        <Reveal>
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-gray-200">
                <th className="pb-3 pr-4 font-bold text-brand-black">Area</th>
                <th className="pb-3 pr-4 font-bold text-brand-black">Competenze</th>
                <th className="pb-3 font-bold text-brand-black">Strumenti</th>
              </tr>
            </thead>
            <tbody>
              {competenze.map((c) => (
                <tr key={c.area} className="border-b border-brand-gray-100 last:border-0">
                  <td className="py-4 pr-4 font-semibold text-brand-black align-top">{c.area}</td>
                  <td className="py-4 pr-4 text-brand-gray-400 align-top">{c.competenze}</td>
                  <td className="py-4 text-brand-gray-300 align-top">{c.strumenti}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
