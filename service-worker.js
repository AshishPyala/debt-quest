const C='debt-quest-v23',A=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png','icons/favicon.ico','fonts/bebas.woff2',...[1,2,3,4,5,6,7,8].map(i=>'art/tier'+i+'.webp'),'fonts/azeret-400.woff2','fonts/azeret-500.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request,u=new URL(q.url);if(q.method!=='GET'||u.origin!==location.origin)return;
// data file: always network, never cached (works under any base path, e.g. /debt-quest/data/)
if(/\/data\//.test(u.pathname)||/\.enc\.json$/.test(u.pathname)){e.respondWith(fetch(q,{cache:'no-store'}));return}
// html shell: network-first, cache fallback offline
if(q.mode==='navigate'||/\/(index\.html)?$/.test(u.pathname)){e.respondWith(fetch(q,{cache:'no-cache'}).then(n=>{if(n.ok){const cl=n.clone();caches.open(C).then(c=>c.put('index.html',cl))}return n}).catch(()=>caches.match('index.html')));return}
// static assets: cache-first
e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(n=>{if(n.ok){const cl=n.clone();caches.open(C).then(c=>c.put(q,cl))}return n}).catch(()=>caches.match('index.html'))))});
