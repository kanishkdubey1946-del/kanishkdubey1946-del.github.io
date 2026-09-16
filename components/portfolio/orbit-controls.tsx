const practices = ['AI systems', 'Web products', 'Hardware', 'Research', 'Systems thinking'];

export function OrbitControls() {
  return <div className="orbit-controls" role="group" aria-label="Explore connected practices">
    <button type="button" className="orbit-arrow" data-orbit-step="-1" aria-label="Previous practice">←</button>
    <div className="orbit-steps">{practices.map((name, index) => <button type="button" key={name} data-orbit-target={index} aria-label={`Show ${name}`} aria-current={index === 0 ? 'step' : undefined}><span>0{index + 1}</span></button>)}</div>
    <button type="button" className="orbit-arrow" data-orbit-step="1" aria-label="Next practice">→</button>
    <span className="orbit-position" aria-live="polite" aria-atomic="true">01 / 05 — AI systems</span>
  </div>;
}
