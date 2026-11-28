// Kinquest matchmaking server: helps two devices find each other with a room code.
// It only relays connection set-up messages; it stores no data and keeps no logs of game content.
const { PeerServer } = require('peer');
const port = Number(process.env.PORT) || 9000;
PeerServer({ port, host: process.env.HOST || '0.0.0.0', path: '/kq', proxied: true, allow_discovery: false, alive_timeout: 60000 });
console.log(`Kinquest peer server listening on :${port}/kq`);
