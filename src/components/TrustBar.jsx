import Marquee from './fx/Marquee'

const capabilities = [
  'Sviluppo web',
  'Automazioni AI',
  'SEO & Performance',
  'Identità visiva',
  'Social media',
  'Copywriting',
  'Strategia digitale',
  'Lead generation',
]

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-paper py-8">
      <Marquee items={capabilities} duration={30} />
    </section>
  )
}
