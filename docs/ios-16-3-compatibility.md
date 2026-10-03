# Safari 16.3 compatibility repair — 3 October 2026

Reported device: iPhone, iOS 16.3.1, Safari.
Reported URL: https://revaldyarrahman.onrender.com/.

## Identified blocker

The deployed `_next/static/chunks/22looll5q1d3y.js` contained this Next.js boundary:

```js
class p extends o.default.Component {
  static { this.contextType = d.AppRouterContext }
  // ...
}
```

Class static initialization blocks arrived in Safari 16.4:
https://webkit.org/blog/13966/webkit-features-in-safari-16-4/.
Next.js 16's default browser targets also start at Safari 16.4:
https://nextjs.org/docs/architecture/supported-browsers.

Safari 16.3 rejects the entire chunk at parse time, before React can hydrate the
page. This explains why all unrelated controls fail together: the header's
language/theme buttons remain in their initial disabled state, while image/demo
buttons and touch-card handlers never attach.

The Render deployment had the previous UI fixes and served all checked scripts
with HTTP 200 and JavaScript content types. It was not missing the latest UI code.

## Change

- Set explicit Safari and iOS Safari 16.3 browser targets in `package.json`.
- Select Webpack for production and development; its compiler transforms the
  unsupported syntax using the configured browser targets.
- Add an Acorn-based emitted-bundle check to `npm run verify`. It examines actual
  syntax nodes, so text containing `static {` is not falsely rejected.
- Preserve the existing modal, touch feedback, theme, language and scroll behavior.

## Validation

- The current deployed bundle fails the new check specifically on a StaticBlock.
- The new production export's 21 JavaScript bundles and inline scripts pass.
- Production build, TypeScript and existing static export verification pass.
- Browser testing at 390 × 844: language and theme controls respond; all seven
  image/certificate preview triggers open and close a same-page modal; Tableau
  renders inside its live-demo modal. No horizontal page overflow.
- Browser automation uses Chromium. An actual Safari 16.3.1 device is not available
  in this environment; final confirmation requires deploying and testing on the
  reported iPhone. These checks do not certify every newer framework API for all
  older browsers.

## Release

Push the changes from `C:\website\portfolio` and wait for Render's deployment to
finish. Keep Build Command `npm ci --include=dev && npm run build && npm run verify`
and Publish Directory `out`. A fresh Safari Private tab can distinguish the new
deployment from cached assets when checking the iPhone.
