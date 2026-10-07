# Anatomio — Anatomy Learning Landing Page

A static, three-language Anatomio landing page for exploring human-anatomy learning topics. A successful demo registration opens the user-provided React/Vite experience at `/dashboard/`; its supplied UI source is kept unmodified.

## Run locally

For the Anatomio landing page, start a static file server from this directory:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

To build the complete GitHub Pages site, including the dashboard route:

```bash
npm ci --prefix dashboard-app
npm run build --prefix dashboard-app -- --base=./
node scripts/prepare-pages.mjs
```

The assembled static site is written to `_site/`.

## Demo behavior

- Sign-in and sign-up are demonstration-only. They do not create accounts, authenticate users, or send form data to a server.
- Completing the demo sign-up form navigates to the imported `/dashboard/` page. Dashboard pages use sample data and client-side state; they do not authenticate users, save changes to a server, or load real course content.
- Anatomy-topic controls provide local UI feedback only; they do not load course content.
- The landing page and animations are static client-side assets; there is no backend.
- The landing page language selector supports Russian, English, and Uzbek.

## Imported dashboard source

The supplied React dashboard is stored in `dashboard-app/`. The GitHub Pages workflow builds the app and packages it under `/dashboard/`; the post-build step adjusts root-relative public image paths when present.

## Third-party assets

Some landing-page illustrations, animations, and type assets, as well as third-party branding and imagery within the imported dashboard, belong to their respective rights holders. Review the applicable licenses before reusing or publishing them.
