import raw from '@/content/site.json';
export type Note={slug:string;title:string;date:string;summary:string;body:string;published:boolean};
export type Project = typeof raw.projects[number];
export type SiteContent = typeof raw;
export const site = raw;
export const projects = raw.projects.filter(p=>p.published);
export const featuredProjects = projects.filter(p=>p.featured);
export const getProject = (slug:string)=>projects.find(p=>p.slug===slug);
export const notes=(raw.writing as Note[]).filter(n=>n.published);
