import { Link } from 'react-router-dom'
import Icon from './Icon'
import Reveal from './Reveal'

export default function CtaSection({ headline, body, cta }) {
  return (
    <section className="py-24 px-6 bg-brand-cream">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-6">
            {headline}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-brand-gray-400 leading-relaxed mb-8">
            {body}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 rounded-full bg-brand-black px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-gray-500"
          >
            {cta}
            <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
