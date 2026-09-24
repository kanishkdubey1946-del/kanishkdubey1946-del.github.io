'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Search, Trophy, Camera } from 'lucide-react';
import type { PortfolioEvent } from '@/lib/events';
import { GalleryGridBlock } from '@/components/ui/gallery-grid-block-shadcnui';

export function EventArchive({ events, diaries = false }: { events: PortfolioEvent[]; diaries?: boolean }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const categories = ['All', ...new Set(events.map(event => event.category))];
  const visible = events.filter(event => (filter === 'All' || event.category === filter) && `${event.title} ${event.summary} ${event.location} ${event.result}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="archive-controls"><div className="filter-tabs" aria-label="Filter events">{categories.map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div><label className="search-field"><Search size={18}/><input aria-label="Search events" placeholder="Find an event or milestone" value={query} onChange={event => setQuery(event.target.value)}/></label></div><p className="result-count" role="status">{visible.length} {visible.length === 1 ? 'story' : 'stories'}</p><GalleryGridBlock items={visible} className="event-grid animated-event-grid" label={diaries ? "Hacke Diaries" : "Achievements and experiences"} renderItem={(event, index) => <Link className="event-card gallery-event-card" href={`/achievements/${event.slug}`}><div className="event-card-top"><span className="eyebrow">{event.date}</span>{event.category === 'Award' ? <Trophy size={22}/> : <Camera size={22}/>}</div><span className="event-result">{event.result}</span><h2>{event.title}</h2><p>{event.summary}</p><div className="event-card-bottom"><span>{event.location || event.category}</span><ArrowUpRight size={22}/></div><span className="event-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{diaries && <small>{event.media.length ? `${event.media.length} photos & videos` : 'Read the event story'}</small>}<span className="gallery-event-cta" aria-hidden="true">Read the story ↗</span></Link>}/>{!visible.length && <div className="empty-state"><h2>No matching stories.</h2><button className="pill-button" onClick={() => { setFilter('All'); setQuery(''); }}>Show all events</button></div>}</>;
}
