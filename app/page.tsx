import Link from 'next/link';
import { OrbitControls } from '@/components/portfolio/orbit-controls';
import { ArrowDown, ArrowUpRight, ArrowRight, Download } from 'lucide-react';
import { featuredProjects, site } from '@/lib/content';
import { ProjectVisual } from '@/components/portfolio/project-visual';

const focusAreas = ['AI SYSTEMS', 'CONNECTED HARDWARE', 'WEB EXPERIENCES', 'APPLIED RESEARCH'];
const orbitSkills = [
  ['INTELLIGENCE', 'AI systems', 'Agent workflows, product logic, and useful automation.'],
  ['INTERFACE', 'Web products', 'Fast, accessible experiences that explain themselves.'],
  ['PHYSICAL', 'Hardware', 'Sensors, telemetry, and prototypes in the real world.'],
  ['EVIDENCE', 'Research', 'Questions, models, sources, and honest boundaries.'],
  ['DELIVERY', 'Systems thinking', 'Joining the pieces into something reliable and clear.'],
];
const toolkit = [
  ['AI & orchestration', ['Multi-agent workflows', 'Prompt engineering', 'API integrations', 'Model-assisted development']],
  ['Web & delivery', ['JavaScript · HTML · CSS', 'React workflows', 'Figma · Adobe tools', 'Vercel · Firebase · Supabase']],
  ['Hardware & research', ['NodeMCU · ESP32-S3', 'Sensor telemetry', 'Academic writing', 'Optical & cost modelling']],
];

function HeroPicture({ layer }: { layer: 'back' | 'mid' | 'front' }) {
  return <picture className={`hero-art hero-layer hero-layer-${layer}`} aria-hidden="true"><source media="(max-width:700px)" srcSet="/media/observatory-mobile.webp"/><img src="/media/observatory.webp" alt="" width={1672} height={941} fetchPriority={layer === 'back' ? 'high' : 'auto'}/></picture>;
}

export default function Home(){return <main id="main">
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero-media"><HeroPicture layer="back"/><HeroPicture layer="mid"/><HeroPicture layer="front"/></div>
    <div className="hero-shade"/>
    <div className="hero-content"><div className="eyebrow hero-eyebrow"><span className="signal-cross">✳</span> AI · HARDWARE · HUMAN CURIOSITY</div><h1 id="hero-title"><span>Ideas, made</span><span><em>tangible.</em></span></h1><p>{site.person.intro}</p><div className="hero-actions"><Link href="#work" className="pill-button">Explore my work <ArrowDown size={17}/></Link><a className="hero-resume" href={site.person.resume} download>Download résumé <ArrowUpRight size={15}/></a></div></div>
    <div className="hero-coordinate">THE BUILDER’S<br/>OBSERVATORY — 01</div><div className="hero-bottom"><span>BASED IN NAGPUR, INDIA<br/><b>BUILDING BEYOND BOUNDARIES</b></span><span className="hero-center">BS–MS · IIT PATNA</span><a href="#work">SCROLL TO DISCOVER <ArrowDown size={14}/></a></div>
  </section>

  <div className="discipline-strip scroll-ticker" aria-label="Focus areas"><div className="ticker-track">{[...focusAreas,...focusAreas].map((area,index)=><span key={`${area}-${index}`} aria-hidden={index>=focusAreas.length}>{area}<i>✳</i></span>)}</div></div>

  <section id="work" className="work-section section-pad"><div className="section-heading"><div><div className="eyebrow"><span className="section-number">01</span> SELECTED EXPLORATIONS</div><h2>Built with intent.<br/><em>Made to work.</em></h2></div><p>A selection of systems, experiments,<br/>and ideas brought into the real world.</p></div><div className="work-layout"><aside className="work-index"><span className="eyebrow">THE COLLECTION</span>{featuredProjects.map((p,i)=><a key={p.slug} href={`#project-${p.slug}`} className="work-index-link"><span>0{i+1}</span>{p.title}<ArrowUpRight size={14}/></a>)}<Link href="/projects" className="text-link">All projects <ArrowRight size={17}/></Link><p>Software. Hardware.<br/>Different tools.<br/>The same curiosity.</p></aside><div className="work-list">{featuredProjects.map((p,i)=><article className={`featured-project ${i===0?'fey-project':i===1?'zoom-project':'scroll-media-project'}`} id={`project-${p.slug}`} key={p.slug}><Link href={`/projects/${p.slug}`} className="project-media-link" aria-label={`Read ${p.title} case study`}><ProjectVisual project={p}/>{i===2&&<div className="scroll-media-ui" aria-hidden="true"><span className="scroll-media-value">0%</span><div className="scroll-media-rail"><b className="scroll-media-fill"/></div><span>TRACE</span></div>}<span className="case-study-chip">Explore project <ArrowUpRight size={16}/></span></Link><div className="project-meta"><span>{p.category.toUpperCase()}</span><span>{p.year}</span></div><div className="project-title-line"><h3><Link href={`/projects/${p.slug}`}>{p.title}<span className="project-counter">0{i+1}</span></Link></h3><Link href={`/projects/${p.slug}`} className="round-link" aria-label={`Read ${p.title}`}><ArrowUpRight/></Link></div><p className="project-summary">{p.summary}</p><div className="tags">{p.tags.slice(0,3).map(t=><span key={t}>{t}</span>)}</div></article>)}</div></div></section>

  <section className="about-section section-pad" id="about"><div className="eyebrow"><span className="section-number">02</span> THE PERSON BEHIND THE PROJECTS</div><div className="about-layout"><h2>Curiosity is<br/>my <em>starting point.</em></h2><div><p className="about-lead text-reveal">{site.person.bio}</p><p className="text-reveal">Some days that means coordinating AI agents. Others, it means calibrating a sensor or asking a better research question. I like making the pieces work together.</p><Link href="/about" className="text-link">A little more about me <ArrowUpRight size={18}/></Link></div></div><div className="education-strip"><span>IIT PATNA</span><div>BS–MS · Computer Science & Data Analytics<small>2025 — 2030 (expected)</small></div><a href={site.person.resume} download>Résumé <Download size={16}/></a></div></section>

  <section className="spiral-scroll" id="systems" aria-labelledby="spiral-title"><div className="spiral-sticky"><div className="spiral-heading"><div><div className="eyebrow"><span className="section-number">ORBIT MAP</span> FIVE CONNECTED PRACTICES</div><h2 id="spiral-title">Systems in <em>motion.</em></h2></div><p>The work is strongest where disciplines overlap. Scroll through the orbit to see the parts of my practice as one connected system.</p></div><div className="spiral-scene">{orbitSkills.map(([label,title,body],index)=><article className="spiral-card" key={label}><div className="spiral-card-media" aria-hidden="true"><i className={`spiral-card-image spiral-image-${index+1}`}/><b>0{index+1}</b></div><div className="spiral-card-copy"><span>0{index+1} / {label}</span><h3>{title}</h3><p>{body}</p></div></article>)}</div><OrbitControls/></div></section>

  <section className="experience-section section-pad" id="experience"><div className="section-heading"><div><div className="eyebrow"><span className="section-number">03</span> LEARNING BY DOING</div><h2>Work, and<br/><em>the work around it.</em></h2></div><Link href="/about#experience" className="text-link">Full experience <ArrowUpRight size={18}/></Link></div><div className="experience-list">{site.experience.map(e=><article key={e.title}><span className="experience-period">{e.period}</span><div><h3>{e.title}</h3><p>{e.organization}</p></div><p>{e.body}</p></article>)}</div></section>

  <section className="horizontal-scroll-section"><div className="horizontal-sticky"><div className="section-heading"><div><div className="eyebrow">MY WORKING TOOLKIT</div><h2>Across <em>disciplines.</em></h2></div><p>Scroll vertically. The toolkit moves sideways.</p></div><div className="skills-grid horizontal-track">{toolkit.map(([title,items],index)=><article key={title as string}><span className="section-number">0{index+1}</span><h3>{title as string}</h3><ul>{(items as string[]).map(item=><li key={item}>{item}</li>)}</ul></article>)}</div></div></section>

  <section className="recognition-section section-pad" id="recognition"><div className="section-heading"><div><div className="eyebrow"><span className="section-number">04</span> MOMENTS ALONG THE WAY</div><h2>Out in <em>the world.</em></h2></div><span className="eyebrow">2021 — 2026</span></div><div className="recognition-list">{site.recognition.map((r,i)=><article key={r.title}><span className="recognition-index">0{i+1}</span><div><h3>{r.title}</h3><p>{r.body}</p></div><span className="award-result">{r.result}</span><span className="award-date">{r.date}</span></article>)}</div></section>
</main>}
