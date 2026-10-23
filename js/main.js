(() => {
  'use strict'

  const $ = (s, c = document) => c.querySelector(s)
  const $$ = (s, c = document) => [...c.querySelectorAll(s)]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ============ IDIOMA ============ */
  const EN = {
    skip: 'Skip to content',
    'nav.taberna': 'The Tavern',
    'nav.carta': 'The Menu',
    'nav.bodega': 'The Cellar',
    'nav.producto': 'The Produce',
    'nav.espacio': 'The Space',
    'nav.contacto': 'Contact',
    'nav.reservar': 'Book',
    'nav.s1': 'Tavern',
    'nav.s2': 'Menu',
    'nav.s3': 'Cellar',
    'nav.s4': 'Produce',
    'nav.s5': 'Space',
    'hero.eyebrow': 'Costa Teguise · Lanzarote',
    'hero.t1': 'Fire & patience',
    'hero.t2': 'Cuts with a story',
    'hero.t3': 'A tavern with soul',
    'hero.sub': 'Local produce, oak-fired grill and cooking made for sharing in the heart of Lanzarote.',
    'hero.h1': 'Solete Guía Repsol',
    'hero.h2': 'Travellers’ Choice',
    'hero.h3': 'Best tortilla in the Canaries',
    'taberna.eyebrow': 'Our home',
    'taberna.titulo': 'The Tavern',
    'taberna.statement': 'El Bocadito was born from a love of <em>things done right</em>: a bar where time stands still, <em>tapas that taste of the island</em> and a grill that is <em>never in a hurry</em>.',
    'taberna.p': 'We work with Lanzarote produce — fish from the coast, island cheeses, volcanic Tinajo tomatoes, wines from La Geria — and treat it with the respect it deserves. Drop in for a bite at the bar or stay for one of those long, lingering lunches.',
    'taberna.firma': 'Owner &amp; host',
    'facts.f1': 'oak charcoal and firewood',
    'facts.f2': 'wines in the cellar',
    'facts.f3': 'open every day',
    'carta.eyebrow': 'Made for sharing',
    'carta.titulo': 'The Menu',
    'carta.p': 'Canarian tapas, market fish and noble cuts from the grill. Honest, seasonal cooking designed for the middle of the table.',
    'carta.btn': 'Full menu',
    'sel.titulo': 'House selection',
    'sel.g1': 'To begin',
    'sel.g1d': 'Wagyu carpaccio · Tinajo tomato salad · Marta’s Spanish omelette',
    'sel.g2': 'From the garden',
    'sel.g2d': 'Artichoke flowers · Sautéed mushrooms, foie and pine nuts',
    'sel.g3': 'From the sea',
    'sel.g3d': 'Red prawns on a bed of salt · Grilled octopus · Small squid',
    'sel.g4': 'Our rice dishes',
    'sel.g4d': 'Black rice with cod · Creamy carabinero risotto',
    'sel.g5': 'From the grill',
    'sel.g5d': 'Ribeye · Iberian lagarto · Mixed grill',
    'sel.g6': 'Dry-aged chops',
    'sel.g6d': 'Wagyu · Rubia Gallega · Barrosã · Portuguese Minhota',
    'sel.g7': 'Sweet ending',
    'sel.g7d': 'Canarian cheesecake · Bienmesabe · Lanzarote-style torrijas',
    'sel.nota': 'IGIC included · Ask about off-menu cuts and daily specials',
    'sel.btn': 'Menu & prices',
    'bodega.eyebrow': 'Sixty-one labels',
    'bodega.titulo': 'The Cellar',
    'bodega.p': 'From Lanzarote’s volcanic whites to the great names of Ribera del Duero and Rioja. Champagne, sparkling wines and a sommelier’s selection for nights worth remembering.',
    'bodega.btn': 'See the wine list',
    'producto.eyebrow': 'Noble cuts',
    'producto.titulo': 'The Produce',
    'producto.p1': 'It is not just meat: it is <em>origin</em>, <em>time</em> and <em>respect</em>. We choose every chop from Europe’s finest farms and let it age until it speaks for itself.',
    'producto.o1': 'Santa Rosalía',
    'producto.o3': 'Northern Portugal',
    'producto.o4': 'Minho, Portugal',
    'producto.p2': 'Every piece is weighed in front of you, cooked over oak charcoal and firewood, and served sliced on a sizzling plate at your table.',
    'espacio.eyebrow': 'Tradition & charm',
    'espacio.titulo': 'The Space',
    'espacio.p': 'A bull’s head, warm light and a collection of vintage cigarette packs that keeps the memory of the old taverns alive. Sit by the bar, order a volcanic wine and let yourself go.',
    'espacio.c1': 'The dining room',
    'espacio.c2': 'The nostalgia corner',
    'espacio.c3': 'Avda. Islas Canarias, Costa Teguise',
    'espacio.c4': 'Table service',
    'espacio.c5': 'From the kitchen',
    'reservar.e1': 'We’ll save you a table',
    'reservar.t1': 'Book',
    'reservar.e2': 'C.C. Los Charcos',
    'reservar.t2': 'Find us',
    'reservar.l2': 'Open in Google Maps <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    'contacto.eyebrow': 'Contact',
    'contacto.titulo': 'See you soon',
    'contacto.tel': 'Phone',
    'contacto.dir': 'Address',
    'contacto.horario': 'Opening hours',
    'contacto.horarioTxt': 'Every day<br />12:00 — 23:00',
    'contacto.redes': 'Follow us',
    'footer.aviso': 'Legal notice',
    'footer.privacidad': 'Privacy',
    'footer.cookies': 'Cookies',
    'footer.derechos': 'All rights reserved',
    'sheet.cocina': 'Kitchen',
    'sheet.bodega': 'Cellar',
    'sheet.titulo': 'The Menu',
    'sheet.nota': 'IGIC included · Ask our team about allergens',
  }

  const nodes = $$('[data-i18n]')
  const ES = {}
  nodes.forEach((n) => { ES[n.dataset.i18n] = n.innerHTML })

  const store = {
    get(k) { try { return localStorage.getItem(k) } catch { return null } },
    set(k, v) { try { localStorage.setItem(k, v) } catch {} },
  }

  let lang = store.get('bocadito-lang') || (navigator.language || 'es').slice(0, 2)
  if (lang !== 'en') lang = 'es'

  function applyLang(l) {
    lang = l
    document.documentElement.lang = l
    const dict = l === 'en' ? EN : ES
    nodes.forEach((n) => {
      const v = dict[n.dataset.i18n] ?? ES[n.dataset.i18n]
      if (v != null && n.innerHTML !== v) n.innerHTML = v
    })
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === l)))
    store.set('bocadito-lang', l)
    if (!$('#sheet').hidden) renderSheet(currentTab)
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)))
  applyLang(lang)

  /* ============ CABECERA ============ */
  const hdr = $('#hdr')
  const hero = $('.hero')
  let lastY = scrollY
  function onHeader() {
    const y = scrollY
    hdr.classList.toggle('solid', y > 40)
    const pastHero = y > hero.offsetHeight * 0.6
    hdr.classList.toggle('hide', pastHero && y > lastY + 4 && !document.body.classList.contains('locked'))
    if (y < lastY - 4 || !pastHero) hdr.classList.remove('hide')
    lastY = y
  }

  // Enlace activo según la sección visible
  const links = $$('.hdr-nav a')
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${e.target.id}`))
    })
  }, { rootMargin: '-45% 0px -50% 0px' })
  links.forEach((a) => { const s = $(a.getAttribute('href')); if (s) spy.observe(s) })

  /* ============ MENÚ MÓVIL ============ */
  const burger = $('#burger')
  const menu = $('#menu')
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú')
    document.body.classList.toggle('locked', open)
    if (open) {
      menu.hidden = false
      hdr.classList.add('solid')
      requestAnimationFrame(() => menu.classList.add('open'))
      $$('nav a', menu).forEach((a, i) => { a.style.transitionDelay = `${0.08 + i * 0.05}s` })
    } else {
      menu.classList.remove('open')
      setTimeout(() => { if (!menu.classList.contains('open')) menu.hidden = true }, 500)
      onHeader()
    }
  }
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'))
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)))

  /* ============ HERO ============ */
  const slides = $$('.slide')
  const titles = $$('.hero-title')
  const dots = $$('.dots button')
  const SLIDE_MS = 7000
  hero.style.setProperty('--slide-ms', `${SLIDE_MS}ms`)
  let cur = 0
  let timer = 0

  function go(i) {
    cur = (i + slides.length) % slides.length
    slides.forEach((s, k) => s.classList.toggle('is-on', k === cur))
    titles.forEach((t, k) => t.classList.toggle('is-on', k === cur))
    dots.forEach((d, k) => {
      d.setAttribute('aria-selected', String(k === cur))
      const bar = d.firstElementChild
      bar.replaceWith(bar.cloneNode(true)) // reinicia la animación de la barra
    })
    const next = slides[(cur + 1) % slides.length].querySelector('img')
    if (next.loading === 'lazy') next.loading = 'eager'
  }
  function play() { clearInterval(timer); if (!reduced) timer = setInterval(() => go(cur + 1), SLIDE_MS) }
  dots.forEach((d, k) => d.addEventListener('click', () => { go(k); play() }))
  document.addEventListener('visibilitychange', () => (document.hidden ? clearInterval(timer) : play()))
  play()

  /* ============ APARICIÓN AL HACER SCROLL ============ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
  $$('.rv').forEach((el) => io.observe(el))

  /* ============ PARALLAX ============ */
  const para = reduced ? [] : $$('[data-speed]')
  function onParallax() {
    const vh = innerHeight
    para.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect()
      if (r.bottom < -200 || r.top > vh + 200) return
      const center = r.top + r.height / 2 - vh / 2
      el.style.transform = `translate3d(0, ${(center * parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`
    })
  }

  let ticking = false
  addEventListener('scroll', () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => { onHeader(); onParallax(); ticking = false })
  }, { passive: true })
  addEventListener('resize', onParallax)
  onHeader()
  onParallax()

  /* ============ GALERÍA DEL ESPACIO ============ */
  const rail = $('#rail')
  const items = $$('li', rail)
  const now = $('#railNow')
  const bar = $('#railBar')
  $('#railTotal').textContent = String(items.length).padStart(2, '0')

  function railState() {
    const max = rail.scrollWidth - rail.clientWidth
    const p = max > 0 ? rail.scrollLeft / max : 0
    const idx = Math.round(p * (items.length - 1))
    now.textContent = String(idx + 1).padStart(2, '0')
    const w = Math.max(rail.clientWidth / rail.scrollWidth, 0.12)
    bar.style.width = `${w * 100}%`
    bar.style.transform = `translateX(${(p * (1 - w) / w) * 100}%)`
  }
  function step(dir) {
    const w = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 20)
    rail.scrollBy({ left: dir * w, behavior: reduced ? 'auto' : 'smooth' })
  }
  rail.addEventListener('scroll', () => requestAnimationFrame(railState), { passive: true })
  addEventListener('resize', railState)
  $('#railPrev').addEventListener('click', () => step(-1))
  $('#railNext').addEventListener('click', () => step(1))
  rail.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
  })
  railState()

  // Arrastrar con ratón
  let dragX = 0, startLeft = 0, dragging = false, moved = false
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return
    dragging = true; moved = false; dragX = e.clientX; startLeft = rail.scrollLeft
  })
  addEventListener('pointermove', (e) => {
    if (!dragging) return
    const dx = e.clientX - dragX
    if (Math.abs(dx) > 4) { moved = true; rail.classList.add('drag') }
    rail.scrollLeft = startLeft - dx
  })
  addEventListener('pointerup', () => {
    if (!dragging) return
    dragging = false
    if (moved) {
      rail.classList.remove('drag')
      const w = items[0].getBoundingClientRect().width
      rail.scrollTo({ left: Math.round(rail.scrollLeft / w) * w, behavior: 'smooth' })
    }
  })

  /* ============ CARTA COMPLETA ============ */
  const sheet = $('#sheet')
  const content = $('#sheetContent')
  const toggle = $('.toggle')
  let currentTab = 'cocina'
  let lastFocus = null

  const L = (v) => (v && typeof v === 'object' ? v[lang] ?? v.es : v)
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

  function renderSheet(tab) {
    currentTab = tab
    toggle.dataset.active = tab
    $$('button', toggle).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)))
    const data = tab === 'bodega' ? window.VINOS : window.CARTA
    content.innerHTML = data.map((sec, i) => {
      const simple = sec.platos.every((p) => !p.precio)
      const list = simple
        ? `<ul class="m-simple">${sec.platos.map((p) => `<li>${esc(L(p.nombre))}</li>`).join('')}</ul>`
        : `<ul class="m-list">${sec.platos.map((p) => `
            <li class="m-item">
              <span class="m-name">${esc(L(p.nombre))}</span>
              <span class="m-price">${esc(L(p.precio))}</span>
              ${p.desc ? `<span class="m-desc">${esc(L(p.desc))}</span>` : ''}
            </li>`).join('')}</ul>`
      return `<section class="m-sec" style="animation-delay:${Math.min(i * 0.06, 0.4)}s">
        <h3>${esc(L(sec.titulo))}</h3>
        ${sec.nota ? `<p>${esc(L(sec.nota))}</p>` : ''}
        ${list}
      </section>`
    }).join('')
    $('#sheetBody').scrollTop = 0
  }

  function openSheet(tab) {
    lastFocus = document.activeElement
    renderSheet(tab)
    sheet.hidden = false
    document.body.classList.add('locked')
    requestAnimationFrame(() => sheet.classList.add('open'))
    $('#sheetClose').focus()
  }
  function closeSheet() {
    sheet.classList.remove('open')
    document.body.classList.remove('locked')
    setTimeout(() => { sheet.hidden = true }, 450)
    if (lastFocus) lastFocus.focus()
  }

  $$('[data-open]').forEach((b) => b.addEventListener('click', () => openSheet(b.dataset.open)))
  $$('button', toggle).forEach((b) => b.addEventListener('click', () => renderSheet(b.dataset.tab)))
  $('#sheetClose').addEventListener('click', closeSheet)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!sheet.hidden) closeSheet()
      else if (burger.getAttribute('aria-expanded') === 'true') setMenu(false)
    }
    // Mantener el foco dentro del diálogo
    if (e.key === 'Tab' && !sheet.hidden) {
      const f = $$('button, a[href]', sheet)
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  })

  $('#year').textContent = new Date().getFullYear()
})()
