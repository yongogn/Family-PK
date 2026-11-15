# Illustrated arcade artwork (v4.1)

Original painted toy artwork for Splash Maze, Island Dash and Toy Brawl.
Dedicated arcade characters; player profile avatars are not used in these games.
All sprite cells are 256 × 256, read left to right and then top to bottom.

| WebP | Layout / contents | Bytes |
| --- | --- | ---: |
| fighters | 4 × 4: bunny, robot, dinosaur, cat rows; ready, punch, kick, guard columns | 287,982 |
| island-cast | 4 × 2: explorer standing/running/jumping, snail, crab, frog, bee, egg | 122,710 |
| maze | 4 × 2: four otters, solid wall, crate, grass, balloon | 100,464 |
| props | 4 × 3: apple, banana, grapes, watermelon, pineapple, mango, star, rocks, grass edge, earth, log, flag | 148,248 |
| lagoon | 1280 × 720 background | 114,336 |
| playroom | 1120 × 630 background | 76,854 |
| **Total** | | **850,594** |

Images load when the respective renderer first requests them, and the service
worker precaches all six for offline use. Maze terrain rebuilds only when its
cells, dimensions or image readiness change. Island terrain uses a bounded
four-chunk cache. The Brawl stage is cached per viewport. Small glow, shadow,
splash and smoke stamps are shared. Floating effects draw at most 80 entries
in Island Dash and 60 in Toy Brawl, while all original effects still age on
their original schedule.

## Verification

Validated in Chromium on 15 November 2026, including after merging main v4.0:

- Source comparison against v4.0: everything outside presentation helpers,
  render bodies, menu illustrations, styles and version metadata is unchanged.
  The complete Island simulation/control code, all Maze/Brawl simulation,
  scoring, physics, networking, reward rules, avatars and v4.0 additions remain.
- Splash Maze: movement, balloon placement, timed splashes, robot players and
  two-human local launch.
- Island Dash: running, jumping, scrolling, illustrated collectibles and terrain.
- Toy Brawl: robot match, punch, kick, special cooldown, sixteen illustrated
  roster poses and two-player local launch.
- Render-only fixtures preserve game state and add no random-number calls.
  Cache reuse and the four-chunk terrain bound checked.
- Layouts checked at 1180 × 820, 820 × 1180, 390 × 844 and 320 × 740.
- Six WebPs precached; all three games launch and decode artwork offline.
- No JavaScript runtime errors in those checks.

These are browser checks, not a physical older-iPad benchmark. Live WebRTC
multiplayer was not revalidated; its implementation is unchanged.
