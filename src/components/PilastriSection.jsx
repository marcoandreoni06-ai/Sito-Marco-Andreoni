import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import Reveal from './Reveal'


function VideoThumb({ src }) {
  const ref = useRef(null)
  const played = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true
          el.play()
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

const pilastri = [
  {
    id: 'siti-web',
    video: '/video/hf_20260518_170213_fdcf93e0-3c9c-4dbb-9bb5-cf6139efcfb6.mp4',
    headline: 'Sviluppo web professionale, senza template.',
    body: 'Un sito web non è un biglietto da visita digitale. È il tuo venditore migliore, attivo 24 ore su 24, 7 giorni su 7. Se non è veloce, se non è trovabile su Google, se non guida l\'utente verso un\'azione — non sta lavorando per te. Costruisco siti con React e Vite, tecnologie usate dai migliori team di sviluppo al mondo. Il risultato? Pagine che caricano in meno di un secondo, perfettamente indicizzate, ottimizzate per mobile e con un design pensato per convertire.',
    include: [
      'Design responsivo (telefono, tablet, desktop)',
      'SEO on-page (meta-tag, dati strutturati, sitemap)',
      'Performance certificata (Lighthouse 90+/100)',
      'Form contatti con database integrato',
      'Dominio personalizzato e SSL',
      'Assistenza post-lancio',
    ],
    cta: { label: 'Vedi un esempio di sito live', href: '#contatti' },
  },
  {
    id: 'automazioni-ai',
    video: '/video/hf_20260518_170503_386bf7d7-9c9f-44f1-8dec-9a47fb9b6e3d.mp4',
    headline: "L'AI non è il futuro. È ora.",
    body: 'Ogni giorno ripeti le stesse attività: rispondere alle stesse domande, cercare gli stessi dati, mandare le stesse email. Ore sottratte a ciò che conta davvero — il tuo prodotto, i tuoi clienti, la tua crescita. Progetto flussi di lavoro intelligenti che fanno al posto tuo le attività ripetitive. Agenti AI che qualificano lead, inviano email personalizzate, raccolgono dati e ti restituiscono solo ciò che è rilevante. Tu non gestisci il rumore: prendi le decisioni.',
    include: [
      'Lead generation automatizzata',
      'Email marketing sequenziale (drip campaigns)',
      'Scraping dati strutturati',
      'Agenti AI personalizzati per il tuo business',
      'Integrazione con i tuoi strumenti esistenti (CRM, fogli, calendari)',
    ],
    cta: { label: 'Scopri cosa può automatizzare l\'AI per te', href: '#contatti' },
  },
  {
    id: 'comunicazione',
    video: '/video/hf_20260518_170736_536080c3-8e58-4040-9339-62a07abbaff3.mp4',
    headline: 'Non più rumore di fondo. Messaggi che restano.',
    body: 'Su Instagram, LinkedIn e Facebook ogni giorno vengono pubblicati milioni di contenuti. La maggior parte viene ignorata. Perché? Perché non hanno una strategia. Non sanno a chi parlano, non sanno cosa vogliono ottenere, non hanno un tono di voce riconoscibile. Costruisco per te una strategia di contenuti che parte da un\'analisi del tuo pubblico e dei tuoi obiettivi. Ogni post, ogni storia, ogni email ha un perché. E un risultato misurabile.',
    include: [
      'Social media management (pianificazione, creazione, analisi)',
      'Copywriting per sito, email e social',
      'Identità visiva coordinata (logo, palette, font)',
      'Storytelling di brand',
      'Calendario editoriale mensile',
    ],
    cta: { label: 'Costruiamo la tua strategia insieme', href: '#contatti' },
  },
]

export default function PilastriSection() {
  return (
    <section id="servizi-offerti" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal variant="pixel-step">
            <p className="text-xs font-pixel text-accent-violet tracking-wider mb-4">
              COSA FACCIO
            </p>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black">
              Soluzioni digitali che portano risultati reali.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-brand-gray-400 leading-relaxed">
              Non vendo pacchetti preconfezionati. Costruisco strumenti su misura per il tuo business, partendo da un'analisi concreta delle tue esigenze.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-20">
          {pilastri.map((p, idx) => (
            <Reveal key={p.id} delay={idx * 100}>
              <article className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-brand-gray-200 shadow-md bg-brand-gray-700">
                    <VideoThumb src={p.video} />
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-4">
                    {p.headline}
                  </h3>
                  <p className="text-sm text-brand-gray-400 leading-relaxed mb-6">
                    {p.body}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {p.include.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-brand-gray-500">
                        <span className="mt-1 w-4 h-4 rounded-full bg-brand-black/10 flex items-center justify-center flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-black" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contatti"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-black px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-gray-500 group"
                  >
                    {p.cta.label}
                    <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
