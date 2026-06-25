/* ================================================================
   Dati della galleria sferica (pagina Lab)
   I primi 4 sono progetti "reali" (incluso il progetto richiesto: test),
   il resto è un indice di lavori che riempie la sfera come su phantom.land.
   Ogni card è una texture-gradiente generata a runtime (offline, on-brand).
================================================================ */

// Palette coesa attorno al blu elettrico di brand + qualche accento
const PALETTE = [230, 232, 248, 260, 212, 200, 280, 222, 205, 268, 24, 16]

const REAL = [
  { slug: 'sonora',        title: 'Sonora',       tag: 'Brand & Web',       hue: 265, video: '/video/Sonora.mp4' },
  { slug: 'scatolificio',  title: 'Scatolificio', tag: 'Social Media',      hue: 24,  video: '/video/scatolificio.mp4' },
  { slug: 'sidereal',      title: 'Sidereal',     tag: 'Brand & Foto',      hue: 212, video: '/video/sidereal.mp4' },
  { slug: 'sanitaria',     title: 'Sanitaria',    tag: 'Brand & Social',    hue: 158, image: '/assets/sanitaria/sanitaria-card.jpg' },
  { slug: 'santorso',      title: "Sant'Orso",    tag: 'Sport & Brand',     hue: 222, image: '/assets/santorso/santorso-card.jpg' },
  { slug: 'lucia',         title: 'Lucia Pierini', tag: 'Social & ADV',     hue: 210, image: '/assets/lucia/lucia-card.jpg' },
  { slug: 'maeng',         title: 'MA Engineering', tag: 'Web Design',      hue: 214, image: '/assets/maeng/maeng-card.jpg' },
  { slug: 'tiguido',       title: 'Ti Guido nella Storia', tag: 'Content & Brand', hue: 30, image: '/assets/tiguido/tiguido-card.jpg' },
  { slug: 'ai-systems',    title: 'Sistemi AI',   tag: 'AI & Automations',  hue: 198, image: '/assets/ai-systems/neuroni.jpg' },
]

const WORDS = [
  'Aurora', 'Vertex', 'Halcyon', 'Lumen', 'Cadence', 'Pulse', 'Strata', 'Echo',
  'Atlas', 'Nimbus', 'Quartz', 'Vortex', 'Helix', 'Drift', 'Prism', 'Onyx',
  'Flux', 'Cobalt', 'Ember', 'Signal', 'Motion', 'Archive', 'Beacon', 'Cipher',
  'Meridian', 'Tonal', 'Static', 'Relay', 'Mono', 'Form', 'Index', 'Lattice',
  'Spectra', 'Nova', 'Glint', 'Verso', 'Axiom', 'Halo',
]

export const GALLERY = []

REAL.forEach((r, i) => {
  GALLERY.push({
    ...r,
    idx: String(i + 1).padStart(2, '0'),
    hue2: r.hue + 22,
    kind: 'project',
  })
})

WORDS.forEach((w, i) => {
  const hue = PALETTE[i % PALETTE.length]
  GALLERY.push({
    slug: 'work-' + String(i + 1).padStart(2, '0'),
    title: w,
    tag: 'Index',
    hue,
    hue2: hue + 24,
    idx: String(REAL.length + i + 1).padStart(2, '0'),
    kind: 'index',
  })
})

export function getGalleryItem(slug) {
  return GALLERY.find((g) => g.slug === slug) || null
}

// CSS gradient usato per overlay di transizione + hero della pagina dettaglio
export function gradientFor(item) {
  return `linear-gradient(135deg, hsl(${item.hue} 68% 14%), hsl(${item.hue2} 82% 46%))`
}
