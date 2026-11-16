(() => {
  const mobile = window.matchMedia('(max-width: 760px)');

  /* ==========================================================
     Données
     ========================================================== */
  const PLACES = [
    // culturel
    { cat: 'voir', name: 'Guinness Storehouse', q: 'Guinness Storehouse, Dublin', area: 'the liberties', desc: 'la brasserie et son gravity bar, vue à 360° sur la ville.', lat: 53.3419, lng: -6.2867 },
    { cat: 'voir', name: 'National Gallery', q: 'National Gallery of Ireland, Dublin', area: 'merrion square', desc: 'les maîtres irlandais et européens. gratuit.', lat: 53.3409, lng: -6.2525 },
    { cat: 'voir', name: 'Kilmainham Gaol', q: 'Kilmainham Gaol, Dublin', area: 'kilmainham', desc: 'l\'ancienne prison de 1916. complet vite, à réserver.', lat: 53.3419, lng: -6.3097 },
    { cat: 'voir', name: 'Trinity · Book of Kells', q: 'Book of Kells, Trinity College Dublin', area: 'trinity college', desc: 'le campus, la long room et le book of kells. réserver avant.', lat: 53.3438, lng: -6.2546 },
    { cat: 'voir', name: 'Dublin Castle', q: 'Dublin Castle, Dublin', area: 'dame street', desc: 'le château, ses cours et la chapelle royale.', lat: 53.3429, lng: -6.2674 },
    { cat: 'voir', name: "St Patrick's Cathedral", q: "St Patrick's Cathedral, Dublin", area: 'the liberties', desc: 'la cathédrale nationale et son jardin.', lat: 53.3395, lng: -6.2715 },
    { cat: 'voir', name: 'Jameson Distillery', q: 'Jameson Distillery Bow St, Dublin', area: 'smithfield', desc: 'visite de la distillerie et dégustation de whiskey.', lat: 53.3486, lng: -6.2772 },
    { cat: 'voir', name: "Marsh's Library", q: "Marsh's Library, Dublin", area: "derrière st patrick's", desc: 'bibliothèque de 1707, restée dans son jus.', lat: 53.3393, lng: -6.2707 },
    { cat: 'voir', name: 'RHA Gallery', q: 'RHA Gallery, Ely Place, Dublin', area: 'ely place', desc: 'le futur de l\'art irlandais. gratuit.', lat: 53.3369, lng: -6.2537 },
    // balades
    { cat: 'balade', name: 'Grafton Street', q: 'Grafton Street, Dublin', desc: 'la rue piétonne et ses musiciens de rue.', lat: 53.3416, lng: -6.2600 },
    { cat: 'balade', name: "George's St Arcade", q: "George's Street Arcade, Dublin", desc: 'marché couvert victorien : fripes, disques, stands.', lat: 53.3427, lng: -6.2639 },
    { cat: 'balade', name: "St Stephen's Green", q: "St Stephen's Green, Dublin", desc: 'le parc au bout de grafton street.', lat: 53.3382, lng: -6.2591 },
    { cat: 'balade', name: 'Love Lane', q: 'Crampton Court, Dublin', desc: 'la ruelle aux mosaïques de cœurs, dans temple bar.', lat: 53.3448, lng: -6.2654 },
    // pubs
    { cat: 'pub', name: 'The Temple Bar', q: 'The Temple Bar pub, Dublin', desc: 'le pub rouge le plus photographié. cher, mais à faire une fois.', lat: 53.3455, lng: -6.2643 },
    { cat: 'pub', name: 'The Cobblestone', q: 'The Cobblestone pub, Smithfield, Dublin', desc: 'session trad tous les soirs.', lat: 53.3486, lng: -6.2779 },
    { cat: 'pub', name: 'Dame Lane', q: 'Dame Lane, Dublin', desc: 'une ruelle de bars, ambiance le week-end.', lat: 53.3437, lng: -6.2645 },
    { cat: 'pub', name: 'Caribou', q: 'Caribou, 30 Stephen Street Lower, Dublin', desc: 'plus fashion : cocktails et bonne cuisine.', lat: 53.3418, lng: -6.2655 },
    { cat: 'pub', name: "O'Donoghue's", q: "O'Donoghue's pub, Merrion Row, Dublin", desc: 'là où les dubliners ont commencé. trad le soir.', lat: 53.3385, lng: -6.2526 },
    { cat: 'pub', name: 'Doheny & Nesbitt', q: 'Doheny & Nesbitt, Baggot Street, Dublin', desc: 'pub victorien, bois sombre et snugs.', lat: 53.3377, lng: -6.2508 },
    { cat: 'pub', name: 'The Brazen Head', q: 'The Brazen Head, Dublin', desc: 'le plus vieux pub de dublin, depuis 1198.', lat: 53.3446, lng: -6.2763 },
    // la nuit
    { cat: 'nuit', fav: true, kind: 'bar de nuit', name: 'McGowans of Phibsboro', q: 'McGowans of Phibsboro, Dublin', desc: 'le classique pour finir la soirée, au nord. en taxi.', lat: 53.3594, lng: -6.2725 },
    { cat: 'nuit', kind: 'bar de nuit', name: 'Fidelity', q: 'Fidelity Bar, 79 Queen Street, Dublin', desc: 'bar de nuit et studio, à smithfield.', lat: 53.3473, lng: -6.2776 },
    { cat: 'nuit', kind: 'live', name: "Arthur's Blues & Jazz", q: "Arthur's Pub, Thomas Street, Dublin", desc: 'blues et jazz en live, thomas street.', lat: 53.3432, lng: -6.2797 },
    { cat: 'nuit', fav: true, kind: 'club', name: 'Pawn Shop', q: 'Pawnshop, 15 Dame Street, Dublin', desc: 'club en sous-sol sur dame street, jusqu\'à 3 h.', lat: 53.3443, lng: -6.2632 },
    { cat: 'nuit', kind: 'club', name: 'Copper Face Jacks', q: 'Copper Face Jacks, Harcourt Street, Dublin', desc: 'la boîte institution de harcourt street.', lat: 53.3353, lng: -6.2640 },
    { cat: 'nuit', kind: 'club', name: 'Hyde', q: 'Hyde, 9 Lemon Street, Dublin', desc: 'cocktails et rooftop entre grafton et dawson. 21 ans et +.', lat: 53.3409, lng: -6.2593 },
    // manger
    { cat: 'manger', name: 'The Liberty Belle', q: 'The Liberty Belle, 33 Francis Street, Dublin', desc: 'pinte + sandwich pour 8 €.', lat: 53.3405, lng: -6.2741 },
    { cat: 'manger', name: 'The Woollen Mills', q: 'The Woollen Mills, Ormond Quay, Dublin', desc: 'cuisine irlandaise traditionnelle.', lat: 53.3463, lng: -6.2641 },
    { cat: 'manger', name: 'Loose Canon', q: 'Loose Canon, Drury Street, Dublin', desc: 'plus typé snack : fromage, vin, sandwichs.', lat: 53.3419, lng: -6.2634 },
    { cat: 'manger', name: '777', q: "777, South Great George's Street, Dublin", desc: 'resto / bar.', lat: 53.3428, lng: -6.2650 },
    // shopping
    { cat: 'shop', name: 'Oxfam', q: "Oxfam, South Great George's Street, Dublin", desc: 'seconde main en tout genre, rayon vintage.', lat: 53.3433, lng: -6.2647 },
    { cat: 'shop', name: 'Books Upstairs', q: "Books Upstairs, D'Olier Street, Dublin", desc: 'librairie indépendante, café à l\'étage.', lat: 53.3460, lng: -6.2585 },
    { cat: 'shop', name: "Stephen's Green Mall", q: "Stephen's Green Shopping Centre, Dublin", desc: 'le centre commercial sous verrière, en haut de grafton street.', lat: 53.3396, lng: -6.2617 },
    // bonus
    { cat: 'bonus', name: 'Stella Cinema', q: 'Stella Cinema, Rathmines, Dublin', area: 'rathmines', desc: 'salle mythique art déco, fauteuils en cuir et cocktails. réserver.', lat: 53.3229, lng: -6.2648 },
  ].map((p, i) => ({ ...p, ref: i + 1, num: String(i + 1).padStart(2, '0') }));

  // Hôtel : Staycity Aparthotels Dublin City Quay, 33-34 Moss Street
  const QG = { lat: 53.3467, lng: -6.2497 };

  const ORIGINS = [
    { id: 'geo', label: 'Ma position' },
    { id: 'qg', label: 'L\'hôtel', ...QG },
    { id: 'temple', label: 'Temple Bar', lat: 53.3455, lng: -6.2643 },
    { id: 'trinity', label: 'Trinity', lat: 53.3438, lng: -6.2546 },
    { id: 'green', label: "St Stephen's Green", lat: 53.3382, lng: -6.2591 },
  ];
  const HOME = ORIGINS.find((o) => o.id === 'qg');
  const CAT_LABEL = { voir: 'à voir', balade: 'balade', pub: 'pub', nuit: 'la nuit', manger: 'manger', shop: 'shopping', bonus: 'bonus' };
  const LEGEND = ['voir', 'balade', 'pub', 'nuit', 'manger', 'shop'];

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

  // Lien Google Maps en mode itinéraire (départ = position actuelle de l'utilisateur)
  const mapsUrl = (q, mode = 'walking') =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}&travelmode=${mode}`;
  const go = (p, cls) => {
    const a = el('a', `go go--stretch${cls ? ` ${cls}` : ''}`, p.name);
    a.href = mapsUrl(p.q || `${p.name}, Dublin`);
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = `Itinéraire vers ${p.name}`;
    return a;
  };

  const $origins = document.getElementById('origins');
  const $status = document.getElementById('status');
  const $nearest = document.getElementById('nearest');
  const $first = document.getElementById('sight-first');
  const $rest = document.getElementById('sight-rest');
  const $pubs = document.getElementById('pubs-list');
  const $nuit = document.getElementById('nuit-list');
  const $balades = document.getElementById('balades-list');
  const $shop = document.getElementById('shop-list');
  const $bonus = document.getElementById('bonus');

  const state = { origin: 'qg', geo: null };

  // carte de lieu (balades, shopping)
  const card = (p) => {
    const li = el('li', 'card has-go');
    const top = el('div', 'card__top');
    top.append(el('span', `num num--${p.cat}`, String(p.ref)), el('span', 'card__dist', `${p.dist} · ${p.walk}`));
    const name = el('h3', 'display card__name');
    name.append(go(p));
    li.append(top, name, el('p', 'card__desc', p.desc));
    return li;
  };

  // ligne de liste (dans le coin, la nuit)
  const row = (p, label) => {
    const li = el('li', `has-go${p.fav ? ' is-fav' : ''}`);
    const main = el('div', 'nearest__main');
    main.append(el('span', 'nearest__cat', label), go(p, 'display nearest__name'));
    const dist = el('span', 'nearest__dist');
    dist.append(el('b', null, p.dist), el('span', null, p.walk));
    li.append(main, dist);
    if (p.desc && label !== CAT_LABEL[p.cat]) li.append(el('p', 'nearest__desc', p.desc));
    return li;
  };

  const render = () => {
    const from = state.origin === 'geo' ? state.geo : ORIGINS.find((o) => o.id === state.origin);
    const list = PLACES.map((p) => {
      const d = distKm(from || HOME, p);
      return { ...p, d, dist: fmtDist(d), walk: fmtWalk(d) };
    }).sort((a, b) => a.d - b.d);
    const of = (cat) => list.filter((p) => p.cat === cat);

    // boutons de départ
    $origins.querySelectorAll('.origin').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === state.origin)));

    // les 5 plus proches
    $nearest.replaceChildren(...list.slice(0, 5).map((p) => row(p, CAT_LABEL[p.cat])));

    // à voir
    const [first, ...rest] = of('voir');
    $first.querySelectorAll('[data-f]').forEach((n) => { n.textContent = first[n.dataset.f]; });
    $first.querySelector('.featured__name').replaceChildren(go(first));
    $rest.replaceChildren(...rest.map((p) => {
      const li = el('li', 'sight has-go');
      const top = el('div', 'sight__top');
      const distTxt = mobile.matches ? `${p.dist} · ${p.walk}` : p.dist;
      top.append(el('span', 'display sight__num', p.num), el('span', 'sight__dist', distTxt));
      const desc = el('p', 'sight__desc');
      desc.append(el('b', null, p.area), ` — ${p.desc}`);
      li.append(top, el('h3', 'display sight__name'), desc, el('span', 'sight__walk', p.walk));
      li.querySelector('.sight__name').append(go(p));
      return li;
    }));

    // balades, shopping, bonus
    $balades.replaceChildren(...of('balade').map(card));
    $shop.replaceChildren(...of('shop').map(card));
    const [stella] = of('bonus');
    const bonusName = el('h3', 'display bonus__name');
    bonusName.append(go(stella));
    $bonus.replaceChildren(
      el('span', 'bonus__tag', 'BONUS · CINÉMA'),
      bonusName,
      el('p', 'bonus__desc', `${stella.area} — ${stella.desc}`),
      el('span', 'bonus__dist', `${stella.dist} · ${stella.walk} · ou bus 15 / 140`),
    );

    // pubs
    $pubs.replaceChildren(...of('pub').map((p) => {
      const li = el('li', 'has-go');
      const head = el('span', 'pub__head');
      head.append(el('b', 'pub__dist', p.dist), ' · ', go(p));
      const desc = el('span', 'pub__desc', mobile.matches ? p.desc : ` — ${p.desc}`);
      li.append(head, desc);
      return li;
    }));

    // la nuit
    $nuit.replaceChildren(...of('nuit').map((p) => row(p, `${p.fav ? '★ ' : ''}${p.kind}`)));
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
        const far = distKm(state.geo, HOME) > 30;
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
     Carte : repères générés depuis les coordonnées
     ========================================================== */
  const SVGNS = 'http://www.w3.org/2000/svg';
  const svg = (tag, attrs) => {
    const n = document.createElementNS(SVGNS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
  };
  // projection simple centrée sur le centre-ville (≈ 172 px par km)
  const project = (p) => ({ x: 500 + (p.lng + 6.280) * 11438, y: 280 - (p.lat - 53.347) * 19126 });

  const $pins = document.getElementById('pins');
  const $places = document.getElementById('places');
  const $legend = document.getElementById('legend');

  // position réelle, puis écartement des repères qui se chevauchent
  const pos = PLACES.map((p) => {
    const { x, y } = project(p);
    return { x0: x, y0: y, x, y, on: x > 12 && x < 988 && y > 12 && y < 548 };
  });
  const HOTEL = { x: 846, y: 286 };
  const GAP = 26;
  for (let it = 0; it < 120; it += 1) {
    pos.forEach((a, i) => {
      if (!a.on) return;
      pos.forEach((b, j) => {
        if (j <= i || !b.on) return;
        let dx = b.x - a.x, dy = b.y - a.y;
        let d = Math.hypot(dx, dy);
        if (d >= GAP) return;
        if (d < 0.01) { dx = Math.cos(i + j); dy = Math.sin(i + j); d = 1; }
        const push = (GAP - d) / 2;
        a.x -= (dx / d) * push; a.y -= (dy / d) * push;
        b.x += (dx / d) * push; b.y += (dy / d) * push;
      });
      const hx = a.x - HOTEL.x, hy = a.y - HOTEL.y, hd = Math.hypot(hx, hy);
      if (hd < 34) { a.x = HOTEL.x + (hx / (hd || 1)) * 34; a.y = HOTEL.y + (hy / (hd || 1)) * 34; }
    });
  }
  const $leaders = svg('g', { class: 'map__leaders' });
  $pins.before($leaders);

  PLACES.forEach((p, i) => {
    const { x, y, x0, y0, on: onMap } = pos[i];

    if (onMap) {
      if (Math.hypot(x - x0, y - y0) > 6) {
        $leaders.append(
          svg('line', { x1: x0.toFixed(1), y1: y0.toFixed(1), x2: x.toFixed(1), y2: y.toFixed(1) }),
          svg('circle', { cx: x0.toFixed(1), cy: y0.toFixed(1), r: 2.5 }),
        );
      }
      const a = svg('a', { href: mapsUrl(p.q), target: '_blank', rel: 'noopener', 'aria-label': `Itinéraire vers ${p.name}` });
      const g = svg('g', { class: `pin pin--${p.cat}`, 'data-ref': p.ref });
      const title = svg('title');
      title.textContent = p.name;
      const t = svg('text', { x: x.toFixed(1), y: (y + 1).toFixed(1) });
      t.textContent = p.ref;
      g.append(title, svg('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 12 }), t);
      a.append(g);
      $pins.append(a);
    }

    const li = el('li');
    li.dataset.ref = p.ref;
    const a = el('a', 'go places__link');
    a.href = mapsUrl(p.q);
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = `Itinéraire vers ${p.name}`;
    a.append(el('span', `num num--${p.cat}`, String(p.ref)), p.name);
    if (!onMap) a.append(el('span', 'places__off', ' (hors carte)'));
    li.append(a);
    $places.append(li);
  });

  LEGEND.forEach((cat) => {
    const item = el('span', 'legend__item');
    item.append(el('span', `dot dot--${cat}`), CAT_LABEL[cat]);
    $legend.append(item);
  });
  const qgItem = el('span', 'legend__item');
  qgItem.append(el('span', 'dot dot--qg'), 'l\'hôtel');
  $legend.append(qgItem);

  const mapSvg = document.querySelector('.map__svg');
  const frameMap = () => mapSvg.setAttribute('viewBox', mobile.matches ? '360 150 560 380' : '0 0 1000 560');
  frameMap();
  mobile.addEventListener('change', frameMap);

  const hot = (ref, on) => {
    document.querySelectorAll(`.places [data-ref="${ref}"], .pin[data-ref="${ref}"]`).forEach((n) => n.classList.toggle('is-hot', on));
  };
  document.querySelectorAll('.places li, .pin').forEach((n) => {
    n.addEventListener('mouseenter', () => hot(n.dataset.ref, true));
    n.addEventListener('mouseleave', () => hot(n.dataset.ref, false));
  });

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
