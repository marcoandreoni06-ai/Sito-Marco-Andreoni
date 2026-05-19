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
            from: 'Sito Web <onboarding@resend.dev>',
            to: 'marco.andreoni06@gmail.com',
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
        return new Response(JSON.stringify({
          error: err.message,
          hasKey: !!env.RESEND_API_KEY,
          keyPrefix: env.RESEND_API_KEY ? env.RESEND_API_KEY.substring(0, 8) + '...' : null,
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    return new Response('Not found', { status: 404 })
  },
}
