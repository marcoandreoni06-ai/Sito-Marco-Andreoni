import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import gsap from 'gsap'
import { GALLERY } from './galleryData'

/* ================================================================
   Galleria sferica (ispirata a phantom.land)
   - Sei dentro una sfera: le card tappezzano la superficie interna e
     guardano tutte verso il centro (la camera).
   - Click-drag per ruotare la sfera, con easing "pesante" stile Lenis
     (doppio smoothing: velocità con attrito + lerp verso il target).
   - Hover: la card si solleva verso di te.
   - Click su una card: si centra, la camera entra, un velo del colore
     della card riempie lo schermo, poi naviga alla pagina dettaglio.
   Tutto in vanilla Three.js per il massimo controllo su performance e feel.
================================================================ */

const R = 7.6               // raggio della sfera
const CARD_W = 1.68         // card quadrate
const CARD_H = 1.68
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Anelli (latitudini) e densità: più fitti all'equatore, radi verso i poli
const RINGS = [
  { lat: 0,    n: 12, off: 0 },
  { lat: 24,   n: 12, off: 15 },
  { lat: -24,  n: 12, off: 15 },
  { lat: 49,   n: 9,  off: 0 },
  { lat: -49,  n: 9,  off: 0 },
  { lat: 72,   n: 5,  off: 20 },
  { lat: -72,  n: 5,  off: 20 },
]

const DEG = Math.PI / 180

// Texture-card quadrata generata su canvas (angoli arrotondati + gradiente + meta)
function makeTexture(item) {
  const s = 512
  const c = document.createElement('canvas')
  c.width = s; c.height = s
  const ctx = c.getContext('2d')
  const pad = 6, rad = 54

  // angoli arrotondati: tutto ciò che è fuori dal round-rect resta trasparente
  ctx.clearRect(0, 0, s, s)
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(pad, pad, s - pad * 2, s - pad * 2, rad)
  ctx.clip()

  const g = ctx.createLinearGradient(0, 0, s, s)
  g.addColorStop(0, `hsl(${item.hue}, 64%, 13%)`)
  g.addColorStop(1, `hsl(${item.hue2}, 82%, 47%)`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)

  // velo radiale per profondità
  const rg = ctx.createRadialGradient(s * 0.72, s * 0.22, 40, s * 0.5, s * 0.5, s * 0.85)
  rg.addColorStop(0, 'rgba(255,255,255,0.18)')
  rg.addColorStop(1, 'rgba(0,0,0,0.32)')
  ctx.fillStyle = rg
  ctx.fillRect(0, 0, s, s)

  // griglia di punti (vibe tecnica/brand)
  ctx.fillStyle = 'rgba(255,255,255,0.09)'
  for (let y = 30; y < s; y += 30) {
    for (let x = 30; x < s; x += 30) {
      ctx.beginPath(); ctx.arc(x, y, 1.1, 0, Math.PI * 2); ctx.fill()
    }
  }

  // indice (mono, alto a sx)
  ctx.fillStyle = 'rgba(255,255,255,0.74)'
  ctx.font = '600 24px "Space Mono", ui-monospace, monospace'
  ctx.fillText('(' + item.idx + ')', 40, 64)

  // tag (alto a dx)
  ctx.textAlign = 'right'
  ctx.font = '600 17px "Space Mono", ui-monospace, monospace'
  ctx.fillStyle = 'rgba(255,255,255,0.66)'
  ctx.fillText(item.tag.toUpperCase(), s - 40, 62)
  ctx.textAlign = 'left'

  // titolo (basso a sx) — riduce il corpo se troppo lungo
  ctx.fillStyle = 'rgba(255,255,255,0.97)'
  let fs = 64
  ctx.font = `600 ${fs}px Geist, system-ui, sans-serif`
  while (ctx.measureText(item.title).width > s - 80 && fs > 30) {
    fs -= 4; ctx.font = `600 ${fs}px Geist, system-ui, sans-serif`
  }
  ctx.fillText(item.title, 40, s - 54)

  // freccia (basso a dx)
  ctx.strokeStyle = 'rgba(255,255,255,0.92)'
  ctx.lineWidth = 3.5
  const ax = s - 66, ay = s - 70
  ctx.beginPath()
  ctx.moveTo(ax - 15, ay + 15); ctx.lineTo(ax + 15, ay - 15)
  ctx.moveTo(ax + 1, ay - 15); ctx.lineTo(ax + 15, ay - 15); ctx.lineTo(ax + 15, ay - 1)
  ctx.stroke()
  ctx.restore()

  // bordo interno sottile lungo il round-rect
  ctx.beginPath()
  ctx.roundRect(pad + 1.5, pad + 1.5, s - pad * 2 - 3, s - pad * 2 - 3, rad - 1.5)
  ctx.strokeStyle = 'rgba(255,255,255,0.22)'
  ctx.lineWidth = 2
  ctx.stroke()

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

// Maschera ad angoli arrotondati (alphaMap) per le card a video,
// così hanno gli stessi corner delle card procedurali
function makeRoundMask() {
  const s = 512
  const c = document.createElement('canvas')
  c.width = s; c.height = s
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, s, s)
  ctx.fillStyle = '#fff'
  ctx.beginPath(); ctx.roundRect(6, 6, s - 12, s - 12, 54); ctx.fill()
  return new THREE.CanvasTexture(c)
}

// Overlay trasparente per le card a video: gradiente premium + meta
// (indice, tag in alto, titolo e freccia in basso). Il video resta visibile.
function makeOverlayTexture(item) {
  const s = 512
  const c = document.createElement('canvas')
  c.width = s; c.height = s
  const ctx = c.getContext('2d')
  const pad = 6, rad = 54

  ctx.clearRect(0, 0, s, s)
  ctx.save()
  ctx.beginPath(); ctx.roundRect(pad, pad, s - pad * 2, s - pad * 2, rad); ctx.clip()

  // gradiente premium: tinta brand leggera in alto, scrim profondo in basso
  const g = ctx.createLinearGradient(0, 0, 0, s)
  g.addColorStop(0, `hsla(${item.hue}, 82%, 60%, 0.12)`)
  g.addColorStop(0.42, `hsla(${item.hue}, 70%, 32%, 0.05)`)
  g.addColorStop(0.78, `hsla(${item.hue}, 74%, 12%, 0.45)`)
  g.addColorStop(1, `hsla(${item.hue}, 78%, 7%, 0.9)`)
  ctx.fillStyle = g; ctx.fillRect(0, 0, s, s)

  // sheen diagonale in alto a destra (accento brand "accattivante")
  const rg = ctx.createRadialGradient(s * 0.82, s * 0.12, 20, s * 0.82, s * 0.12, s * 0.72)
  rg.addColorStop(0, `hsla(${item.hue2}, 92%, 64%, 0.34)`)
  rg.addColorStop(1, 'hsla(0,0%,0%,0)')
  ctx.fillStyle = rg; ctx.fillRect(0, 0, s, s)

  // testo con leggera ombra per leggibilità sul video
  ctx.shadowColor = 'rgba(0,0,0,0.45)'
  ctx.shadowBlur = 10

  // indice (alto a sx)
  ctx.fillStyle = 'rgba(255,255,255,0.82)'
  ctx.font = '600 24px "Space Mono", ui-monospace, monospace'
  ctx.fillText('(' + item.idx + ')', 40, 64)

  // tag / breve descrizione (alto a dx)
  ctx.textAlign = 'right'
  ctx.font = '600 17px "Space Mono", ui-monospace, monospace'
  ctx.fillStyle = 'rgba(255,255,255,0.74)'
  ctx.fillText(item.tag.toUpperCase(), s - 40, 62)
  ctx.textAlign = 'left'

  // titolo (basso a sx)
  ctx.fillStyle = 'rgba(255,255,255,0.98)'
  let fs = 64
  ctx.font = `600 ${fs}px Geist, system-ui, sans-serif`
  while (ctx.measureText(item.title).width > s - 80 && fs > 30) {
    fs -= 4; ctx.font = `600 ${fs}px Geist, system-ui, sans-serif`
  }
  ctx.fillText(item.title, 40, s - 54)

  // freccia (basso a dx)
  ctx.strokeStyle = 'rgba(255,255,255,0.95)'
  ctx.lineWidth = 3.5
  const ax = s - 66, ay = s - 70
  ctx.beginPath()
  ctx.moveTo(ax - 15, ay + 15); ctx.lineTo(ax + 15, ay - 15)
  ctx.moveTo(ax + 1, ay - 15); ctx.lineTo(ax + 15, ay - 15); ctx.lineTo(ax + 15, ay - 1)
  ctx.stroke()
  ctx.shadowBlur = 0
  ctx.restore()

  // bordo interno sottile
  ctx.beginPath()
  ctx.roundRect(pad + 1.5, pad + 1.5, s - pad * 2 - 3, s - pad * 2 - 3, rad - 1.5)
  ctx.strokeStyle = 'rgba(255,255,255,0.24)'
  ctx.lineWidth = 2
  ctx.stroke()

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

export default function SphereGallery() {
  const mountRef = useRef(null)
  const overlayRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100)
    camera.position.set(0, 0, 0.001) // praticamente al centro della sfera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.touchAction = 'none'
    renderer.domElement.style.cursor = 'grab'

    const group = new THREE.Group()
    scene.add(group)

    // --- costruzione posizioni ordinate dal centro verso l'esterno ---
    const slots = []
    RINGS.forEach((ring) => {
      for (let j = 0; j < ring.n; j++) {
        const lon = (j / ring.n) * 360 + ring.off
        const latR = ring.lat * DEG
        const lonR = lon * DEG
        const x = R * Math.cos(latR) * Math.sin(lonR)
        const y = R * Math.sin(latR)
        const z = -R * Math.cos(latR) * Math.cos(lonR)
        // distanza angolare dal fronte (0,0,-1): cosLat*cosLon
        const dist = Math.acos(Math.max(-1, Math.min(1, Math.cos(latR) * Math.cos(lonR))))
        slots.push({ x, y, z, lat: latR, lon: lonR, dist })
      }
    })
    slots.sort((a, b) => a.dist - b.dist)

    const geo = new THREE.PlaneGeometry(CARD_W, CARD_H, 1, 1)
    const meshes = []
    const textures = []
    const videos = []
    const overlayTextures = []
    const roundMask = makeRoundMask()
    const count = Math.min(GALLERY.length, slots.length)
    for (let i = 0; i < count; i++) {
      const item = GALLERY[i]
      const s = slots[i]
      let tex, mat
      if (item.video) {
        // card a video: riproduzione continua, in loop, mai in pausa
        const v = document.createElement('video')
        v.src = item.video
        v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '')
        v.playbackRate = 0.75   // riproduzione leggermente rallentata
        v.addEventListener('loadedmetadata', () => { v.playbackRate = 0.75 })
        // agganciato al DOM (invisibile) → riproduzione affidabile, niente throttling
        v.style.cssText = 'position:absolute;left:-9999px;top:0;width:2px;height:2px;opacity:0;pointer-events:none'
        mount.appendChild(v)
        v.play().catch(() => {})
        // non deve mai fermarsi: se va in pausa lo riavvio
        v.addEventListener('pause', () => { if (!closing) v.play().catch(() => {}) })
        v.addEventListener('ended', () => { if (!closing) { v.currentTime = 0; v.play().catch(() => {}) } })
        videos.push(v)
        tex = new THREE.VideoTexture(v)
        tex.colorSpace = THREE.SRGBColorSpace
        // cover-fit nella card quadrata (ritaglio centrato)
        v.addEventListener('loadedmetadata', () => {
          const ar = (v.videoWidth / v.videoHeight) || 1
          if (ar > 1) { tex.repeat.set(1 / ar, 1); tex.offset.set((1 - 1 / ar) / 2, 0) }
          else { tex.repeat.set(1, ar); tex.offset.set(0, (1 - ar) / 2) }
        })
        mat = new THREE.MeshBasicMaterial({ map: tex, alphaMap: roundMask, transparent: true, side: THREE.DoubleSide, depthWrite: false })
      } else if (item.image) {
        // card a immagine (es. logo cliente): stessa resa delle card a video
        tex = new THREE.TextureLoader().load(item.image, (t) => {
          const img = t.image
          const ar = (img && img.width / img.height) || 1
          // cover-fit nella card quadrata (ritaglio centrato)
          if (ar > 1) { t.repeat.set(1 / ar, 1); t.offset.set((1 - 1 / ar) / 2, 0) }
          else { t.repeat.set(1, ar); t.offset.set(0, (1 - ar) / 2) }
          t.needsUpdate = true
        })
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = 8
        mat = new THREE.MeshBasicMaterial({ map: tex, alphaMap: roundMask, transparent: true, side: THREE.DoubleSide, depthWrite: false })
      } else {
        tex = makeTexture(item)
        mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false })
      }
      textures.push(tex)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(s.x, s.y, s.z)
      mesh.lookAt(0, 0, 0)            // fronte verso il centro
      mesh.userData = { item, lat: s.lat, lon: s.lon, hover: 0, base: mesh.position.clone(), dir: mesh.position.clone().normalize() }
      group.add(mesh)
      meshes.push(mesh)

      // card a video/immagine: piano-overlay (gradiente premium + meta) davanti al media
      if (item.video || item.image) {
        const ot = makeOverlayTexture(item)
        overlayTextures.push(ot)
        const om = new THREE.MeshBasicMaterial({ map: ot, transparent: true, depthWrite: false, side: THREE.DoubleSide })
        const ov = new THREE.Mesh(geo, om)
        ov.position.set(0, 0, 0.012)   // appena davanti al video
        ov.renderOrder = 2
        mesh.add(ov)
        mesh.userData.overlayMat = om
      }
    }

    // ---- stato interazione ----
    const target = { x: 0, y: 0 }      // rotazione desiderata del gruppo
    const current = { x: 0, y: 0 }     // rotazione corrente (eased)
    let velX = 0, velY = 0
    let dragging = false
    let downX = 0, downY = 0, lastX = 0, lastY = 0, downT = 0, moved = 0
    let transitioning = false
    let closing = false
    const MAX_X = 1.15                  // clamp verticale (~66°)

    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    let hovered = null

    const rect = () => renderer.domElement.getBoundingClientRect()

    function setNdc(e) {
      const r = rect()
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1
    }

    function pick() {
      raycaster.setFromCamera(ndc, camera)
      const hits = raycaster.intersectObjects(meshes, false)
      return hits.length ? hits[0].object : null
    }

    function onDown(e) {
      if (transitioning) return
      dragging = true; moved = 0
      downX = lastX = e.clientX; downY = lastY = e.clientY; downT = performance.now()
      renderer.domElement.style.cursor = 'grabbing'
      renderer.domElement.setPointerCapture?.(e.pointerId)
    }
    function onMove(e) {
      setNdc(e)
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY
        lastX = e.clientX; lastY = e.clientY
        moved += Math.abs(dx) + Math.abs(dy)
        velY = dx * 0.0042
        velX = dy * 0.0042
        target.y += velY
        target.x += velX
        target.x = Math.max(-MAX_X, Math.min(MAX_X, target.x))
      }
    }
    function onUp(e) {
      if (!dragging) return
      dragging = false
      renderer.domElement.style.cursor = 'grab'
      const dt = performance.now() - downT
      // tap = poco movimento + breve → apri card
      if (moved < 9 && dt < 420 && !transitioning) {
        setNdc(e)
        const hit = pick()
        if (hit) openCard(hit)
      }
    }

    function onLeave() { dragging = false }

    function openCard(mesh) {
      transitioning = true
      const { item, lat, lon } = mesh.userData
      renderer.domElement.style.cursor = 'default'

      // 1) centra la card portandola davanti
      gsap.to(target, { x: lat, y: -lon, duration: 1.0, ease: 'power3.inOut' })
      // 2) la camera entra dentro la card
      gsap.to(camera.position, { z: -(R - 1.55), duration: 1.1, ease: 'power3.inOut' })
      gsap.to(camera, { fov: 38, duration: 1.1, ease: 'power3.inOut', onUpdate: () => camera.updateProjectionMatrix() })
      // 3) sollevamento card + dissolvenza delle altre
      meshes.forEach((m) => {
        if (m !== mesh) {
          gsap.to(m.material, { opacity: 0, duration: 0.7, ease: 'power2.out' })
          if (m.userData.overlayMat) gsap.to(m.userData.overlayMat, { opacity: 0, duration: 0.7, ease: 'power2.out' })
        }
      })
      // 4) velo colore → naviga
      const ov = overlayRef.current
      if (ov) {
        ov.style.background = `linear-gradient(135deg, hsl(${item.hue} 68% 14%), hsl(${item.hue2} 82% 46%))`
        gsap.to(ov, { opacity: 1, duration: 0.55, delay: 0.62, ease: 'power2.inOut',
          onComplete: () => navigate('/lab/' + item.slug) })
      } else {
        setTimeout(() => navigate('/lab/' + item.slug), 1000)
      }
    }

    const el = renderer.domElement
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('pointerleave', onLeave)

    // ---- resize ----
    function resize() {
      const w = mount.clientWidth, h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    // ---- loop ----
    const reduce = reduceMotion()
    let raf = 0
    const idleSpin = 0.0003          // lentissima rotazione automatica a riposo
    const clock = new THREE.Clock()
    const tmp = new THREE.Vector3()
    const pointerSm = { x: 0, y: 0 }

    // intro: la sfera si compone in dissolvenza + scala
    const introObj = { v: reduce ? 1 : 0 }
    if (!reduce) gsap.to(introObj, { v: 1, duration: 1.7, ease: 'power3.out', delay: 0.05 })

    function frame() {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(clock.getDelta(), 0.05)

      if (!dragging && !transitioning) {
        // inerzia con attrito (glide morbido)
        target.y += velY
        target.x += velX
        target.x = Math.max(-MAX_X, Math.min(MAX_X, target.x))
        velY *= 0.955
        velX *= 0.955
        if (Math.abs(velX) < 1e-5) velX = 0
        if (Math.abs(velY) < 1e-5) velY = 0
        // drift automatico quasi impercettibile
        if (!reduce && Math.abs(velY) < 0.0005) target.y += idleSpin
      }

      // smoothing indipendente dal frame-rate (feel "pesante" alla Lenis)
      const k = reduce ? 1 : 1 - Math.exp(-dt * 5.5)
      current.x += (target.x - current.x) * k
      current.y += (target.y - current.y) * k

      // parallasse dolce verso il cursore (vita anche da fermi)
      pointerSm.x += (ndc.x - pointerSm.x) * (reduce ? 1 : 0.05)
      pointerSm.y += (ndc.y - pointerSm.y) * (reduce ? 1 : 0.05)
      const par = transitioning ? 0 : 0.06
      group.rotation.x = current.x + pointerSm.y * par
      group.rotation.y = current.y + pointerSm.x * par

      // intro: scala dolce dell'intera sfera
      group.scale.setScalar(0.86 + 0.14 * introObj.v)

      // hover (solo a riposo)
      if (!dragging && !transitioning) {
        const hit = pick()
        if (hit !== hovered) {
          hovered = hit
          el.style.cursor = hit ? 'pointer' : 'grab'
        }
      }

      meshes.forEach((m) => {
        // sollevamento all'hover verso la camera + scale
        const want = (m === hovered && !transitioning) ? 1 : 0
        m.userData.hover += (want - m.userData.hover) * (reduce ? 1 : 0.16)
        const lift = m.userData.hover
        m.position.copy(m.userData.dir).multiplyScalar(R - lift * 0.95)
        m.scale.setScalar(1 + lift * 0.16)

        // vignetta di messa a fuoco: card centrali piene, bordi che sfumano
        if (!transitioning) {
          tmp.copy(m.position).applyQuaternion(group.quaternion).normalize()
          const f = -tmp.z               // 1 = davanti, 0 = bordo
          const fade = Math.max(0, Math.min(1, (f - 0.08) / 0.5))
          const op = fade * introObj.v
          m.material.opacity = op
          if (m.userData.overlayMat) m.userData.overlayMat.opacity = op
        }
      })

      renderer.render(scene, camera)
    }
    frame()

    // ---- cleanup ----
    return () => {
      closing = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(camera.position); gsap.killTweensOf(camera); gsap.killTweensOf(target); gsap.killTweensOf(introObj)
      meshes.forEach((m) => { gsap.killTweensOf(m.material); if (m.userData.overlayMat) gsap.killTweensOf(m.userData.overlayMat) })
      geo.dispose()
      textures.forEach((t) => t.dispose())
      overlayTextures.forEach((t) => t.dispose())
      roundMask.dispose()
      videos.forEach((v) => { v.pause(); v.removeAttribute('src'); v.load(); if (v.parentNode) v.parentNode.removeChild(v) })
      meshes.forEach((m) => { m.material.dispose(); if (m.userData.overlayMat) m.userData.overlayMat.dispose() })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [navigate])

  return (
    <div className="sphere-stage" ref={mountRef}>
      <div className="sphere-veil" ref={overlayRef} aria-hidden="true" />
    </div>
  )
}
