import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Dev-only: the contact form posts to /api/send-email, which in production is
 * handled by the Cloudflare Worker (src/worker.js → Resend). During `vite dev`
 * that route doesn't exist, so we mock a success response here. This plugin is
 * never part of the built bundle.
 */
function devEmailMock() {
  return {
    name: 'dev-email-mock',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/send-email', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          server.config.logger.info(`[dev-email-mock] contatto ricevuto: ${body}`)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, dev: true }))
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devEmailMock()],
})
