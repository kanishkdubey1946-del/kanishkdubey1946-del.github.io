import Link from 'next/link';
import { projects } from '@/lib/content';
import { ProjectLinks } from './project-links';

export function MoreProjects() {
  const additional = projects.filter(project => !project.featured);
  if (!additional.length) return null;
  return <div className="more-explorations">
    <div className="more-projects-heading"><span className="eyebrow">THE COLLECTION CONTINUES</span><h3>More <em>explorations.</em></h3></div>
    <div className="more-project-grid">{additional.map(project => <article className="more-project" id={`project-${project.slug}`} key={project.slug}>
      <div className="more-project-meta"><span>0{projects.indexOf(project) + 1} / {project.category.toUpperCase()}</span><span>{project.year}</span></div>
      <h4><Link href={`/projects/${project.slug}`}>{project.title} <span aria-hidden="true">↗</span></Link></h4>
      <p>{project.summary}</p>
      <div className="tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
      <span className="project-context">{project.slug === 'catalyst' ? 'RIT Quant-A-Thon · Collaborative project' : 'Collaborative project'}</span>
      <ProjectLinks project={project}/>
    </article>)}</div>
  </div>;
}
