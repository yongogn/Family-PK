# Kinquest → App Store kit

## Status of the Kids-Category requirements (done in v4.9)
| Requirement | How Kinquest meets it |
|---|---|
| Parental gate before purchases, sharing, links out, settings | One grown-up gate (two-digit × two-digit on a keypad) in front of Plus, wish sharing, online play, unlock-all and Grown-ups' corner |
| No third-party analytics or ads | None in the app. Fonts and the PeerJS library are bundled inside the app |
| Data collection | None — progress is stored on the device only. App Privacy label: **Data Not Collected** |
| Online play | Off until a grown-up allows it; can be switched off in Grown-ups' corner. Point it at your own server (see `/peer-server`) before release |
| Microphone | Friendly explanation before iPadOS asks; permission strings in `Info.plist-strings.md` |
| Privacy policy URL | https://yongogn.github.io/Family-PK/quest-pk/privacy.html (update the contact line with your support email) |
| Works offline / not a web wrapper | All files are bundled with Capacitor (`webDir` = quest-pk), nothing is loaded from GitHub Pages |

## Build steps (needs a recent Mac — cloud Mac or Codemagic is fine)
```bash
npm init -y && npm i @capacitor/core @capacitor/cli @capacitor/ios
cp appstore/capacitor.config.json ./capacitor.config.json   # webDir points at quest-pk
npx cap add ios && npx cap sync ios
npx cap open ios        # Xcode: set Team, bundle id, version; add the Info.plist strings; Product → Archive
```
- Remove the service worker registration in the packaged app if Xcode warns (Capacitor serves files itself).
- Target: iPad only for version 1 (Xcode → General → Supported Destinations: iPad).

## App Privacy answers (App Store Connect)
- Do you collect data? **No.**
- Tracking? **No.**

## Notes for the App Review team (paste into "Review notes")
> Kinquest is a family learning game. All progress is stored locally; there are no accounts.
> Grown-up areas (Grown-ups' corner, online play, Plus, sharing) are protected by a parental gate: solve the
> two-digit multiplication shown (e.g. 14 × 17 = 238) on the keypad.
> Two-device play (Arcade → Duel Table) needs two devices with the app; one taps "Two iPads — start a table",
> the other "Join a table" and types the code. Single-device modes (vs robot, two players on one iPad) need nothing extra.
