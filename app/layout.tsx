import { site } from '@/lib/content';
import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/portfolio/navigation';
import { Footer } from '@/components/portfolio/footer';
import { MotionSystem } from '@/components/portfolio/motion-system';
export const metadata:Metadata={title:{default:'Kanishk Dubey — Ideas, made tangible.',template:'%s — Kanishk Dubey'},description:'AI systems, connected hardware, web products and research. Explore the work of Kanishk Dubey, BS–MS student at IIT Patna.',icons:{icon:'/favicon.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="stylesheet" href="/scroll-motion.css"/></head><body id="top"><a href="#main" className="skip-link">Skip to content</a><Navigation/>{children}<Footer person={site.person}/><MotionSystem/><script src="/scroll-motion.js" defer/></body></html>}

