'use client';
import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import repositories from '@/content/repositories.json';
export function RepositoryDirectory() {
  const [query, setQuery] = useState('');
  const visible = repositories.filter(repo => `${repo.name} ${repo.language} ${repo.description}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="repository-section" aria-labelledby="repository-title"><div className="section-heading"><div><div className="eyebrow">THE PUBLIC REPOSITORIES</div><h2 id="repository-title">More from <em>GitHub.</em></h2></div><a className="text-link" href="https://github.com/kanishkdubey1946-del?tab=repositories" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={18}/></a></div><label className="search-field"><Search size={18}/><input aria-label="Search GitHub repositories" placeholder="Find a repository or language" value={query} onChange={event => setQuery(event.target.value)}/></label><p className="result-count" role="status">{visible.length} public repositories · Snapshot: 22 September 2026</p><div className="repository-list">{visible.map(repo => <article key={repo.name}><span className="eyebrow">{repo.language || 'Repository'}</span><h3><a className="text-link" href={repo.url} target="_blank" rel="noreferrer">{repo.name} <ArrowUpRight size={16}/></a></h3><p>{repo.description}</p>{repo.upstream && <small>Fork · <a className="text-link" href={repo.upstream} target="_blank" rel="noreferrer">Original repository ↗</a></small>}</article>)}</div>{!visible.length && <div className="empty-state"><p>No matching repositories.</p><button className="pill-button" onClick={()=>setQuery('')}>Clear search</button></div>}</section>;
}
