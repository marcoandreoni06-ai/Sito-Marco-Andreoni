/**
 * Sends a contact request to the serverless email endpoint (/api/send-email),
 * handled in production by the Cloudflare Worker via Resend. Email-only: no
 * database — the message lands directly in Marco's inbox.
 */
export async function submitContactForm({ nome, attivita, email, telefono, messaggio, budget }) {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, attivita, email, telefono, messaggio, budget }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Invio non riuscito (${res.status}). ${detail}`)
  }

  return res.json().catch(() => ({ success: true }))
}
