const cacheName = "MyCache_1";
const precachedResources = [
  "/",
  "/#/",
  "/index.html",
  "/assets/index-1f65c30e.js",
  "/assets/index-6042d029.css",
  "/icon-192x192.png", "/icon-512x512.png",
  "/favicon.ico",
  "/data/tableData.json"
  "/manifest.webmanifest"
];

async function precache() {
  const cache = await caches.open(cacheName);
  return cache.addAll(precachedResources);
}

self.addEventListener("install", (event) => {
  event.waitUntil(precache());
});


async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open("MyCache_1");
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return Response.error();
  }
}

//
self.addEventListener("fetch", (event) => {
  var url = new URL(event.request.url);
  if (precachedResources.includes(url.pathname)) {
    event.respondWith(cacheFirst(event.request));
  }
});
