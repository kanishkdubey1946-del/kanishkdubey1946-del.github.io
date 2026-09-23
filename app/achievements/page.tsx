import Link from 'next/link';
import { events } from '@/lib/events';
import { EventArchive } from '@/components/portfolio/event-archive';
export const metadata = { title: 'Achievements', description: 'Awards, hackathon participation, research milestones and community work by Kanishk Dubey.' };
export default function Achievements() {
  return <main id="main" className="section-pad archive-page"><header className="page-intro"><div className="eyebrow">MILESTONES / 2021 — 2026</div><h1>Built together.<br/><em>Remembered always.</em></h1><p>Competition floors, research forums and developer communities. The wins, the work, and everything learned along the way.</p><Link className="text-link" href="/hacke-diaries">Explore Hacke Diaries ↗</Link></header><EventArchive events={events}/></main>;
}
