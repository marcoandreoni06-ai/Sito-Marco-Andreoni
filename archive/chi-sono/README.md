# Pagina "Chi sono" — archiviata

Rimossa dal sito ufficiale il **2026-06-17** (non più mostrata in navbar, footer, hero, sitemap né rotte). Il codice è conservato qui per un eventuale ripristino futuro.

## Contenuto
- `pages/ChiSono.jsx` — la pagina
- `components/` — i 6 componenti usati **solo** da questa pagina: ChiSonoHero, StoriaSection, MissioneSection, CompetenzeSection, ComeLavoroSection, PerChiSection

> Nota: `FaqSection` e `CtaSection` NON sono qui perché condivisi con Home/Contatti (sono rimasti in `src/components/`). La pagina usa anche `src/seo/SEO` e `src/lib/structuredData`, tuttora presenti in `src/`.

## Come ripristinarla
1. Rispostare i file:
   - `archive/chi-sono/pages/ChiSono.jsx` → `src/pages/ChiSono.jsx`
   - `archive/chi-sono/components/*.jsx` → `src/components/`
2. In `src/App.jsx`: riaggiungere
   ```jsx
   const ChiSono = lazy(() => import('./pages/ChiSono'))
   // ...
   <Route path="/chi-sono" element={<ChiSono />} />
   ```
3. In `src/components/Header.jsx` e `Footer.jsx`: riaggiungere il link `{ to: '/chi-sono', label: 'Chi sono' }`.
4. In `src/components/HeroSection.jsx`: il bottone secondario ora punta a `/lab` ("Guarda i miei lavori"); se vuoi, ripuntalo a `/chi-sono`.
5. In `src/worker.js` (mappa `PAGES`) e in `public/sitemap.xml`: riaggiungere la voce `/chi-sono`.
