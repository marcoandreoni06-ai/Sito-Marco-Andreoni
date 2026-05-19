import { Link } from 'react-router-dom'
import bgVideo from '../assets/hf_20260518_170503_386bf7d7-9c9f-44f1-8dec-9a47fb9b6e3d.mp4'
import Reveal from './Reveal'

export default function ChiSonoHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-16 pb-16 px-6 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white" />

      <div className="mx-auto max-w-4xl text-center relative z-10">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-orange mb-6 tracking-wider">
            CHI SONO
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-black leading-tight">
            Non costruisco solo siti. Costruisco ponti tra la tua idea e chi deve conoscerla.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-brand-gray-400">
            Marco Andreoni — Consulente in comunicazione digitale e automazione AI.
            <br />
            Fano, Marche — Italia.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contatti"
              className="rounded-full bg-brand-black px-7 py-3 text-sm font-medium text-white transition-all hover:bg-brand-gray-500"
            >
              Scopri come posso aiutarti
            </Link>
            <a
              href="#la-mia-storia"
              className="rounded-full border-2 border-brand-black px-7 py-3 text-sm font-medium text-brand-black transition-all hover:bg-brand-black hover:text-white"
            >
              Leggi la mia storia
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
