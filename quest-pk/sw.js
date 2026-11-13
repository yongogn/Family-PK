// Quest PK offline cache.
// The game page is fetched fresh whenever the iPad is online (so updates arrive on their own),
// and the saved copy is used when offline. Player progress lives in the browser's storage,
// which this file never touches.
const CACHE = "questpk-v18";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./assets/companions.png", "./assets/worlds.png", "./assets/arcade-sprites.png", "./assets/arcade-island.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("questpk-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  const scope = new URL(self.registration.scope).pathname;
  if (!url.pathname.startsWith(scope)) return;
  const isPage = url.pathname === scope || url.pathname === scope + "index.html";
  if (isPage) {
    // network first, fall back to the saved copy when offline
    e.respondWith(
      fetch(e.request, {cache: "no-store"}).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); }
        return res;
      }).catch(() => caches.match("./index.html").then(hit => hit || caches.match("./")))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }))
  );
});
