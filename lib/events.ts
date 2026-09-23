import { site } from './content';
export type EventMedia = { type: string; src: string; alt: string; caption: string; poster: string; transcript: string };
export type PortfolioEvent = { slug: string; title: string; category: string; result: string; date: string; location: string; summary: string; story: string; projectSlug: string; source: string; published: boolean; media: EventMedia[] };
export const events = (site.events as PortfolioEvent[]).filter(event => event.published);
export const getEvent = (slug: string) => events.find(event => event.slug === slug);
