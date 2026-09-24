
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve,dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await readFile(resolve(root,'.pages-manifest.json'),'utf8'));
const content=JSON.parse(await readFile(resolve(root,'content/site.json'),'utf8'));
let checked=0;
for(const name of manifest){
 const html=await readFile(resolve(root,name),'utf8');
 assert(html.startsWith('<!doctype html>'),name+' document type');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,name+' must have exactly one main heading');
 assert(html.includes('<main id="main"'),name+' skip target');
 for(const match of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)){
  const url=match[1].replaceAll('&amp;','&');
  if(url.startsWith('/')&&!url.startsWith('//')){
   const path=url.split(/[?#]/)[0];
   let target=path.slice(1);
   if(path.endsWith('/'))target+='index.html';
   await access(resolve(root,target)).catch(()=>{throw new Error(name+' links to missing '+url)});
   checked++;
  }
 }
}
for(const [key,base] of [['projects','projects'],['events','achievements'],['writing','writing']]){
 for(const entry of content[key]){
  assert.equal(manifest.includes(base+'/'+entry.slug+'/index.html'),entry.published,key+' publication state: '+entry.slug);
 }
}
const all=await Promise.all(manifest.map(p=>readFile(resolve(root,p),'utf8')));
assert(!all.some(h=>h.includes('undefined')||h.includes('[object Object]')),'No template leakage');
const entrance=await readFile(resolve(root,'index.html'),'utf8');
assert(entrance.includes('Enter portfolio')&&entrance.includes('id="entry-spline"')&&entrance.includes('/public/entry.js'),'Robot entrance is present');
assert(!entrance.includes('<spline-viewer'),'Entrance uses the badge-free Spline runtime canvas');
assert(!entrance.includes('kanishk-presenting.jpg')&&!entrance.includes('entry-intro'),'Entrance stays a single static screen');
assert((await readFile(resolve(root,'portfolio/index.html'),'utf8')).includes('Curious by nature.'),'Portfolio home is present');
console.log('PASS: '+manifest.length+' static pages; '+checked+' local links/assets; published/draft routes; complete documents.');
