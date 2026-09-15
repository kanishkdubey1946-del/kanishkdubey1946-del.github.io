(() => {
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;
  let cleanupCurrent = () => {};

  function initScrollMotion() {
    cleanupCurrent();
    const hero = document.querySelector('.hero');
    if (!hero) return;

    document.documentElement.classList.add('motion-ready');
    const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
    const layers = [...document.querySelectorAll('.hero-layer')];
    const ticker = document.querySelector('.ticker-track');
    const feyVisual = document.querySelector('.fey-project .visual, .fey-project .project-visual');
    const zoomVisual = document.querySelector('.zoom-project .visual, .zoom-project .project-visual');
    const mediaSection = document.querySelector('.scroll-media-project');
    const mediaVisual = mediaSection?.querySelector('.diagram, img');
    const mediaFill = mediaSection?.querySelector('.scroll-media-fill');
    const mediaValue = mediaSection?.querySelector('.scroll-media-value');
    const spiralSection = document.querySelector('.spiral-scroll');
    const spiralCards = [...document.querySelectorAll('.spiral-card')];
    const spiralDots = [...document.querySelectorAll('.spiral-progress i')];
    const horizontalSection = document.querySelector('.horizontal-scroll-section');
    const horizontalTrack = horizontalSection?.querySelector('.horizontal-track');
    const revealBlocks = [...document.querySelectorAll('.text-reveal')];
    let frame = 0;
    let spiralCurrent = 0;
    let spiralStarted = false;

    revealBlocks.forEach(block => {
      if (block.dataset.revealReady) return;
      const text = block.textContent.trim();
      const words = text.split(/\s+/);
      block.dataset.revealReady = 'true';
      block.setAttribute('aria-label', text);
      block.innerHTML = words.map(word => `<span class="reveal-word" aria-hidden="true">${word}</span>`).join(' ');
    });

    const revealWords = revealBlocks.map(block => ({ block, words: [...block.querySelectorAll('.reveal-word')] }));
    const reduced = () => mediaQuery.matches || document.documentElement.classList.contains('reduce');
    const viewProgress = element => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      return clamp((innerHeight - rect.top) / (innerHeight + rect.height));
    };
    const stickyProgress = element => {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - innerHeight);
      return clamp(-rect.top / distance);
    };

    function resetMotion() {
      layers.forEach(layer => { layer.style.transform = ''; });
      if (ticker) ticker.style.transform = '';
      [feyVisual, zoomVisual, mediaVisual, horizontalTrack].forEach(node => { if (node) node.style.transform = ''; });
      if (mediaVisual) mediaVisual.style.clipPath = '';
      if (mediaFill) mediaFill.style.transform = 'scaleX(1)';
      if (mediaValue) mediaValue.textContent = '100%';
      revealWords.forEach(({ words }) => words.forEach(word => word.classList.add('is-revealed')));
      spiralCards.forEach(card => { card.style.transform = ''; card.style.opacity = '1'; card.style.zIndex = ''; });
      spiralDots.forEach((dot, index) => dot.classList.toggle('is-active', index === 0));
    }

    function renderSpiral() {
      if (!spiralSection || !spiralCards.length) return false;
      const target = stickyProgress(spiralSection);
      if (!spiralStarted) { spiralCurrent = target; spiralStarted = true; }
      const difference = target - spiralCurrent;
      spiralCurrent += difference * .14;
      if (Math.abs(difference) < .0002) spiralCurrent = target;

      const travel = spiralCurrent * (spiralCards.length - 1);
      const spacing = innerWidth > 900 ? Math.min(470, innerWidth * .34) : innerWidth * .84;
      spiralCards.forEach((card, index) => {
        const offset = index - travel;
        const distance = Math.abs(offset);
        const x = offset * spacing;
        const y = Math.min(70, distance * 30);
        const z = -Math.min(360, distance * 150);
        const rotate = clamp(offset, -2, 2) * -12;
        const scale = Math.max(.76, 1 - distance * .1);
        card.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) rotateY(${rotate}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(.12, 1 - distance * .44));
        card.style.zIndex = String(100 - Math.round(distance * 10));
      });
      const active = Math.min(spiralCards.length - 1, Math.round(travel));
      spiralDots.forEach((dot, index) => dot.classList.toggle('is-active', index === active));
      return Math.abs(difference) > .0002;
    }

    function render() {
      frame = 0;
      if (reduced()) { resetMotion(); return; }

      if (innerWidth <= 900) {
        layers.forEach(layer => { layer.style.transform = ''; });
        [feyVisual, zoomVisual, mediaVisual, horizontalTrack].forEach(node => { if (node) node.style.transform = ''; });
        if (mediaVisual) mediaVisual.style.clipPath = '';
        if (mediaFill) mediaFill.style.transform = 'scaleX(1)';
        if (mediaValue) mediaValue.textContent = '100%';
        revealWords.forEach(({ words }) => words.forEach(word => word.classList.add('is-revealed')));
        const keepDrawing = renderSpiral();
        if (keepDrawing) frame = requestAnimationFrame(render);
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const heroP = clamp(-heroRect.top / Math.max(1, heroRect.height));
      layers.forEach((layer, index) => {
        const depth = [24, 62, 118][index] || 24;
        const scale = 1.018 + heroP * ([.004, .014, .03][index] || .004);
        layer.style.transform = `translate3d(0, ${heroP * depth}px, ${index * 2}px) scale(${scale})`;
      });

      if (ticker) {
        const half = ticker.scrollWidth / 2;
        ticker.style.transform = `translate3d(${-((scrollY * .2) % Math.max(1, half))}px,0,0)`;
      }

      if (feyVisual) {
        const p = viewProgress(feyVisual);
        const focus = Math.sin(p * Math.PI);
        feyVisual.style.transform = `perspective(1400px) rotateX(${lerp(8, -4, p)}deg) rotateY(${lerp(-5, 3, p)}deg) translateY(${lerp(32, -12, p)}px) scale(${lerp(.94, 1, focus)})`;
      }

      if (zoomVisual) {
        const p = viewProgress(zoomVisual);
        zoomVisual.style.transform = `scale(${lerp(.82, 1.045, clamp(p * 1.15))})`;
      }

      if (mediaSection && mediaVisual) {
        const p = viewProgress(mediaSection);
        const shown = clamp((p - .12) / .7);
        mediaVisual.style.clipPath = `inset(0 ${100 - shown * 100}% 0 0 round 2px)`;
        mediaVisual.style.transform = `translate3d(${lerp(70, 0, shown)}px,0,0) scale(${lerp(1.08, 1, shown)})`;
        if (mediaFill) mediaFill.style.transform = `scaleX(${Math.max(.04, shown)})`;
        if (mediaValue) mediaValue.textContent = `${Math.round(shown * 100)}%`;
      }

      revealWords.forEach(({ block, words }) => {
        const p = viewProgress(block);
        const count = Math.round(clamp((p - .18) / .56) * words.length);
        words.forEach((word, index) => word.classList.toggle('is-revealed', index < count));
      });

      const keepDrawingSpiral = renderSpiral();

      if (horizontalSection && horizontalTrack) {
        const p = stickyProgress(horizontalSection);
        const available = Math.max(0, horizontalTrack.scrollWidth - (innerWidth - parseFloat(getComputedStyle(horizontalSection).paddingLeft || 0)));
        horizontalTrack.style.transform = `translate3d(${-available * p}px,0,0)`;
      }

      if (keepDrawingSpiral) frame = requestAnimationFrame(render);
    }

    const requestRender = () => { if (!frame) frame = requestAnimationFrame(render); };
    const onMotionChange = () => requestRender();
    addEventListener('scroll', requestRender, { passive: true });
    addEventListener('resize', requestRender, { passive: true });
    addEventListener('portfolio:motion-change', onMotionChange);
    mediaQuery.addEventListener('change', requestRender);
    requestRender();

    cleanupCurrent = () => {
      removeEventListener('scroll', requestRender);
      removeEventListener('resize', requestRender);
      removeEventListener('portfolio:motion-change', onMotionChange);
      mediaQuery.removeEventListener('change', requestRender);
      if (frame) cancelAnimationFrame(frame);
    };
  }

  window.__initPortfolioScrollMotion = initScrollMotion;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initScrollMotion, { once: true });
  else initScrollMotion();
  addEventListener('portfolio:route-ready', initScrollMotion);
})();
