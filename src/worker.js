export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/send-email' && request.method === 'POST') {
      try {
        const { nome, attivita, email, telefono, messaggio, budget } = await request.json()

        // Il secret è stato caricato come RESEND_API_KEY1; teniamo il fallback al
        // nome standard RESEND_API_KEY nel caso venga rinominato in futuro.
        const apiKey = env.RESEND_API_KEY || env.RESEND_API_KEY1

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'MA Web Studio <contatti@mawebstudio.it>',
            to: 'info.mawebstudio@gmail.com',
            reply_to: email,
            subject: `Nuovo contatto da ${nome}`,
            html: `<p><strong>Nome:</strong> ${nome}</p>
                   <p><strong>Attività:</strong> ${attivita || '—'}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Telefono:</strong> ${telefono || '—'}</p>
                   <p><strong>Budget:</strong> ${budget || '—'}</p>
                   <p><strong>Messaggio:</strong> ${messaggio}</p>`,
          }),
        })

        if (!res.ok) {
          const errorBody = await res.text()
          throw new Error(`Resend API error: ${res.status} - ${errorBody}`)
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (err) {
        console.error('send-email error:', err.message)
        return new Response(JSON.stringify({ error: 'Invio non riuscito' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    const hasExtension = url.pathname.match(/\.\w+$/)
    if (hasExtension) {
      return env.ASSETS.fetch(request)
    }

    try {
      const index = await env.ASSETS.fetch(`${url.origin}/index.html`)
      let html = await index.text()

      // Meta SEO per-pagina: la SPA serve sempre index.html, quindi qui
      // sostituiamo titolo/description/canonical della home con quelli della rotta.
      const page = PAGES[url.pathname]
      if (page) {
        html = html
          .split(HOME.title).join(page.title)
          .split(HOME.desc).join(page.desc)
          .split('https://mawebstudio.it/"').join(`https://mawebstudio.it${url.pathname}"`)
      }

      return new Response(html, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
      })
    } catch (err) {
      console.error('asset/render error:', err.message)
      // Fallback: lascia servire l'asset direttamente
      return env.ASSETS.fetch(request)
    }
  },
}

// Deve combaciare ESATTAMENTE con il <title> e la description in index.html.
const HOME = {
  title: 'Marco Andreoni — Sviluppo web, automazioni AI e comunicazione digitale',
  desc: 'Sviluppo web, automazioni AI e comunicazione digitale per piccole imprese e professionisti. Siti veloci e su misura, pensati per farti crescere.',
}

const PAGES = {
  '/lab': {
    title: 'Lab — Progetti e casi reali · Marco Andreoni',
    desc: 'Lab: progetti, casi reali ed esempi del lavoro di Marco Andreoni tra sviluppo web, automazioni AI e comunicazione digitale.',
  },
  '/contatti': {
    title: 'Contatti — Marco Andreoni',
    desc: 'Contatta Marco Andreoni e prenota una consulenza gratuita di 15 minuti per sviluppo web, automazioni AI e comunicazione digitale.',
  },
}
