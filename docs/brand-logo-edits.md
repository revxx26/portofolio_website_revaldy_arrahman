# Header character and favicon

Edited with built-in ImageGen, transparent background enabled. The user's supplied three-view character sheet was the edit target. Local nearest-neighbor size variants preserve the pixel art edges for header and browser use.

Saved assets under `C:/Users/rvldy/OneDrive/Documents/web/portfolio/`:

- `public/images/brand/revaldy-character-head-source.png` — original transparent extraction.
- `public/images/brand/revaldy-character-head.png` — 256px header asset.
- `public/favicon-32.png` — 32px browser icon.
- `public/favicon-64.png` — 64px browser icon.
- `public/favicon.ico` — 32px and 64px PNG entries.
- `public/apple-touch-icon.png` — 180px touch icon.

Size variants can be rebuilt with `node scripts/build-brand-icons.cjs` using the project's existing Sharp dependency.

## Final ImageGen prompt

Use case: background-extraction. Edit target: supplied three-view pixel art character reference sheet. Extract ONLY the head of the leftmost FRONT-facing character. Include the entire green cap with its small turquoise database badge, brown curly hair, both ears, round black glasses, eyes, nose, cheeks, mouth and chin. Cut cleanly at the chin; exclude all neck, shirt, collar, torso, hands, cube and legs. Exclude the SIDE and BACK characters and all labels/text. Preserve the exact front-face character identity, original pixel art style, pixel shapes and original colors. Do not redraw into a different style, do not add anything. Produce a centered square icon with the full head filling approximately 90% of the canvas, equal small padding, crisp hard pixel edges, and genuinely transparent alpha everywhere outside the head. No background, no circle or badge behind it, no shadow, no new text. This will be a small website header logo and favicon.
