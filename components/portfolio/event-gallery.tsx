'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { EventMedia } from '@/lib/events';

export function EventGallery({ media, title }: { media: EventMedia[]; title: string }) {
  const [selected, setSelected] = useState<EventMedia | null>(null);
  const [filter, setFilter] = useState('All');
  if (!media.length) return <div className="gallery-empty"><p className="eyebrow">THE CAMERA ROLL</p><h3>The story is here.<br/><em>The photos are on their way.</em></h3><p>Photos, videos and certificates from this event will appear here.</p></div>;
  const visible = media.filter(item => filter === 'All' || item.type === (filter === 'Photos' ? 'image' : 'video'));
  return <><div className="filter-tabs" aria-label="Filter event media">{['All', 'Photos', 'Videos'].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div><div className="event-gallery">{visible.map((item, index) => <figure key={`${item.src}-${index}`}>{item.type === 'video' ? <video src={item.src} poster={item.poster || undefined} controls playsInline preload="metadata" aria-label={item.alt}/> : <button onClick={() => setSelected(item)} aria-label={`Enlarge: ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy"/></button>}<figcaption>{item.caption || item.alt}</figcaption>{item.type === 'video' && item.transcript && <details><summary>Video transcript</summary><p className="event-story">{item.transcript}</p></details>}</figure>)}</div>{!visible.length && <p className="result-count">No {filter.toLowerCase()} in this album yet.</p>}<Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="gallery-dialog"><DialogTitle>{title}</DialogTitle><DialogDescription>{selected?.caption || selected?.alt}</DialogDescription>{selected && <img src={selected.src} alt={selected.alt}/>}</DialogContent></Dialog></>;
}
