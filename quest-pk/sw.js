// Quest PK offline cache.
// The game page is fetched fresh whenever the iPad is online (so updates arrive on their own),
// and the saved copy is used when offline. Player progress lives in the browser's storage,
// which this file never touches.
const CACHE = "questpk-v42";
const FILES = ["./assets/sky/landmarks.webp", "./assets/sky/liveries.webp", "./assets/sky/submarine.webp", "./assets/arcade-toys/fighters.webp", "./assets/arcade-toys/island-cast.webp", "./assets/arcade-toys/maze.webp", "./assets/arcade-toys/props.webp", "./assets/arcade-toys/lagoon.webp", "./assets/arcade-toys/playroom.webp", "./assets/sky/scenery.webp", "./assets/sky/pilots.webp", "./assets/sky/robots.webp", "./assets/sky/ocean.webp", "./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./assets/worlds.png", "./assets/arcade-sprites.png", "./assets/arcade-island.png", "./assets/companions.png", "./assets/avatars/axolotl.webp", "./assets/avatars/bear.webp", "./assets/avatars/bunny.webp", "./assets/avatars/cat.webp", "./assets/avatars/dino.webp", "./assets/avatars/dragon.webp", "./assets/avatars/fox.webp", "./assets/avatars/monkey.webp", "./assets/avatars/owl-cheering.webp", "./assets/avatars/owl-encouraging.webp", "./assets/avatars/owl-happy.webp", "./assets/avatars/owl-thinking.webp", "./assets/avatars/panda.webp", "./assets/avatars/penguin.webp", "./assets/avatars/robot.webp", "./assets/avatars/tiger.webp", "./assets/avatars/unicorn.webp"];
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
