import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const base='http://localhost:5173';
const original=JSON.parse(await readFile(new URL('../content/site.json',import.meta.url),'utf8'));
const post=(data,extra={})=>fetch(`${base}/_studio/content`,{method:'POST',headers:{'content-type':'application/json','x-portfolio-studio':'local',...extra},body:JSON.stringify(data)});
assert.equal((await fetch(`${base}/_studio/content`)).status,200);
assert.equal((await post(original,{origin:'https://untrusted.example'})).status,403);
const invalid=structuredClone(original);invalid.projects[0].repo='javascript:alert(1)';
assert.equal((await post(invalid)).status,400,'Unsafe URLs must not be saved');
const duplicate=structuredClone(original);duplicate.projects.push(duplicate.projects[0]);
assert.equal((await post(duplicate)).status,400,'Duplicate slugs must be rejected');
const draft=structuredClone(original);draft.projects.push({...draft.projects[0],slug:'qa-private-draft',title:'QA_UNPUBLISHED_SENTINEL',published:false});
try{
  assert.equal((await post(draft)).status,200);
  assert.equal(JSON.parse(await readFile(new URL('../content/site.json',import.meta.url),'utf8')).projects.at(-1).published,false);
  await new Promise(r=>setTimeout(r,1000));
  const page=await fetch(`${base}/projects/qa-private-draft`);
  assert.equal(page.status,404,'Draft routes must return 404');
  const archive=await (await fetch(`${base}/projects`)).text();
  assert.ok(!archive.includes('QA_UNPUBLISHED_SENTINEL'),'Draft content must not be serialized into the public archive');
  const home=await (await fetch(base)).text();
  assert.ok(!home.includes('QA_UNPUBLISHED_SENTINEL'),'Draft content must not be serialized into the homepage');
}finally{assert.equal((await post(original)).status,200,'Restore original content')}
const upload=await fetch(`${base}/_studio/upload`,{method:'POST',headers:{'content-type':'image/png','x-portfolio-studio':'local'},body:'not-an-image'});
assert.equal(upload.status,400,'Image signatures must be validated');
console.log('PASS: persistence, unpublished routes and serialization, URL/slug validation, origin protection, invalid image rejection. Original content restored.');
