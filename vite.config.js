import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://marcoandreoni.marco-andreoni06.workers.dev',
      routes: [
        '/',
        '/chi-sono',
        '/contatti',
      ],
      lastmod: new Date().toISOString(),
      priority: {
        '/': 1.0,
        '/chi-sono': 0.8,
        '/contatti': 0.7,
      },
    }),
  ],
})
