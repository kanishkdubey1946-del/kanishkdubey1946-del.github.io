import { events } from '@/lib/events';
import { EventArchive } from '@/components/portfolio/event-archive';
export const metadata = { title: 'Hacke Diaries', description: 'Kanishk’s hackathon stories, build weekends, photos and videos.' };
export default function Diaries() {
  return <main id="main" className="section-pad archive-page"><header className="page-intro"><div className="eyebrow">BEYOND THE COMMIT HISTORY</div><h1>Hacke <em>Diaries.</em></h1><p>Late nights. Last-minute demos. New cities and teammates. A growing journal of the moments behind the projects.</p></header><EventArchive events={events.filter(event => event.category !== 'Research')} diaries/></main>;
}
