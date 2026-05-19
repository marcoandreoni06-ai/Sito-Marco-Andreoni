import Reveal from './Reveal'

export default function StoriaSection() {
  return (
    <section id="la-mia-storia" className="py-24 px-6 bg-brand-cream">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="pixel-step">
          <p className="text-xs font-pixel text-accent-salmon tracking-wider mb-4">
            LA MIA STORIA
          </p>
        </Reveal>
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-black mb-8">
            Da dove vengo.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="space-y-5 text-brand-gray-400 leading-relaxed">
          <p>
            Sono nato e cresciuto a <strong className="text-brand-black">Fano</strong>, una città che sa fare, ma fatica a raccontarsi. Tra le colline marchigiane e la costa adriatica, ho visto decine di piccole imprese — artigiani del legno, del metallo, della ceramica; negozianti con prodotti di qualità; professionisti competenti — sparire dal radar digitale.
          </p>
          <p>
            Non perché facessero prodotti scadenti. Anzi.
          </p>
          <p>
            Perché non parlavano la lingua del web. Perché il loro sito era fermo al 2015, perché su Instagram postavano senza strategia, perché le email che mandavano non arrivavano mai a nessuno.
          </p>
          <p>
            Ho iniziato a studiare <strong className="text-brand-black">Comunicazione e Media Digitali</strong> all'università con un'obiettivo chiaro: diventare il ponte tra queste due realtà.
          </p>
          <p>
            Da una parte, il mondo che conosce e sa: l'artigiano, il commerciante, il professionista con competenze reali e prodotti eccellenti.
          </p>
          <p>
            Dall'altra, il mondo che cambia: l'intelligenza artificiale, i nuovi algoritmi, le piattaforme che si evolvono, un mercato sempre più digitale.
          </p>
          <p>
            Oggi, dopo tre anni di progetti sul campo, collaborazioni e formazione continua, aiuto queste realtà a <strong className="text-brand-black">esistere online con la stessa qualità con cui esistono nella vita reale.</strong>
          </p>
          <p>
            E lo faccio unendo ciò che so fare meglio: <strong className="text-brand-black">progettare strategie, scrivere codice, raccontare storie, automatizzare processi.</strong>
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
