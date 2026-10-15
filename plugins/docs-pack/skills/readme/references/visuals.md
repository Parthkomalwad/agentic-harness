# README visuals

## Dark and light hero
```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="docs/assets/hero-light.svg">
  <img src="docs/assets/hero-dark.svg" alt="Describe what the image shows, as a sentence." width="900">
</picture>
```
- Keep heroes in `docs/assets/`. Hand-written SVG: monospace font, one accent color, rounded panels, about 900x300.
- The `alt` text describes the content of the image for screen readers.
- After writing an SVG, render it (for example a Playwright screenshot of the file) and check that no text overlaps or clips.

## Badges
`https://img.shields.io/badge/<label>-<message>-<hex>?labelColor=0F1117`. One accent hex for all badges. CI badge from `actions/workflows/<file>/badge.svg`.

## Screenshots and GIFs
Crop to the relevant area. Width 900 or less. Under 5 MB per GIF. Show a real result, not an empty state.
