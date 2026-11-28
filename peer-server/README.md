# Kinquest matchmaking server

Two-iPad games and far-away Boss PK need a small "signalling" server so two devices can find each other.
Today the app uses the free public PeerJS server. For the App Store (especially the Kids Category) run your own:
it is yours, stores nothing, and the privacy policy stays simple.

## Deploy on Render (simplest)
1. render.com → New → Web Service → connect the `yongogn/family-pk` repo.
2. Root directory: `peer-server` · Build command: `npm install` · Start command: `npm start`.
3. Free plan works for testing (it sleeps when idle, so the first game of the day can take ~30 s to connect).
   The Starter plan (~US$7/month) stays awake.
4. Note the address, e.g. `kinquest-peer.onrender.com`.

## Point the app at it
In `quest-pk/index.html`, set:
```js
const KQ_SERVER = window.KQ_SERVER || {host:'kinquest-peer.onrender.com', port:443, path:'/kq', secure:true};
```
Then bump APP_VERSION / APP_DATE / the sw.js cache, and test a two-iPad game.
