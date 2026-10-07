# Anatomio — Anatomy Learning Landing Page

A static, three-language landing-page prototype for **Anatomio**. Successful demo registration opens the supplied learning dashboard at `/dashboard/`; the dashboard source is kept exactly as provided.

## Run locally

For the landing page, start a static file server from this directory:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

To build the complete Pages site, including the dashboard route:

```bash
npm ci --prefix dashboard-app
npm run build --prefix dashboard-app -- --base=./
node scripts/prepare-pages.mjs
```

The assembled static site is written to `_site/`.

## Demo behavior

- Sign-in and sign-up are demonstration-only. They do not create accounts, authenticate users, or send form data to a server.
- Completing the demo registration opens the `/dashboard/` interface. Its sample profile, course data, and UI state are client-side demonstrations and do not persist to a backend.
- The name and email typed into the demo sign-up travel to the dashboard as `?name=…&email=…` so the welcome heading can greet the visitor. Nothing is stored or sent anywhere else.
- The dashboard carries the **Anatomio** name, colours, owl mark, and typeface of the landing page; its sample course content is unchanged.
- Anatomy-topic controls provide local UI feedback only; they do not load course content.
- The landing page, dashboard, and animations are client-side; there is no backend.
- The landing page language selector supports Russian, English, and Uzbek.

## Dashboard source

The React dashboard lives in `dashboard-app/`. The GitHub Pages workflow builds it and packages it under `/dashboard/`. Its logo (`src/assets/anatomio-owl.png`), wordmark colours, and typeface (`src/assets/anatomio-sans.woff2`) are derived from the landing-page brand, so the dashboard loads no remote fonts and only needs the files already in the repository.

### Promo artwork

The dashboard was laid out around two illustrations that are not in the repository. Drop the real files in at these paths and they take over automatically — no code change and no layout edit:

| File | Card | What fits best |
| --- | --- | --- |
| `dashboard-app/public/images/app-art.png` | sidebar *Download our mobile app* tile | square (1:1), light background: the tile multiplies it into the brand green |
| `dashboard-app/public/images/premium-art.png` | *Go Premium* card | wide (about 2:1), background matching the card's ink (`#1b1d18`), subject on the right: the card covers its full area |

Until those files exist, bundled SVG stand-ins keep the layout intact.

## Anatomy icons

The uploaded **Anatomy Icon Set** (35 line icons — skeleton, skull, heart, brain, lungs, kidney, liver, stomach, spine and so on) lives in `dashboard-app/src/assets/anatomy-icons/` as compact SVGs, one file per organ with a readable name.

Use them through the component, which paints each icon with a CSS mask so it takes the colour of whatever it sits in — the same way the lucide icons behave:

```tsx
import { AnatomyIcon } from "./anatomy-icon";

<AnatomyIcon name="heart" className="size-[18px]" />
```

`AnatomyIconName` lists the available names, and each file costs under 5 KB.

## Third-party assets

Some landing-page illustrations, animations, type assets, the anatomy icon set, and assets within the supplied dashboard belong to their respective rights holders. Review applicable licenses before reusing or publishing them.
