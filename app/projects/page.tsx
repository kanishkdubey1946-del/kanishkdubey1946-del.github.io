import { RepositoryDirectory } from '@/components/portfolio/repository-directory';
import { projects } from '@/lib/content';
import { ProjectArchive } from '@/components/portfolio/project-archive';
export const metadata={title:'Projects',description:'Explore Kanishk Dubey’s AI systems, connected hardware, web products and research.'};
export default async function Projects({searchParams}:{searchParams:Promise<{q?:string;category?:string}>}){const params=await searchParams;return <main id="main" className="section-pad archive-page"><header className="page-intro"><div className="eyebrow"><span className="section-number">PROJECTS & EXPERIMENTS</span> THE EXPLORATIONS</div><h1>A collection of<br/><em>working ideas.</em></h1><p>Different questions. Different tools. Each project is a chance to connect what I know with what I haven’t tried yet.</p></header><ProjectArchive projects={projects} initialQuery={params.q} initialCategory={params.category}/><RepositoryDirectory/></main>}

