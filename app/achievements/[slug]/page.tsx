import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getEvent } from '@/lib/events';
import { getProject } from '@/lib/content';
import { EventGallery } from '@/components/portfolio/event-gallery';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { const event = getEvent((await params).slug); return { title: event?.title || 'Event not found', description: event?.summary }; }
export default async function EventPage({ params }: Props) {
  const event = getEvent((await params).slug); if (!event) notFound();
  const project = getProject(event.projectSlug);
  return <main id="main"><header className="section-pad page-intro event-intro"><Link className="text-link" href="/achievements"><ArrowLeft size={16}/> All achievements</Link><div className="project-meta"><span>{event.date} · {event.category}</span><span>{event.location}</span></div><span className="event-result">{event.result}</span><h1>{event.title}</h1><p>{event.summary}</p></header><section className="section-pad event-detail"><div><div className="eyebrow">THE STORY</div><h2>More than<br/><em>a result.</em></h2></div><div><p className="event-story">{event.story}</p><div className="case-actions">{project && <Link className="pill-button" href={`/projects/${project.slug}`}>Explore {project.title}<ArrowUpRight size={17}/></Link>}{event.source && <a className="text-link" href={event.source} target="_blank" rel="noreferrer">Event post <ArrowUpRight size={16}/></a>}<Link className="text-link" href="/hacke-diaries">Hacke Diaries <ArrowUpRight size={16}/></Link></div></div></section><section className="section-pad"><div className="section-heading"><h2>From the <em>event.</em></h2></div><EventGallery media={event.media} title={event.title}/></section></main>;
}
