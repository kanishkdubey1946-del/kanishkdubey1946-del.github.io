(() => {
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;
  let cleanupCurrent = () => {};

  function initScrollMotion() {
    cleanupCurrent();
    const root = document.documentElement;
    const hero = document.querySelector('.hero');
    if (!hero) { root.classList.remove('orbit-enhanced'); return; }
    root.classList.add('motion-ready');
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const layers = [...document.querySelectorAll('.hero-layer')];
    const ticker = document.querySelector('.ticker-track');
    const fey = document.querySelector('.fey-project');
    const feyVisual = fey?.querySelector('.visual,.project-visual');
    const zoom = document.querySelector('.zoom-project');
    const zoomVisual = zoom?.querySelector('.visual,.project-visual');
    const mediaSection = document.querySelector('.scroll-media-project');
    const mediaVisual = mediaSection?.querySelector('.diagram,.diagram-body,img');
    const mediaFill = mediaSection?.querySelector('.scroll-media-fill');
    const mediaValue = mediaSection?.querySelector('.scroll-media-value');
    const spiral = document.querySelector('.spiral-scroll');
    const cards = [...document.querySelectorAll('.spiral-card')];
    const buttons = [...document.querySelectorAll('[data-orbit-target]')];
    const arrows = [...document.querySelectorAll('[data-orbit-step]')];
    const position = document.querySelector('.orbit-position');
    const controls = document.querySelector('.orbit-controls');
    const scene = document.querySelector('.spiral-scene');
    const horizontal = document.querySelector('.horizontal-scroll-section');
    const horizontalTrack = horizontal?.querySelector('.horizontal-track');
    const blocks = [...document.querySelectorAll('.text-reveal')];
    let frame = 0, previousTime = 0, width = 0, viewport = 0;
    let dirty = true, needsMeasure = true, mode = '', reduced = false, flat = false;
    let orbitCurrent = 0, orbitTarget = 0, orbitStarted = false, active = -1;
    let horizontalDistance = 0, tickerCycle = 1, pointerStart = null;
    const boxes = new Map();
    const disposers = [];
    const listen = (node, event, callback, options) => {
      node?.addEventListener(event, callback, options);
      disposers.push(() => node?.removeEventListener(event, callback, options));
    };

    blocks.forEach(block => {
      if (block.dataset.revealReady) return;
      const text = block.textContent.trim();
      block.dataset.revealReady = 'true';
      block.setAttribute('aria-label', text);
      const fragment = document.createDocumentFragment();
      text.split(/\s+/).forEach((word, index) => {
        if (index) fragment.appendChild(document.createTextNode(' '));
        const span = document.createElement('span');
        span.className = 'reveal-word';
        span.setAttribute('aria-hidden', 'true');
        span.textContent = word;
        fragment.appendChild(span);
      });
      block.replaceChildren(fragment);
    });
    const words = blocks.map(block => ({ block, nodes: [...block.querySelectorAll('.reveal-word')], count: -1 }));
    const progress = (element, scroll, sticky = false) => {
      const box = boxes.get(element);
      if (!box) return 0;
      return sticky ? clamp((scroll - box.top) / box.travel) : clamp((scroll + viewport - box.top) / (viewport + box.height));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const refresh = () => { dirty = true; needsMeasure = true; schedule(); };
    const reveal = (entry, count) => {
      if (entry.count === count) return;
      entry.nodes.forEach((word, index) => word.classList.toggle('is-revealed', index < count));
      entry.count = count;
    };

    function measure() {
      width = document.documentElement.clientWidth;
      viewport = innerHeight;
      reduced = media.matches || root.classList.contains('reduce');
      flat = reduced || viewport < 580;
      const nextMode = `${width <= 900}:${reduced}:${flat}`;
      if (nextMode !== mode) {
        root.classList.toggle('orbit-enhanced', !flat && cards.length > 0);
        root.classList.toggle('orbit-static', flat);
        [feyVisual, zoomVisual, mediaVisual, horizontalTrack, ticker, ...layers].forEach(node => { if (node) node.style.transform = ''; });
        if (mediaVisual) mediaVisual.style.clipPath = '';
        if (mediaFill) mediaFill.style.transform = 'scaleX(1)';
        if (mediaValue) mediaValue.textContent = '100%';
        if (flat) cards.forEach(card => { card.style.transform = ''; card.style.opacity = ''; card.style.zIndex = ''; });
        mode = nextMode;
        orbitStarted = false;
      }
      const headerHeight = parseFloat(getComputedStyle(root).getPropertyValue('--header-height')) || 0;
      [hero, fey, zoom, mediaSection, spiral, horizontal, ...blocks].filter(Boolean).forEach(element => {
        const rect = element.getBoundingClientRect();
        const stage = element.querySelector('.spiral-sticky,.horizontal-sticky');
        boxes.set(element, { top: scrollY + rect.top - (stage ? headerHeight : 0), height: rect.height, travel: Math.max(1, rect.height - (stage?.offsetHeight || viewport)) });
      });
      if (horizontalTrack) {
        const stage = horizontalTrack.parentElement;
        const style = getComputedStyle(stage);
        horizontalDistance = Math.max(0, horizontalTrack.scrollWidth - (stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)));
      }
      if (ticker) tickerCycle = Math.max(1, (ticker.scrollWidth + parseFloat(getComputedStyle(ticker).gap || 0)) / 2);
      needsMeasure = false;
    }

    function updateControls(index) {
      if (index === active) return;
      active = index;
      buttons.forEach((button, i) => i === index ? button.setAttribute('aria-current', 'step') : button.removeAttribute('aria-current'));
      arrows.forEach(button => { button.disabled = Number(button.dataset.orbitStep) < 0 ? index === 0 : index === cards.length - 1; });
      if (position) position.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')} — ${cards[index]?.querySelector('h3')?.textContent || ''}`;
    }

    function renderOrbit(delta) {
      if (!spiral || flat || !cards.length) return false;
      if (!orbitStarted) { orbitCurrent = orbitTarget; orbitStarted = true; }
      orbitCurrent += (orbitTarget - orbitCurrent) * (1 - Math.exp(-delta / 110));
      if (Math.abs(orbitTarget - orbitCurrent) < .00015) orbitCurrent = orbitTarget;
      const travel = orbitCurrent * (cards.length - 1);
      const spacing = width > 900 ? Math.min(420, width * .31) : Math.min(390, width * .85);
      cards.forEach((card, index) => {
        const offset = index - travel;
        const distance = Math.abs(offset);
        card.style.transform = `translate(-50%,-50%) translate3d(${offset * spacing}px,${Math.min(40, distance * 24)}px,${-Math.min(320, distance * 140)}px) rotateY(${clamp(offset, -2, 2) * -8}deg) scale(${Math.max(.79, 1 - distance * .08)})`;
        card.style.opacity = String(Math.max(0, 1 - distance * .42));
        card.style.zIndex = String(100 - Math.round(distance * 10));
      });
      updateControls(Math.round(travel));
      return orbitCurrent !== orbitTarget;
    }

    function render(time) {
      frame = 0;
      const delta = previousTime ? clamp(time - previousTime, 1, 50) : 16.67;
      previousTime = time;
      if (needsMeasure) measure();
      if (dirty) {
        const scroll = scrollY;
        orbitTarget = progress(spiral, scroll, true);
        if (flat || width <= 900) {
          words.forEach(entry => reveal(entry, entry.nodes.length));
        } else {
          const hp = clamp((scroll - (boxes.get(hero)?.top || 0)) / (boxes.get(hero)?.height || viewport));
          layers.forEach((layer,index) => { layer.style.transform = `translate3d(0,${hp * [24,62,118][index]}px,0) scale(${1.018 + hp * [.004,.014,.03][index]})`; });
          if (ticker) ticker.style.transform = `translate3d(${-((scroll * .16) % tickerCycle)}px,0,0)`;
          if (feyVisual) {
            const p = progress(fey, scroll);
            feyVisual.style.transform = `perspective(1400px) rotateX(${lerp(5,-2,p)}deg) rotateY(${lerp(-3,2,p)}deg) translateY(${lerp(22,-8,p)}px) scale(${lerp(.96,1,Math.sin(p*Math.PI))})`;
          }
          if (zoomVisual) zoomVisual.style.transform = `scale(${lerp(.9,1.02,clamp(progress(zoom,scroll)*1.2))})`;
          if (mediaVisual) {
            const shown = clamp((progress(mediaSection,scroll)-.05)/.52);
            mediaVisual.style.clipPath = `inset(0 ${100-shown*100}% 0 0 round 2px)`;
            mediaVisual.style.transform = `translate3d(${lerp(35,0,shown)}px,0,0)`;
            if (mediaFill) mediaFill.style.transform = `scaleX(${Math.max(.04,shown)})`;
            if (mediaValue) mediaValue.textContent = `${Math.round(shown*100)}%`;
          }
          words.forEach(entry => reveal(entry, Math.round(clamp((progress(entry.block,scroll)-.12)/.5)*entry.nodes.length)));
          if (horizontalTrack) horizontalTrack.style.transform = `translate3d(${-horizontalDistance*progress(horizontal,scroll,true)}px,0,0)`;
        }
        dirty = false;
      }
      if (renderOrbit(delta)) schedule();
      else previousTime = 0;
    }

    function goTo(index) {
      if (flat || !spiral) return;
      index = clamp(index, 0, cards.length - 1);
      const box = boxes.get(spiral);
      if (!box) return;
      window.scrollTo({ top: box.top + box.travel * index / Math.max(1,cards.length-1), behavior: 'smooth' });
    }
    buttons.forEach((button,index) => listen(button,'click',()=>goTo(index)));
    arrows.forEach(button => listen(button,'click',()=>goTo(Math.max(0,active)+Number(button.dataset.orbitStep))));
    listen(controls,'keydown',event => {
      const focused = buttons.indexOf(document.activeElement);
      if (focused < 0) return;
      let next;
      if (event.key === 'ArrowRight') next = clamp(focused + 1,0,buttons.length-1);
      if (event.key === 'ArrowLeft') next = clamp(focused - 1,0,buttons.length-1);
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length-1;
      if (next === undefined) return;
      event.preventDefault();
      buttons[next].focus({preventScroll:true});
      goTo(next);
    });
    listen(scene,'pointerdown',event => { pointerStart = {x:event.clientX,y:event.clientY}; });
    listen(scene,'pointerup',event => {
      if (!pointerStart) return;
      const dx = event.clientX-pointerStart.x, dy = event.clientY-pointerStart.y;
      pointerStart = null;
      if (Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.4) goTo(Math.max(0,active)+(dx<0?1:-1));
    });
    listen(scene,'pointercancel',()=>{pointerStart=null;});
    listen(window,'scroll',()=>{dirty=true;schedule();},{passive:true});
    listen(window,'resize',refresh,{passive:true});
    listen(document,'portfolio:motion-change',refresh);
    listen(media,'change',refresh);
    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);
    let disposed = false;
    document.fonts.ready.then(()=>{if(!disposed)refresh();});
    schedule();
    cleanupCurrent = () => {
      disposed = true;
      disposers.forEach(dispose=>dispose());
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }
  window.__initPortfolioScrollMotion = initScrollMotion;
  // React routes initialize after hydration; legacy HTML initializes on DOM ready.
  if (document.querySelector('.motion')) {
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initScrollMotion,{once:true});
    else initScrollMotion();
  }
  document.addEventListener('portfolio:route-ready',initScrollMotion);
})();
