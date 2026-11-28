# Kinquest → App Store kit

## Status of the Kids-Category requirements (done in v4.9)
| Requirement | How Kinquest meets it |
|---|---|
| Parental gate before purchases, sharing, links out, settings | One grown-up gate (two-digit × two-digit on a keypad) in front of Plus, wish sharing, online play, unlock-all and Grown-ups' corner |
| No third-party analytics or ads | None in the app. Fonts and the PeerJS library are bundled inside the app |
| Data collection | None — progress is stored on the device only. App Privacy label: **Data Not Collected** |
| Online play | Off until a grown-up allows it; can be switched off in Grown-ups' corner. Point it at your own server (see `/peer-server`) before release |
| Microphone | Friendly explanation before iPadOS asks; permission strings are added automatically by `codemagic.yaml` |
| Privacy policy URL | https://yongogn.github.io/Family-PK/quest-pk/privacy.html (update the contact line with your support email) |
| Works offline / not a web wrapper | All files are bundled with Capacitor (`webDir` = quest-pk), nothing is loaded from GitHub Pages |

## Build with Codemagic (no Mac needed)
The recipe is `codemagic.yaml` at the top of the repo. It bundles `quest-pk/` into an iPad app with Capacitor,
adds the icon, permissions and version, signs it and uploads it to TestFlight.

**One-time setup**
1. **Apple Developer Program** — enrol at developer.apple.com (US$99/year). Wait for approval.
2. **Create the app record** — App Store Connect → Apps → ＋ New App: Platform iOS, Name *Kinquest*,
   Bundle ID *com.yongogn.kinquest* (register it under Certificates, Identifiers & Profiles → Identifiers first),
   SKU *kinquest-001*. Then open App Information and copy the **Apple ID** number.
3. **API key** — App Store Connect → Users and Access → Integrations → App Store Connect API → ＋,
   name *Codemagic*, access **App Manager**. Download the .p8 file (only once!) and note the Issuer ID and Key ID.
4. **Codemagic** — sign up at codemagic.io with GitHub (free personal plan: 500 macOS minutes/month).
   Add the `yongogn/family-pk` repo. Team/Personal settings → Integrations → App Store Connect → Connect:
   name it **Kinquest ASC**, paste Issuer ID, Key ID and upload the .p8.
5. In `codemagic.yaml`, replace `APP_STORE_APPLE_ID: 0000000000` with the Apple ID from step 2 (Claude can do this).

**Each release**
- Codemagic → the app → **Start new build** → workflow *Kinquest iPad → TestFlight*. ~15 minutes.
- The build appears in TestFlight; add yourself/family as testers, try it on the iPads, then submit for review.
- Bump `APP_VERSION` in `codemagic.yaml` for each App Store version (1.0.0 → 1.0.1 …). Build numbers count up automatically.

## App Privacy answers (App Store Connect)
- Do you collect data? **No.**
- Tracking? **No.**

## Notes for the App Review team (paste into "Review notes")
> Kinquest is a family learning game. All progress is stored locally; there are no accounts.
> Grown-up areas (Grown-ups' corner, online play, Plus, sharing) are protected by a parental gate: solve the
> two-digit multiplication shown (e.g. 14 × 17 = 238) on the keypad.
> Two-device play (Arcade → Duel Table) needs two devices with the app; one taps "Two iPads — start a table",
> the other "Join a table" and types the code. Single-device modes (vs robot, two players on one iPad) need nothing extra.
