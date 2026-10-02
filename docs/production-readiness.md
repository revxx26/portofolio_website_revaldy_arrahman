# Production audit — 2 October 2026

Scope: the current Next.js static portfolio, tested against the generated `out/` export through a local static server, rather than only the development server.

## Fixes

- Section tracking now recalculates from scroll position and viewport size. The previous intersection callback could leave Skills highlighted while Contact was visible at the bottom of a tablet viewport.
- Contact rejects messages containing only whitespace, clears the error after editing, associates the explanatory note with the form, and has a native mailto fallback instead of a default GET to the site.
- Skip to content moves keyboard focus to the main content.
- The mobile menu button meets a 44px touch size.
- Reduced-motion mode removes the Skills hover translation as well as animation and transition.
- Three organization marks use 128px lossless WebP variants; the portrait uses a 760px WebP with transparency. These four active assets total 103,740 bytes, down from 4,367,416 bytes. Original source assets remain available.

## Verification

- Production build and TypeScript checks passed.
- `npm audit` and `npm audit --omit=dev`: zero reported vulnerabilities at audit time.
- `npm run verify`: 39 local asset references exist; all anchor targets exist; IDs are unique; there is one H1; all images have alt attributes; three project GitHub buttons have the expected destinations; CV is an actual PDF; favicon files and 404 output exist.
- HTTP check of the static preview: 31 unique referenced resources returned 200; an unknown route returned 404.
- Browser: Home/About/Projects/Experience/Skills/Contact navigation, home logo, direct `#projects` load, active section after resize and at the page bottom.
- Keyboard: skip link, Enter to expand and Space to collapse each of the three case studies, Escape to close the mobile menu.
- Contact: malformed email, whitespace-only message, error recovery after editing, valid field state. No email was sent during QA.
- CV download completed through the browser as a PDF.
- Responsive checks at 320px, 768px and 1440px: no horizontal overflow; project columns remain aligned; contact fields fit; mobile navigation opens and closes after selection.
- Optimized portrait and logos loaded; no browser console errors or warnings were observed in the tested flow.

## Operational limits

The contact form opens a draft in the visitor's email application. It is not a server-side delivery service, and delivery depends on the visitor sending that draft. MBG Sentiment and East Java Poverty link to the owner's GitHub profile as explicitly requested; Customer Churn links to its repository.

The Site is owner-private. This audit preserves its access configuration. Public visitor access has not been enabled.

These checks establish the tested behavior, not a guarantee that every device, browser or future dependency state is free of bugs. No Lighthouse score or cross-browser certification is claimed.

## Repeat checks

Run `npm run build`, `npm run verify`, and `npm audit`. Use `npm run preview` to serve the exported version at `http://127.0.0.1:3001` for browser checks. Optimize source images with `node scripts/optimize-images.cjs` before building when they change.
