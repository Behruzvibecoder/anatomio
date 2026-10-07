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

## Third-party assets

Some landing-page illustrations, animations, type assets, and assets within the supplied dashboard belong to their respective rights holders. Review applicable licenses before reusing or publishing them.
