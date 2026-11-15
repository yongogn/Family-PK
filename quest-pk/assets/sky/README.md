# Sky Squadron artwork — v3.5

Original painted toy artwork, generated for this app and encoded as WebP.
All sheets use four 256 × 256 cells arranged horizontally (1024 × 256).

| Asset | Cells, left to right | Bytes |
| --- | --- | ---: |
| pilots.webp | Orange, blue, green, pink; noses up | 55,118 |
| robots.webp | Drone, mini-jet, gunship, Sky Fortress; noses down | 83,498 |
| scenery.webp | Three islands, cloud | 85,960 |
| ocean.webp | 512 × 512 ocean texture | 17,692 |
| **Total** | | **242,268** |

Transparent sprite padding preserves the previous renderer's visual footprints.
Collision radii remain .034 / .03 / .062 / .17 for enemies and all player
collision rules remain unchanged. Player art uses the original 2.3r wing span.
Propellers, rotor highlights and turret lights animate in the renderer only.

The renderer caches island/cloud cutouts, a mirrored seamless water tile,
shadows, glows, smoke and stars on small canvases. Water, islands and clouds
are positioned using shared game time and world coordinates. Explosion drawing
is limited to 160 particle stamps per frame; every existing effect still ages
and expires on its original schedule. No new calls to Math.random are added.

## Verification (15 November 2026)

- Source comparison: all code outside skyDraw, its new graphics helpers, and
  the version/changelog entry is byte-identical to v3.4. Service worker changes
  only bump the cache and precache four new WebPs.
- Solo: launches through Duel Table, charges the existing token cost, advances
  the simulation and responds to dragging.
- Two pilots on one screen: each half controls its own plane independently.
- Visual fixture: four player colours, all enemy classes, boss health bar,
  four labelled power-ups, bullets, star/smoke effects and scenery inspected.
- Two/four-screen scenery comparison at three shared times: 27,216,000 colour
  channels compared; only two differed by more than 3/255 (maximum 4/255),
  consistent with canvas rounding. World positions align across viewports.
- Rendering preserves skySnap output, player/enemy state and PRNG calls.
  A 1,000-particle stress fixture draws exactly 160 particle stamps.
- All four assets precache successfully; solo runs after an offline reload.
- Desktop Chromium fixture: approximately 4 ms per frame. This is not an
  older-iPad hardware benchmark; real-device performance still needs checking.
- Public room-code test attempted in two isolated browser contexts: the room
  was created and PeerJS exchanged offer/answer messages. The WebRTC data
  channel could not open because this managed cloud browser enforces
  WebRtcIPHandling=disable_non_proxied_udp. Live multiplayer therefore remains
  unverified here; production networking was not changed to work around it.
