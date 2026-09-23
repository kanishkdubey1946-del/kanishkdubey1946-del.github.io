import type { Plugin } from 'vite';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Serve newly uploaded files immediately, including byte ranges for video seeking.
// Vite's public-file inventory may lag behind a file created by the local studio.
export function studioMedia(): Plugin {
  return {
    name: 'local-studio-media', apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/media', async (req, res, next) => {
        const name = (req.url || '').split('?')[0];
        if (!/^\/upload-[0-9a-f-]+\.(png|jpg|webp|mp4|webm)$/.test(name)) return next();
        if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
        try {
          const body = await readFile(resolve(server.config.root, 'public/media', name.slice(1)));
          const extension = name.split('.').pop()!;
          const types: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', mp4: 'video/mp4', webm: 'video/webm' };
          const headers = { 'Content-Type': types[extension], 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' };
          const range = req.headers.range;
          if (range) {
            const match = /^bytes=(\d*)-(\d*)$/.exec(range);
            let start = 0, end = body.length - 1;
            if (match?.[1]) { start = Number(match[1]); if (match[2]) end = Math.min(Number(match[2]), end); }
            else if (match?.[2]) start = Math.max(0, body.length - Number(match[2]));
            if (!match || (!match[1] && !match[2]) || start > end || start >= body.length || (!match[1] && Number(match[2]) === 0)) {
              res.writeHead(416, { ...headers, 'Content-Range': `bytes */${body.length}` }); res.end(); return;
            }
            res.writeHead(206, { ...headers, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${body.length}` });
            res.end(req.method === 'HEAD' ? undefined : body.subarray(start, end + 1)); return;
          }
          res.writeHead(200, { ...headers, 'Content-Length': body.length });
          res.end(req.method === 'HEAD' ? undefined : body);
        } catch { res.writeHead(404); res.end(); }
      });
    },
  };
}
