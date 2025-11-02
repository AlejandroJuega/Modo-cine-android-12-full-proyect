self.addEventListener("install",e=>{
 e.waitUntil(caches.open("ModoCine").then(c=>c.addAll([
  "index.html","login.html","style.css","script.js","login.js","config.js"
 ])));
});
self.addEventListener("fetch",e=>{
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
