import { Application } from 'https://unpkg.com/@splinetool/runtime@2.0.57/build/runtime.js';

const canvas = document.querySelector('[data-spline-scene]');

if (canvas instanceof HTMLCanvasElement && canvas.dataset.splineScene) {
  const app = new Application(canvas, {
    renderer: 'webgl',
    renderMode: 'auto',
    htmlContentMode: 'none',
  });
  app.load(canvas.dataset.splineScene).then(() => {
    app.setBackgroundColor('#ffffff');
    document.documentElement.classList.add('entry-scene-ready');
  }).catch(() => {
    document.documentElement.classList.add('entry-scene-error');
  });
  window.addEventListener('pagehide', () => app.dispose(), { once: true });
}
