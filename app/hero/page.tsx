import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { site } from '@/lib/content';

export const metadata = { title: 'Interactive Hero — Kanishk Dubey' };

export default function HeroPage() {
 return <main id="main">
  <section className="hero hero-with-spline" aria-labelledby="hero-title">

    <div className="hero-shade"/>
    <div className="hero-content"><div className="eyebrow hero-eyebrow"><span className="signal-cross">✳</span> AI · HARDWARE · HUMAN CURIOSITY</div><h1 id="hero-title"><span>Ideas, made</span><span><em>tangible.</em></span></h1><p>{site.person.intro}</p><div className="hero-actions"><Link href="/projects" className="pill-button">Explore my work <ArrowDown size={17}/></Link><a className="hero-resume" href={site.person.resume} download>Download résumé <ArrowUpRight size={15}/></a></div></div>
    <div className="hero-react-spline" aria-label="Interactive 3D scene"><div className="hero-react-spline-top"><span><i/> AN INTERACTIVE SPACE</span><span>MOVE TO EXPLORE ↗</span></div><div className="hero-react-spline-stage"><SplineScene scene={site.heroScene} className="hero-react-canvas"/></div><div className="hero-react-spline-bottom"><span>AI · HARDWARE · HUMAN CURIOSITY</span><span>01 / 03</span></div></div>
    <div className="hero-coordinate">THE BUILDER’S<br/>OBSERVATORY — 01</div><div className="hero-bottom"><span>BASED IN NAGPUR, INDIA<br/><b>BUILDING BEYOND BOUNDARIES</b></span><span className="hero-center">BS–MS · IIT PATNA</span><a href="/projects">EXPLORE MY WORK <ArrowDown size={14}/></a></div>
  </section>
 </main>;
}
