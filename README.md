# EDC × Snapchat Home — SVG Festival Map (Expo)

This is the react-native-svg version of the festival map, styled after the
Snap Map screenshot: organic glowing zone blobs, a dark night-sky background,
avatar badges (with handles like `@Jade`) sitting on top of each zone, and a
bottom-sheet info card that deep-links out to Snapchat.

## New/changed files in this version

```
FestivalMap.js          NEW — SVG background: zone blobs, glow, stars, labels
Hotspot.js               updated — now supports a real avatar image + handle text
Locations.js             updated — added zoneId/handle/avatar fields per hotspot
HomeScreen.js             updated — renders FestivalMap behind the hotspots
assets/avatars/bitmoji_jade.png   your uploaded bitmoji, wired to the "Lens Kit" hotspot
InfoCard.js               unchanged
App.js                    unchanged
```

## One extra install step

This version adds `react-native-svg`. In your project folder:

```bash
npx expo install react-native-svg
```

(`expo install` instead of `npm install` — it picks the exact version that
matches your installed Expo SDK, which matters for native modules like this
one.)

Then run as usual:

```bash
npx expo start -c
```

## How the map is built

`FestivalMap.js` doesn't use any map image — every zone is generated at
runtime as an "organic blob" path (a ring of points at slightly varying
radii, connected with smooth quadratic curves), so there's nothing to design
in Photoshop or export as an asset. Each zone has:

- a soft radial-gradient glow behind it
- a semi-transparent colored fill
- a thin colored outline
- a label (e.g. "KINETIC FIELD") floating just below it

Edit the `ZONES` array in `FestivalMap.js` to:
- move a zone (`cx`, `cy` — same 0–100 scale as the hotspot `x`/`y` in `Locations.js`)
- resize it (`r`)
- reshape it (`variances` — an array of multipliers; more variation = spikier blob)
- recolor it (`color`)

## Avatar badges

`Hotspot.js` renders either:
- a real image, if `Locations.js` sets `avatar: "image"` for that entry (and
  `Hotspot.js`'s `AVATAR_IMAGES` map has a matching image for that `id`), or
- an emoji, using `avatarEmoji` from `Locations.js`

Right now only the "Lens Kit" hotspot (`id: "lens"`) uses your uploaded
bitmoji. To add more real photos/bitmojis:

1. Drop the image in `assets/avatars/`
2. In `Hotspot.js`, add a line to `AVATAR_IMAGES`:
   ```js
   const AVATAR_IMAGES = {
     "lens": require("./assets/avatars/bitmoji_jade.png"),
     "spotlight": require("./assets/avatars/your_new_image.png"),
   };
   ```
3. In `Locations.js`, set `avatar: "image"` on that location entry

## Notes on the deep-link fallback

`Linking.canOpenURL('snapchat://...')` needs the scheme whitelisted in
`app.json` for iOS to report it accurately — already set up:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "LSApplicationQueriesSchemes": ["snapchat"]
      }
    }
  }
}
```

If your `app.json` doesn't have this yet, add it — without it, `canOpenURL`
may return `false` even with Snapchat installed, and the app will just fall
back to the website. Still functional, just not a direct app hand-off.
