'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
const links=[['Projects','/projects'],['Achievements','/achievements'],['Hacke Diaries','/hacke-diaries'],['About','/about']];
export function Navigation(){const path=usePathname();const[open,setOpen]=useState(false);return <header className="site-header"><Link className="wordmark" href="/portfolio" aria-label="Kanishk Dubey home"><img className="brand-mark" src="/favicon.svg?v=identity-2" alt="" width={44} height={44}/><span>Kanishk Dubey<span className="wordmark-caption">INDEPENDENT BUILDER</span></span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,url])=><Link key={url} href={url} aria-current={path.startsWith(url)?'page':undefined}>{label}</Link>)}</nav><Link className="header-contact" href="/contact">Let’s talk <ArrowUpRight size={16}/></Link><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className="mobile-menu icon-button" aria-label="Open navigation"><Menu/></button></SheetTrigger><SheetContent className="portfolio-menu"><SheetTitle className="menu-title">Explore</SheetTitle><SheetDescription>Kanishk Dubey — portfolio</SheetDescription><nav aria-label="Mobile navigation">{[['Home','/portfolio'],...links,['Notes','/writing'],['Contact','/contact']].map(([label,url],i)=><SheetClose key={url} asChild><Link href={url}><span>0{i}</span>{label}<ArrowUpRight/></Link></SheetClose>)}</nav><p>AI. Hardware. A little curiosity.</p></SheetContent></Sheet></header>}

