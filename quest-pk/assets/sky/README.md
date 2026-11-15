# Sky Squadron artwork and world tour

Original painted toy artwork for Sky Squadron. All image files are WebP.

| Asset | Layout | Bytes |
| --- | --- | ---: |
| pilots.webp | Four 256 × 256 cells, orange/blue/green/pink; noses up | 55,118 |
| robots.webp | Four 256 × 256 cells, drone/mini-jet/gunship/Fortress | 83,498 |
| scenery.webp | Four 256 × 256 cells, three islands/cloud | 85,960 |
| ocean.webp | 512 × 512 ocean texture | 17,692 |
| landmarks.webp | 3 × 2 cells of 384 × 384: Singapore, France, Japan, Egypt, Australia, UK | 254,010 |
| liveries.webp | 4 × 2 cells of 256 × 256: Sunbird then Nebula, four team colours per row | 128,730 |
| submarine.webp | 256 × 384 robot submarine | 15,468 |
| **Total** | | **640,476** |

The v4.3 additions total **398,208 bytes**. The new player livery sheet is below
150 KB. Existing player/enemy art, hit sizes, cached stamps and particle caps
are retained. Static water and scenery cutouts are cached. Background positions
use shared game time and world x, including on the outer coasts and across
multiple iPads. Large landmark dioramas replace the repeated little islands.
Landmark scenes are stylised miniatures, not maps to scale; facts appear in
the hangar's world-tour passport.

## v4.3 game additions

- Each wave changes the tour destination, cycling through the six countries.
- Non-boss waves from wave 2 replace one group with one submarine. Submarines
  patrol clear water lanes, show bubbles before surfacing, and can only be hit
  by normal plane shots while surfaced. Their cycle lasts
  7.4 seconds: submerged until 1.2s, surfaced until 5.6s, then submerged again.
  They fire three slow aimed bubble shots and leave after their patrol.
  Flying over a submarine does not cause a plane collision.
- A submarine awards 500 points and drops an Aegis pickup. Aegis absorbs two
  hits for up to seven seconds per pickup. Existing invulnerability after a
  shield hit is retained. Normal S shields still absorb one hit; an S pickup
  refreshes the duration without downgrading an active Aegis charge count.
- Sunbird livery unlocks at 30 learning stars; Starfield shield style at 60.
  Nebula unlocks by defeating a Fortress; Sonar hex by defeating 3 submarines.
  All unlocks persist per profile and do not spend or grant learning stars.
  Cosmetics have identical gameplay abilities. Local shared-screen play uses
  the selected profile's styles in both player colours. A Fortress counts once
  per profile in a local match and rewards every connected pilot in a squadron.
- Kill rewards are applied once per enemy, preventing duplicate score and
  achievement credit from repeated damage callbacks.
- Per-pilot styles, Aegis charges, submarine state and bubble-shot appearance
  round-trip through snapshots. Old snapshots default to classic/bubble.
  Network look messages accept only known style IDs and change no abilities.

## Verification (15 November 2026)

- All code outside Sky Squadron, its hangar/style UI and version metadata is
  unchanged from v4.2. The tougher v4.2 difficulty values remain, as do learning
  batches, token charges, other arcade games and the restored Custom builder.
- Browser tests: submarine spawn timing, submerged immunity, surfaced damage,
  bubble salvos, departures, unique score/achievement credit, Aegis hits and
  expiry, reward thresholds, locked selections and saved look persistence.
- Solo and two local pilots: relative drag controls and existing payment/batch
  rules verified. Six destination scenes and earned/locked hangars inspected.
- Host/guest snapshot encode/decode exercised in two isolated browser contexts;
  subtype, hit radius, bubble shots, Aegis charges and styles preserved.
- All six routes compared across two/four viewports at two shared times:
  27,216,000 colour channels; 155 differed by more than 4/255, maximum 7/255
  (canvas rounding). World geometry and scrolling align across viewport seams.
- Hangar/passport fit 320, 390, 820 and 1180 px widths. New WebPs precached;
  artwork, hangar and solo launch work after an offline reload. No runtime errors.

Live multiplayer is not verified: this managed cloud browser enforces
`WebRtcIPHandling=disable_non_proxied_udp`, preventing the WebRTC data channel.
A physical older-iPad performance and real two-device play check remain.
Refresh every participating iPad to v4.3 before joining a room.
