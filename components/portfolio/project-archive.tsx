'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/content';
import { ProjectVisual } from './project-visual';
export function ProjectArchive({projects,initialQuery='',initialCategory='All'}:{projects:Project[];initialQuery?:string;initialCategory?:string}) {
  const [query,setQuery]=useState(initialQuery); const [category,setCategory]=useState(initialCategory);
  function update(q:string,c:string){setQuery(q);setCategory(c);const params=new URLSearchParams();if(q)params.set('q',q);if(c!=='All')params.set('category',c);history.replaceState(null,'',`${location.pathname}${params.size?'?'+params:''}`)}
  const categories=['All',...new Set(projects.map(p=>p.category))];
  const filtered=projects.filter(p=>(category==='All'||p.category===category)&&`${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  return <><div className="archive-controls"><div className="filter-tabs" aria-label="Filter projects">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>update(query,c)}>{c}</button>)}</div><label className="search-field"><Search size={18}/><input aria-label="Search projects" placeholder="Find a project or technology" value={query} onChange={e=>update(e.target.value,category)}/></label></div><p className="result-count" role="status">{filtered.length} {filtered.length===1?'exploration':'explorations'}</p><div className="archive-grid">{filtered.map(p=><article key={p.slug}><Link href={`/projects/${p.slug}`} className="project-media-link" aria-label={`Read ${p.title}`}><ProjectVisual project={p}/></Link><div className="project-meta"><span>{p.category}</span><span>{p.year}</span></div><div className="project-title-line"><h2><Link href={`/projects/${p.slug}`}>{p.title}</Link></h2><Link href={`/projects/${p.slug}`} className="round-link" aria-label={`Explore ${p.title}`}><ArrowUpRight size={20}/></Link></div><p className="project-summary">{p.summary}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div>{!filtered.length&&<div className="empty-state"><h2>No matches yet.</h2><p>Try another technology or view the whole collection.</p><button className="pill-button" onClick={()=>update('','All')}>Reset filters</button></div>}</>;
}
