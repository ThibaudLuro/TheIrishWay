(() => {
  const mobile = window.matchMedia('(max-width: 760px)');

  /* ==========================================================
     Données
     ========================================================== */
  const PLACES = [
    { cat: 'voir', num: '01', name: 'Trinity College', area: 'centre', desc: 'la long room et le book of kells. réserver avant.', lat: 53.3438, lng: -6.2546 },
    { cat: 'voir', num: '02', name: 'Guinness Storehouse', area: 'the liberties', desc: 'la brasserie et son bar panoramique, le gravity bar.', lat: 53.3419, lng: -6.2867 },
    { cat: 'voir', num: '03', name: 'Kilmainham Gaol', area: 'kilmainham', desc: 'la prison de 1916. complet vite, à réserver.', lat: 53.3419, lng: -6.3097 },
    { cat: 'voir', num: '04', name: 'Chester Beatty', area: 'dame street', desc: 'derrière le château. gratuit.', lat: 53.3426, lng: -6.2672 },
    { cat: 'voir', num: '05', name: "Ha'penny Bridge", area: 'centre', desc: 'le pont piéton de 1816 sur la liffey.', lat: 53.3463, lng: -6.2631 },
    { cat: 'voir', num: '06', name: 'Phoenix Park', area: 'nord-ouest', desc: 'grand parc, avec des daims en liberté.', lat: 53.3559, lng: -6.3298 },
    { cat: 'pub', num: '07', name: 'The Cobblestone', desc: 'session trad tous les soirs.', lat: 53.3486, lng: -6.2779 },
    { cat: 'pub', num: '08', name: 'The Brazen Head', desc: "le plus vieux pub d'irlande, depuis 1198.", lat: 53.3446, lng: -6.2763 },
    { cat: 'pub', num: '09', name: "O'Donoghue's", desc: 'là où les dubliners ont commencé.', lat: 53.3385, lng: -6.2526 },
    { cat: 'pub', num: '10', name: "Mulligan's", desc: 'réputé pour sa guinness, depuis 1782.', lat: 53.3471, lng: -6.2549 },
    { cat: 'pub', num: '11', name: 'The Long Hall', desc: 'bar victorien, pas de musique.', lat: 53.3421, lng: -6.2649 },
    { cat: 'pub', num: '12', name: "Kehoe's", desc: 'pub victorien et son snug à l\'entrée.', lat: 53.3412, lng: -6.2593 },
    { cat: 'sortir', num: '', name: 'Drury St', desc: 'rue de bars et de restaurants.', lat: 53.3420, lng: -6.2633 },
    { cat: 'manger', num: '', name: 'Leo Burdock', desc: 'fish & chips.', lat: 53.3426, lng: -6.2711 },
    { cat: 'manger', num: '', name: "Bewley's", desc: 'café et scone.', lat: 53.3409, lng: -6.2604 },
  ];

  // Position du QG : renseigner lat/lng quand le logement est connu (null = bouton masqué).
  const QG = null; // ex. { lat: 53.34, lng: -6.26 }

  const ORIGINS = [
    { id: 'geo', label: 'Ma position' },
    ...(QG ? [{ id: 'qg', label: 'Le QG', ...QG }] : []),
    { id: 'temple', label: 'Temple Bar', lat: 53.3455, lng: -6.2643 },
    { id: 'trinity', label: 'Trinity', lat: 53.3438, lng: -6.2546 },
    { id: 'smithfield', label: 'Smithfield', lat: 53.3489, lng: -6.2782 },
    { id: 'green', label: "St Stephen's Green", lat: 53.3382, lng: -6.2591 },
  ];
  const TEMPLE = ORIGINS.find((o) => o.id === 'temple');
  const CAT_LABEL = { voir: 'à voir', pub: 'pub', manger: 'manger', sortir: 'sortir' };

  /* ==========================================================
     Distances
     ========================================================== */
  const distKm = (a, b) => {
    const R = 6371, toR = Math.PI / 180;
    const dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const fmtDist = (d) => (d < 1 ? `${Math.round(d * 100) * 10} m` : `${d.toFixed(1).replace('.', ',')} km`);
  const fmtWalk = (d) => {
    if (d > 12) return 'trop loin à pied';
    const min = Math.max(1, Math.round((d * 1.3 / 4.8) * 60));
    return min < 60 ? `${min} min à pied` : `${Math.floor(min / 60)} h ${min % 60} à pied`;
  };

  /* ==========================================================
     Rendu
     ========================================================== */
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const $origins = document.getElementById('origins');
  const $status = document.getElementById('status');
  const $nearest = document.getElementById('nearest');
  const $first = document.getElementById('sight-first');
  const $rest = document.getElementById('sight-rest');
  const $pubs = document.getElementById('pubs-list');

  const state = { origin: 'temple', geo: null };

  const render = () => {
    const from = state.origin === 'geo' ? state.geo : ORIGINS.find((o) => o.id === state.origin);
    const list = PLACES.map((p) => {
      const d = distKm(from || TEMPLE, p);
      return { ...p, d, dist: fmtDist(d), walk: fmtWalk(d) };
    }).sort((a, b) => a.d - b.d);

    // boutons de départ
    $origins.querySelectorAll('.origin').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === state.origin)));

    // les 5 plus proches
    $nearest.replaceChildren(...list.slice(0, 5).map((p) => {
      const li = el('li');
      const main = el('div', 'nearest__main');
      main.append(el('span', 'nearest__cat', CAT_LABEL[p.cat]), el('span', 'display nearest__name', p.name));
      const dist = el('span', 'nearest__dist');
      dist.append(el('b', null, p.dist), el('span', null, p.walk));
      li.append(main, dist);
      return li;
    }));

    // à voir
    const sights = list.filter((p) => p.cat === 'voir');
    const [first, ...rest] = sights;
    $first.querySelectorAll('[data-f]').forEach((n) => { n.textContent = first[n.dataset.f]; });
    $rest.replaceChildren(...rest.map((p) => {
      const li = el('li', 'sight');
      const top = el('div', 'sight__top');
      const distTxt = mobile.matches ? `${p.dist} · ${p.walk}` : p.dist;
      top.append(el('span', 'display sight__num', p.num), el('span', 'sight__dist', distTxt));
      const desc = el('p', 'sight__desc');
      desc.append(el('b', null, p.area), ` — ${p.desc}`);
      li.append(top, el('h3', 'display sight__name', p.name), desc, el('span', 'sight__walk', p.walk));
      return li;
    }));

    // pubs
    $pubs.replaceChildren(...list.filter((p) => p.cat === 'pub').map((p) => {
      const li = el('li');
      const head = el('span', 'pub__head');
      head.append(el('b', 'pub__dist', p.dist), ' · ', el('b', null, p.name));
      const desc = el('span', 'pub__desc', mobile.matches ? p.desc : ` — ${p.desc}`);
      li.append(head, desc);
      return li;
    }));
  };

  const setStatus = (msg) => { $status.textContent = msg; };

  const pick = (id) => {
    if (id !== 'geo') {
      state.origin = id;
      setStatus('');
      render();
      return;
    }
    if (!('geolocation' in navigator)) {
      setStatus('La position n’est pas disponible ici. Choisis un point de départ.');
      return;
    }
    setStatus('Recherche de ta position…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.geo = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        state.origin = 'geo';
        const far = distKm(state.geo, TEMPLE) > 30;
        setStatus(far ? 'Position trouvée, mais tu es loin de Dublin : les distances sont depuis chez toi.' : 'Position trouvée.');
        render();
      },
      () => setStatus('Position refusée ou indisponible. Choisis un point de départ.'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  ORIGINS.forEach((o) => {
    const b = el('button', 'origin', o.label);
    b.type = 'button';
    b.dataset.id = o.id;
    b.addEventListener('click', () => pick(o.id));
    $origins.append(b);
  });
  render();
  mobile.addEventListener('change', render);

  /* ==========================================================
     Menu burger (mobile)
     ========================================================== */
  const burger = document.querySelector('.topbar__burger');
  const menu = document.getElementById('menu');

  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('menu-open') && !e.target.closest('.topbar, #menu')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  mobile.addEventListener('change', () => setMenu(false));

  /* ==========================================================
     Carte : cadrage mobile + survol liste <-> repères
     ========================================================== */
  const mapSvg = document.querySelector('.map__svg');
  const frameMap = () => mapSvg.setAttribute('viewBox', mobile.matches ? '80 80 760 460' : '0 0 1000 560');
  frameMap();
  mobile.addEventListener('change', frameMap);

  const hot = (ref, on) => {
    document.querySelectorAll(`[data-ref="${ref}"]`).forEach((n) => n.classList.toggle('is-hot', on));
  };
  document.querySelectorAll('.places li, .pin').forEach((n) => {
    n.addEventListener('mouseenter', () => hot(n.dataset.ref, true));
    n.addEventListener('mouseleave', () => hot(n.dataset.ref, false));
  });

  /* ==========================================================
     Raccourcis : puce active selon la section visible
     ========================================================== */
  const chips = [...document.querySelectorAll('.chip')];
  const sections = chips.map((c) => document.querySelector(c.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        chips.forEach((c) => {
          const active = c.getAttribute('href') === id;
          c.classList.toggle('chip--active', active);
          if (active) {
            c.setAttribute('aria-current', 'true');
            const bar = c.parentElement;
            bar.scrollTo({ left: c.offsetLeft - bar.clientWidth / 2 + c.offsetWidth / 2, behavior: 'smooth' });
          } else {
            c.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
  }
})();
