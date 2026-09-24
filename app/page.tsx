import Link from 'next/link';
import { SplineScene } from '@/components/ui/splite';
import { site } from '@/lib/content';
import '../public/entry.css';

export default function EntrancePage() {
  return <main id="main" className="entry-page">
    <section className="entry-stage" aria-labelledby="entry-heading">
      <h1 id="entry-heading" className="entry-screenreader">Kanishk Dubey — student, developer, and builder</h1>
      <div className="entry-stage-glow" aria-hidden="true" />
      <div className="entry-robot" role="img" aria-label="Interactive 3D robot">
        <span className="entry-orbit entry-orbit-a" aria-hidden="true" />
        <span className="entry-orbit entry-orbit-b" aria-hidden="true" />
        <SplineScene scene={site.heroScene} className="entry-react-canvas" />
      </div>
      <a className="entry-scroll" href="#meet"><span>SCROLL TO MEET ME</span><span aria-hidden="true">↓</span></a>
    </section>
    <section className="entry-intro" id="meet" aria-labelledby="intro-heading">
      <div className="entry-intro-inner">
        <figure className="entry-portrait"><img src="/media/kanishk-presenting.jpg" alt="Kanishk Dubey presenting a project" width={1064} height={528} loading="lazy" /><figcaption>FROM AN IDEA TO A WORKING BUILD.</figcaption></figure>
        <div className="entry-copy">
          <p className="entry-kicker">THE PERSON BEHIND THE BUILDS <span>01 / 02</span></p>
          <h2 id="intro-heading">Hi, I’m <em>Kanishk.</em></h2>
          <p className="entry-lead">{site.person.bio}</p>
          <div className="entry-interests"><span>AI SYSTEMS</span><span>CONNECTED HARDWARE</span><span>WEB EXPERIENCES</span></div>
          <Link className="entry-enter" href="/portfolio"><span>Enter portfolio</span><span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  </main>;
}
