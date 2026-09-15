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
    const tedySection = document.querySelector('.tedy-scroll');
    const tedyOrbit = tedySection?.querySelector('.tedy-orbit');
    const tedyLabels = [...document.querySelectorAll('.tedy-core, .tedy-satellite')];
    const tedySteps = [...document.querySelectorAll('.tedy-step')];
    const spiralSection = document.querySelector('.spiral-scroll');
    const spiralCards = [...document.querySelectorAll('.spiral-card')];
    const horizontalSection = document.querySelector('.horizontal-scroll-section');
    const horizontalTrack = horizontalSection?.querySelector('.horizontal-track');
    const revealBlocks = [...document.querySelectorAll('.text-reveal')];
    let frame = 0;

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
      [feyVisual, zoomVisual, mediaVisual, tedyOrbit, horizontalTrack].forEach(node => { if (node) node.style.transform = ''; });
      tedyLabels.forEach(label => { label.style.transform = ''; });
      if (mediaVisual) mediaVisual.style.clipPath = '';
      if (mediaFill) mediaFill.style.transform = 'scaleX(1)';
      if (mediaValue) mediaValue.textContent = '100%';
      revealWords.forEach(({ words }) => words.forEach(word => word.classList.add('is-revealed')));
      tedySteps.forEach((step, index) => step.classList.toggle('is-active', index === tedySteps.length - 1));
      spiralCards.forEach(card => { card.style.transform = ''; card.style.opacity = '1'; card.style.zIndex = ''; });
    }

    function render() {
      frame = 0;
      if (reduced() || innerWidth <= 900) { resetMotion(); return; }

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

      if (tedySection && tedyOrbit) {
        const p = stickyProgress(tedySection);
        tedyOrbit.style.transform = `rotate(${p * 300}deg) rotateX(${lerp(64, 48, p)}deg) scale(${lerp(.82, 1.04, Math.sin(p * Math.PI))})`;
        tedyLabels.forEach(label => { label.style.transform = `rotate(${-p * 300}deg)`; });
        const active = Math.min(tedySteps.length - 1, Math.floor(p * tedySteps.length));
        tedySteps.forEach((step, index) => step.classList.toggle('is-active', index === active));
      }

      if (spiralSection && spiralCards.length) {
        const p = stickyProgress(spiralSection);
        spiralCards.forEach((card, index) => {
          const angle = (index / spiralCards.length) * Math.PI * 2 + p * Math.PI * 2.35;
          const radius = lerp(310, 225, p);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * .38 + (index - 2) * 22;
          const z = Math.sin(angle) * 260;
          const scale = lerp(.78, 1.08, (z + 260) / 520);
          card.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) rotateY(${(-angle * 180 / Math.PI) + 90}deg) scale(${scale})`;
          card.style.opacity = String(lerp(.38, 1, (z + 260) / 520));
          card.style.zIndex = String(Math.round(z + 300));
        });
      }

      if (horizontalSection && horizontalTrack) {
        const p = stickyProgress(horizontalSection);
        const available = Math.max(0, horizontalTrack.scrollWidth - (innerWidth - parseFloat(getComputedStyle(horizontalSection).paddingLeft || 0)));
        horizontalTrack.style.transform = `translate3d(${-available * p}px,0,0)`;
      }
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
