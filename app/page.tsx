import { SplineScene } from '@/components/ui/splite';
import { site } from '@/lib/content';
import '../public/entry.css';

export default function EntrancePage() {
  return <main id="main" className="entry-page">
    <h1 className="entry-screenreader">Kanishk Dubey portfolio entrance</h1>
    <div className="entry-robot" role="img" aria-label="Animated 3D robot"><SplineScene scene={site.heroScene} className="entry-react-canvas" /></div>
    <div className="entry-overlay">
      <div className="entry-identity" aria-hidden="true">
        <strong>Kanishk Dubey</strong>
        <span>Student · Developer · Builder</span>
      </div>
      <a className="entry-enter" href="/portfolio/" aria-label="Enter Kanishk Dubey's portfolio"><span>Enter portfolio</span><span aria-hidden="true">↗</span></a>
    </div>
  </main>;
}
