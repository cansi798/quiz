/* Service Worker: macht den Trainer offline nutzbar. Version wird beim Build eingesetzt. */
const VERSION="d6d2863a44";
const CACHE="lf1-"+VERSION;
const ASSETS=[
  "./","./index.html","./manifest.webmanifest",
  "./fonts/manrope-latin.woff2","./fonts/manrope-latin-ext.woff2",
  "./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./icons/apple-touch-icon.png"
];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET"||new URL(req.url).origin!==location.origin)return;
  if(req.mode==="navigate"){
    /* Seite: erst Netz, sonst Cache */
    e.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",copy));return res;})
      .catch(()=>caches.match("./index.html")));
    return;
  }
  /* Alles andere: erst Cache, sonst Netz und merken */
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res;})));
});
