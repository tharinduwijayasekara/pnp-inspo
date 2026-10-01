# CLAUDE.md

Painting-inspiration gallery for the Paints & Potions art café. One QR code → one URL →
customers pick the blank they're painting and scroll design ideas for that shape.

Deployed at <https://tharinduwijayasekara.github.io/pnp-inspo/> (GitHub Pages, `main` / root).

`README.md` covers day-to-day maintenance. This file covers the constraints that are easy to
break without noticing.

## Hard constraints

- **No framework, no build step, no npm, no backend.** Plain HTML + CSS + vanilla JS, served as
  static files. Don't introduce a bundler, a package.json, or a JS library.
- **All paths stay relative** (`assets/css/style.css`, `images/<key>/<file>.jpg`). The site is
  served from `/pnp-inspo/`, not from the domain root. A leading `/` breaks everything.
- **One HTML file.** Both screens live in `index.html` and are toggled via the `hidden`
  attribute. Never add a second page for a topic.
- **No directory listing.** GitHub Pages is static; the browser cannot enumerate `images/`.
  The `topics` object is the only source of truth for what exists. This is deliberate.

## Where things live

- `assets/js/app.js` — the `topics` config object (~line 95) is the only thing a non-developer
  edits. Each key **must** match a folder name under `images/`. Everything below "THE ENGINE"
  is machinery.
- `assets/css/style.css` — all styling, including the gallery layout.

## Layout rules

- **The magazine layout is CSS-only.** JS emits a flat list of identical `<figure class="shot">`
  elements and never positions, measures, or sizes anything. Arrangement comes from
  `column-count` plus `:nth-of-type()` rules. Keep it that way — it's why adding a photo is a
  one-line config edit.
- `:nth-of-type`, not `:nth-child` — interludes are interleaved `<p>` elements and would
  otherwise throw the counting off.
- **Photos keep their natural proportions** in the gallery: `width: 100%; height: auto`, no
  cropping. They're painting references, so the whole image has to stay visible. `object-fit:
  cover` is used *only* on the topic-card previews on the cover screen.
- **Feature slots are capped at `--feature-max: 720px`.** Every source photo is ≤736px wide, so
  anything wider visibly softens. Raise the cap only if the photos get bigger.
- **On mobile every photo is full width.** Indenting or alternating edges in a single column
  reads as misalignment, not design — this was tried and removed. Asymmetry lives at ≥680px only.

## Gotchas

- **Photos must fail visible.** The fade-in is a `@keyframes` animation with **no fill mode**,
  layered over an already-visible base style. Do not "simplify" it back to `opacity: 0` plus a
  transition — a stalled transition would leave a photo permanently invisible, which is the
  worst failure this site can have.
- **`overflow-x: clip` on `body`, not `hidden`.** `hidden` creates a scroll container and breaks
  `position: sticky` on the gallery top bar.
- **`[hidden] { display: none !important }`** is load-bearing: several components set a `display`
  value that would otherwise beat the browser default.
- **The logo master is CMYK.** `logo/pnp-main-logo.jpg` is a 1.3MB CMYK print file whose raw
  pixels read plum, not violet. The site loads `logo/pnp-logo-web.jpg` (53KB, sRGB). The CSS
  palette is sampled from the *converted* file — don't sample the master.
- **Missing files and empty topics must stay non-fatal.** A broken filename drops only its own
  figure; an empty `images: []` shows the "no ideas yet" state.

## Testing

Serve from the **parent** directory so the URL matches GitHub Pages:

```bash
cd ..
python -m http.server 8000      # then open http://localhost:8000/pnp-inspo/
```

Serving from inside the folder hides path bugs that only appear under `/pnp-inspo/`.

Check at 320 / 390 / 768 / 1440px: no horizontal scroll, photos keep their proportions, lightbox
opens and closes via ×, outside-click and `Esc`, and arrows/swipe navigate.

## Environment

This repo lives under a directory owned by a different Windows account, so git needs:

```bash
git config --global --add safe.directory D:/Apps/pnp-inspo
```
