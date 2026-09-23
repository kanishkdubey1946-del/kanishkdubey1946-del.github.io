import { site } from '@/lib/content';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navigation } from '@/components/portfolio/navigation';
import { Footer } from '@/components/portfolio/footer';
import { MotionSystem } from '@/components/portfolio/motion-system';

export const metadata: Metadata = {
  metadataBase: new URL('https://kanishkdubey1946-del.github.io'),
  title: { default: 'Kanishk Dubey — Ideas, made tangible.', template: '%s — Kanishk Dubey' },
  description: 'AI systems, connected hardware, web products and research. Explore the work of Kanishk Dubey, BS–MS student at IIT Patna.',
  icons: {
    icon: [{ url: '/favicon.svg?v=identity-2', type: 'image/svg+xml' }, { url: '/favicon-32.png?v=identity-2', sizes: '32x32', type: 'image/png' }],
    shortcut: '/favicon.ico?v=identity-2',
    apple: [{ url: '/apple-touch-icon.png?v=identity-2', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: { type: 'website', title: 'Kanishk Dubey — Ideas, made tangible.', description: 'AI systems, connected hardware, web products and research.', images: ['/media/observatory.webp'] },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: '#080d14' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><head>
    <link rel="stylesheet" href="/scroll-motion.css?v=identity-2"/>
    <link rel="stylesheet" href="/portfolio-polish.css?v=projects-1"/>
  </head><body id="top"><a href="#main" className="skip-link">Skip to content</a>
    <Navigation/>{children}<Footer person={site.person}/><MotionSystem/>
    <script src="/scroll-motion.js?v=identity-2" defer/>
    <script src="/portfolio-ui.js?v=identity-2" defer/>
  </body></html>;
}
