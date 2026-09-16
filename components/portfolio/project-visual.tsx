import { ArrowUpRight, FileText, Cpu, Network, Layers3 } from 'lucide-react';
import type { Project } from '@/lib/content';

export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) return <div className="project-visual image-visual">
    <img src={project.image} alt={project.imageAlt} width={1440} height={960} loading="lazy" decoding="async"/>
    <span className="media-caption">{project.title} / Interface capture</span>
  </div>;

  if (project.visual === 'agrobot') return <div className="project-visual hardware-visual">
    <img src="/media/agrobot-hardware.jpeg" alt="AgroBot prototype with sensor, circuit board and wiring" width={900} height={600} loading="lazy" decoding="async"/>
    <div className="diagram"><div>Soil sensor</div><i/><div>NodeMCU<br/>+ alerts</div><i/><div>Web dashboard</div></div>
    <span className="visual-label">AGROBOT / WORKING PROTOTYPE</span>
  </div>;

  const Icon = project.visual === 'drishti' ? FileText : project.visual === 'comet' ? Network : Layers3;
  return <div className={`project-visual diagram-visual ${project.visual} ${project.visual === 'drishti' ? 'research-visual' : ''}`}>
    <div className="diagram-header"><span>{project.title.toUpperCase()} / SYSTEM OVERVIEW</span><ArrowUpRight size={16}/></div>
    <div className="diagram-body">
      <div className="diagram-symbol"><Icon size={55} strokeWidth={1}/></div><span className="diagram-line"/>
      <div className="diagram-node"><Cpu size={22} strokeWidth={1.3}/><span>{project.architecture[1]}</span></div><span className="diagram-line"/>
      <div className="diagram-output">{project.architecture[3]}<span className="diagram-bars"><i/><i/><i/><i/><i/><i/><i/></span></div>
    </div>
    <div className="diagram-footer"><span>{project.architecture[0]} → {project.architecture[3]}</span><span>CONCEPT DIAGRAM</span></div>
  </div>;
}
