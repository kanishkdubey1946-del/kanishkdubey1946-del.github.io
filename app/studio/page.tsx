import { ContentEditor } from '@/components/portfolio/content-editor';
export const metadata={title:'Content studio',robots:{index:false,follow:false}};
export default function Studio(){return <main id="main" className="section-pad studio-page"><header><h1>Content <em>studio.</em></h1><p>Your projects, event stories, photos, videos and profile — in your own words.</p></header><ContentEditor/></main>}

