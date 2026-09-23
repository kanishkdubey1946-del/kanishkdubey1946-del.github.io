import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/content';

export function ProjectLinks({ project }: { project: Pick<Project, 'title' | 'repo' | 'demo'> }) {
  return <div className="project-links">
    {project.demo && <a className="project-demo" href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} demo`}>Open demo <ArrowUpRight size={15}/></a>}
    <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>View source <ArrowUpRight size={15}/></a>
  </div>;
}
