cat > sw.js << 'SWEOF'
const CACHE='area51-v2';
const URLS=['/index.html','/sw.js','https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.8.0/firebase-database-compat.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS).catch(()=>{}))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const clone=res.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return res;}).catch(()=>caches.match('/index.html')))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
SWEOF
