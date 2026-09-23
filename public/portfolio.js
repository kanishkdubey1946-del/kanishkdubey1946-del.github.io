
(() => {
 const menu = document.querySelector('.menu-toggle');
 const nav = document.querySelector('#primary-nav');
 const closeMenu = () => { menu?.setAttribute('aria-expanded','false'); nav?.classList.remove('is-open'); };
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 const navMedia=matchMedia('(min-width:851px)');
 navMedia.addEventListener('change',e=>{if(e.matches)closeMenu()});
 document.querySelectorAll('[data-archive]').forEach(archive=>{
   const items=[...archive.querySelectorAll('[data-item]')];
   const buttons=[...archive.querySelectorAll('[data-filter]')];
   const search=archive.querySelector('[data-search-input]');
   let active='All';
   const update=()=>{
     const query=(search?.value||'').trim().toLocaleLowerCase();
     let count=0;
     items.forEach(item=>{const visible=(active==='All'||item.dataset.category===active)&&(!query||(item.dataset.search||'').includes(query));item.hidden=!visible;if(visible)count++});
     const counter=archive.querySelector('[data-count]');
     if(counter)counter.textContent=count+' of '+items.length+' shown';
     const empty=archive.querySelector('[data-empty]');if(empty)empty.hidden=count!==0;
   };
   buttons.forEach(button=>button.addEventListener('click',()=>{
     active=button.dataset.filter;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();
   }));
   search?.addEventListener('input',update);update();
 });
 document.querySelector('[data-copy-email]')?.addEventListener('click',async e=>{
   const button=e.currentTarget;
   const status=document.querySelector('.copy-feedback');
   try{await navigator.clipboard.writeText(button.dataset.copyEmail);status.textContent='Email copied. Talk soon!';}
   catch{status.textContent='Copy isn’t available here. Select the email address above, or tap it to open your mail app.';}
 });
 const dialog=document.querySelector('.lightbox');
 let opener;
 document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{
   opener=button;dialog.querySelector('img').src=button.dataset.photo;
   dialog.querySelector('img').alt=button.dataset.alt;
   dialog.querySelector('p').textContent=button.dataset.caption||button.dataset.alt;
   dialog.showModal();
 }));
 dialog?.querySelector('button')?.addEventListener('click',()=>dialog.close());
 dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
 dialog?.addEventListener('close',()=>opener?.focus());
 const footer=document.querySelector('.footer-bottom');
 if(footer){
   const button=document.createElement('button');button.className='motion-toggle';button.type='button';
   let reduce=false;try{reduce=localStorage.getItem('portfolio-reduce-motion')==='true'}catch{}
   const sync=()=>{document.documentElement.dataset.reduceMotion=String(reduce);button.textContent=reduce?'Motion off':'Reduce motion';button.setAttribute('aria-pressed',String(reduce))};
   button.addEventListener('click',()=>{reduce=!reduce;try{localStorage.setItem('portfolio-reduce-motion',String(reduce))}catch{}sync()});
   footer.append(button);sync();
 }
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&document.documentElement.dataset.reduceMotion!=='true'&&'IntersectionObserver' in window){
   const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target)}}),{threshold:.08});
   document.querySelectorAll('.section-heading,.project-card,.diary-card,.profile-note,.about-stamp').forEach(el=>observer.observe(el));
 }
})();
