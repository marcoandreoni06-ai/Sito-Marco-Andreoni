export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { nome, email, messaggio } = await request.json()

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
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Messaggio:</strong> ${messaggio}</p>`,
      }),
    })

    if (!res.ok) {
      throw new Error('Errore invio email')
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
