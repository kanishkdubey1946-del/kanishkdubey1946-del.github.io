
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';
const root=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port=Number(process.env.PORT||5180);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ttf':'font/ttf','.ico':'image/x-icon','.mp4':'video/mp4','.webm':'video/webm','.xml':'application/xml','.txt':'text/plain','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
createServer(async(req,res)=>{
 try{
   if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return}
   const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
   const manifest=JSON.parse(await readFile(resolve(root,'.pages-manifest.json'),'utf8'));
   let relative=path.replace(/^\//,'');
   if(!relative||relative.endsWith('/'))relative+='index.html';
   else if(!extname(relative)&&manifest.includes(relative+'/index.html')){
     res.writeHead(308,{Location:path+'/'});res.end();return;
   }
   const file=resolve(root,relative);
   if(!file.startsWith(root+sep)||relative.split('/').some(p=>p.startsWith('.'))||(!manifest.includes(relative)&&!relative.startsWith('public/')&&!['robots.txt','sitemap.xml','favicon.ico'].includes(relative))){
     res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')));return;
   }
   const info=await stat(file);
   let start=0,end=info.size-1,status=200;
   const headers={'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
   if(req.headers.range){
     const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
     if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':'bytes */'+info.size});res.end();return}
     start=match[1]?Number(match[1]):Math.max(0,info.size-Number(match[2]));
     end=match[1]&&match[2]?Math.min(Number(match[2]),end):end;
     if(start>end||start>=info.size){res.writeHead(416,{'Content-Range':'bytes */'+info.size});res.end();return}
     status=206;headers['Content-Range']='bytes '+start+'-'+end+'/'+info.size;
   }
   headers['Content-Length']=end-start+1;res.writeHead(status,headers);
   if(req.method==='HEAD')res.end();else createReadStream(file,{start,end}).pipe(res);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')))}
}).listen(port,'127.0.0.1',()=>console.log('Portfolio preview: http://localhost:'+port));
