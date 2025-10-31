// Simple offline caching (requires HTTPS to fully work)
const CACHE = 'halloween-cache-v1';
const ASSETS = [
  './index.html','./styles.css','./app.js','./manifest.webmanifest'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request))
  );
});
