import { notFound } from 'next/navigation';
import Link from 'next/link';
import { notes } from '@/lib/content';
export default async function Note({params}:{params:Promise<{slug:string}>}){const slug=(await params).slug;const note=notes.find(n=>n.slug===slug);if(!note)notFound();return <main id="main" className="section-pad"><header className="page-intro"><Link className="text-link" href="/writing">← All notes</Link><div className="eyebrow">{note.date}</div><h1>{note.title}</h1><p>{note.summary}</p></header><article className="note-body">{note.body.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</article></main>}

