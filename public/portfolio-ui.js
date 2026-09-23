(() => {
  let disposeCurrent = () => {};
  function init() {
    disposeCurrent();
    const root = document.documentElement;
    const motion = document.querySelector('.motion');
    const menu = document.querySelector('.mobile-navigation');
    const copy = document.querySelector('[data-copy-email]');
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const cleanups = [];
    const listen = (target, name, handler, options) => {
      target?.addEventListener(name, handler, options);
      cleanups.push(() => target?.removeEventListener(name, handler, options));
    };
    if (motion) {
      let preferred = false;
      try { preferred = localStorage.getItem('portfolio-reduced-motion') === 'true'; } catch { /* Storage may be disabled. */ }
      const apply = () => {
        const reduced = media.matches || preferred;
        root.classList.toggle('reduce', reduced);
        motion.setAttribute('aria-pressed', String(reduced));
        motion.textContent = reduced ? 'MOTION REDUCED' : 'REDUCE MOTION';
        document.dispatchEvent(new CustomEvent('portfolio:motion-change', {detail:{reduced}}));
      };
      apply();
      listen(motion,'click',()=>{
        preferred = !root.classList.contains('reduce');
        try { localStorage.setItem('portfolio-reduced-motion',String(preferred)); } catch { /* Keep the setting for this page. */ }
        apply();
      });
      listen(media,'change',apply);
    }
    listen(menu,'click',event=>{if(event.target.closest('a')) menu.open=false;});
    listen(document,'keydown',event=>{
      if(event.key==='Escape' && menu?.open){ menu.open=false; menu.querySelector('summary')?.focus(); }
    });
    listen(document,'click',event=>{if(menu?.open && !menu.contains(event.target))menu.open=false;});
    let copyTimer;
    listen(copy,'click',async()=>{
      const message = document.querySelector('.copy-feedback');
      try {
        await navigator.clipboard.writeText(copy.dataset.copyEmail);
        copy.textContent='Copied ✓';
        if(message)message.textContent='Email address copied.';
        clearTimeout(copyTimer);
        copyTimer=setTimeout(()=>{copy.textContent='Copy email ↗';if(message)message.textContent='';},2600);
      } catch { if(message)message.textContent='Use the email link to get in touch.'; }
    });
    const links = [...document.querySelectorAll('.nav a[href^="#"],.index a[href^="#"]')];
    const linked = links.map(link=>({link,section:document.getElementById(link.hash.slice(1))})).filter(item=>item.section);
    let frame=0;
    const update=()=>{
      frame=0;
      const max=document.documentElement.scrollHeight-innerHeight;
      root.style.setProperty('--reading-progress',String(max>0?Math.min(1,Math.max(0,scrollY/max)):0));
      for(const container of ['.nav','.index']) {
        const items=linked.filter(item=>item.link.closest(container));
        const current=items.filter(item=>item.section.getBoundingClientRect().top<=innerHeight*.4).at(-1);
        items.forEach(item=>item===current?item.link.setAttribute('aria-current','location'):item.link.removeAttribute('aria-current'));
      }
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    listen(window,'scroll',schedule,{passive:true});
    listen(window,'resize',schedule,{passive:true});
    schedule();
    // Preserve old inbound links to the former contact-section anchor.
    if(location.hash==='#notes' && !document.getElementById('notes')) document.getElementById('contact')?.scrollIntoView();
    disposeCurrent=()=>{cleanups.forEach(cleanup=>cleanup());clearTimeout(copyTimer);if(frame)cancelAnimationFrame(frame);};
  }
  // React routes initialize after hydration; legacy HTML initializes on DOM ready.
  if (document.querySelector('.motion')) {
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
    else init();
  }
  document.addEventListener('portfolio:route-ready',init);
})();
