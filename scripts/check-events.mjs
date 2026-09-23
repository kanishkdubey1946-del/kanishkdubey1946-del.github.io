import assert from 'node:assert/strict';
import { readFile, unlink } from 'node:fs/promises';
const base='http://localhost:5173';
const original=JSON.parse(await readFile(new URL('../content/site.json',import.meta.url),'utf8'));
const save=data=>fetch(`${base}/_studio/content`,{method:'POST',headers:{'Content-Type':'application/json','X-Portfolio-Studio':'local'},body:JSON.stringify(data)});
for(const route of ['/','/projects','/projects/esc-connect','/achievements','/hacke-diaries','/contact',...original.events.map(e=>`/achievements/${e.slug}`)]){
 const response=await fetch(base+route);assert.equal(response.status,200,route);assert.ok((await response.text()).includes('id="main"'),route);
}
assert.equal((await fetch(base+'/achievements/not-a-real-event')).status,404);
const invalid=structuredClone(original);invalid.events[0].source='javascript:alert(1)';assert.equal((await save(invalid)).status,400);
const duplicate=structuredClone(original);duplicate.events.push(duplicate.events[0]);assert.equal((await save(duplicate)).status,400);
const badProject=structuredClone(original);badProject.events[0].projectSlug='missing-project';assert.equal((await save(badProject)).status,400);
const badMedia=structuredClone(original);badMedia.events[0].media=[{type:'image',src:'/media/../../secret',alt:'Example',caption:'',poster:'',transcript:''}];assert.equal((await save(badMedia)).status,400);
const fixture=structuredClone(original);fixture.events.push({...fixture.events[0],slug:'qa-event-draft',title:'QA_EVENT_DRAFT_SENTINEL',published:false});
let uploadPath;
try {
 assert.equal((await save(fixture)).status,200);
 assert.equal((await fetch(base+'/achievements/qa-event-draft')).status,404);
 for(const route of ['/achievements','/hacke-diaries'])assert.ok(!(await(await fetch(base+route)).text()).includes('QA_EVENT_DRAFT_SENTINEL'));
 const bytes=await readFile(new URL('../public/favicon-32.png',import.meta.url));
 const upload=await fetch(base+'/_studio/upload',{method:'POST',headers:{'Content-Type':'image/png','X-Portfolio-Studio':'local'},body:bytes});assert.equal(upload.status,200);
 uploadPath=(await upload.json()).path;
 const downloaded=await fetch(base+uploadPath); assert.equal(downloaded.status,200); assert.ok(Buffer.from(await downloaded.arrayBuffer()).equals(bytes),'Uploaded image must be immediately readable');
 const partial=await fetch(base+uploadPath,{headers:{Range:'bytes=0-7'}}); assert.equal(partial.status,206); assert.ok(Buffer.from(await partial.arrayBuffer()).equals(bytes.subarray(0,8)));
 assert.equal((await fetch(base+uploadPath,{headers:{Range:'bytes=999999-'}})).status,416);
 fixture.events[0].media=[{type:'image',src:uploadPath,alt:'QA image description',caption:'QA caption',poster:'',transcript:''}];
 assert.equal((await save(fixture)).status,200);
 const persisted=JSON.parse(await readFile(new URL('../content/site.json',import.meta.url),'utf8'));assert.equal(persisted.events[0].media[0].caption,'QA caption');
 assert.ok((await(await fetch(base+'/achievements/'+fixture.events[0].slug)).text()).includes('QA image description'));
 const invalidVideo=await fetch(base+'/_studio/upload',{method:'POST',headers:{'Content-Type':'video/mp4','X-Portfolio-Studio':'local'},body:'not a video'});assert.equal(invalidVideo.status,400);
} finally {
 assert.equal((await save(original)).status,200,'Restore content');
 if(uploadPath)await unlink(new URL('../public'+uploadPath,import.meta.url));
}
console.log('PASS: all event routes, unknown-event 404, draft privacy, source/slug/project validation, media path safety, image upload round-trip, caption persistence, invalid video rejection. Fixtures removed.');
