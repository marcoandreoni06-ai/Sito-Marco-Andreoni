export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/send-email' && request.method === 'POST') {
      try {
        const { nome, attivita, email, telefono, messaggio, budget } = await request.json()

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
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

    const index = await env.ASSETS.fetch(`${url.origin}/index.html`)
    return new Response(await index.text(), {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    })
  },
}
