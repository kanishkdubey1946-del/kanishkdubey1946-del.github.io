
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const build=()=>new Promise((done,reject)=>{const job=spawn(process.execPath,['scripts/build-pages.mjs'],{cwd:root,stdio:'inherit'});job.on('error',reject);job.on('exit',code=>code===0?done():reject(new Error('Pages build failed')))});
await build();
await import('./serve-pages.mjs');
let timer,building=false,pending=false;
const rebuild=async()=>{if(building){pending=true;return}building=true;try{await build();console.log('Content updated. Refresh the preview.')}catch(e){console.error(e.message)}finally{building=false;if(pending){pending=false;rebuild()}}};
watch(resolve(root,'content'),(_,name)=>{if(name?.endsWith('.json')){clearTimeout(timer);timer=setTimeout(rebuild,250)}});
