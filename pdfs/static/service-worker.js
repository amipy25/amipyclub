const CACHE_NAME = "revistas-cache-v1";
const urlsToCache = ['logo.webp', 'favicon.ico', 'site.webmanifest', '../Newton-Raphson_%20M%C3%A9todo%20Efectivo%20para%20Resolver%20Ecuaciones.pdf', 'Newton-Raphson_%20M%C3%A9todo%20Efectivo%20para%20Resolver%20Ecuaciones.webp'];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() =>
        new Response("No hay conexión y el recurso no está en caché.", {
          headers: { "Content-Type": "text/plain" }
        })
      )
    )
  );
});