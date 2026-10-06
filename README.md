# Anatomio — Anatomy Learning Landing Page

A Russian-language, static landing-page prototype for **Anatomio**, a project focused on learning human anatomy through clear explanations, visual topics, and short study sessions. The onboarding hero uses a custom text-based Anatomio wordmark, the project’s supplied owl artwork, and a compact responsive layout.

## Run locally

From this directory, start a static file server:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`.

## Demo behavior

- Sign-in and sign-up dialogs are demonstration-only. They do not create accounts, authenticate users, or send form data anywhere.
- Anatomy-topic controls provide local UI feedback only; they do not load course content.
- The landing page and animations are static client-side assets; there is no backend.
- The language selector is a visual demo; translated interfaces are not connected.

## Brand and third-party assets

- `assets/anatomio-brand.css` defines the Anatomio wordmark, palette, onboarding layout, and phone breakpoints.
- `assets/anatomio-owl-cutout.png` is a transparent mascot cutout made from the owl artwork supplied for this project; the rendered wordmark is HTML text, not the original white-background image.
- The self-hosted Nunito variable font subsets in `assets/nunito-*.woff2` come from Google Fonts and are licensed under the SIL Open Font License 1.1. See `assets/OFL-Nunito.txt`.
- Some legacy illustrations and animations in the lower landing-page sections remain from the earlier visual reference. They belong to their respective rights holders; review the applicable licenses before reusing or redistributing them.
