# Production audit — 3 October 2026

Scope: the current Next.js static portfolio, its Sanity normalization and admin
tooling, the exported production files, and a clean source copy in a different
directory. Browser QA used the generated export on a local static server.
No blocking website bug was found in the tested flows.

## Changes made

- Patched five vulnerable transitive packages used by Sanity admin tooling:
  adm-zip, undici, js-yaml, smol-toml and uuid. Targeted overrides preserve
  Sanity 6.17.0; the Studio lockfile records the patched resolution.
  Initial Studio audit reported 14 affected package entries (10 moderate,
  4 high); the final full Studio audit reports zero.
- Explicitly set Turbopack's root to the current project directory. A nested
  clean-copy build exposed automatic selection of the parent checkout; the
  explicit root prevents resolving source/dependencies from that parent.
- Excluded the ignored QA folder from the website TypeScript project so a
  temporary source copy is not mistaken for website source. Website type
  checks remain enabled; Studio is checked separately.
- Updated move/Render instructions for Sanity, build-time environment values,
  public social-preview URLs and domain-specific CORS. Removed seed from the
  ordinary folder-move procedure and corrected outdated content-edit guidance.

## Verification completed

- Production website build and TypeScript checks passed.
- `npm run verify`: 15 local asset references, existing anchors, unique IDs,
  one H1, image alt attributes, 3 HTTPS GitHub buttons, local PDF fallback,
  original viewer assets, language/theme controls, metadata and 404 output.
- Full website dependency audit: zero reported vulnerabilities.
- CMS tests passed: initialization, intentional empty/deleted collections,
  drafts, archive, ordering, bilingual copy, image dimensions, safe links,
  optional demo/analytics and galleries.
- Analytics checks passed: inactive before setup; custom event payloads are
  restricted to content ID and image count. Localhost does not load GA4.
- Studio TypeScript check and production build passed after dependency patches.
  TypeID generation/parsing with patched UUID also passed.
- Full Studio dependency audit after patches: zero reported vulnerabilities.
- HTTP smoke check: homepage, 13 unique referenced local resources and 21
  published CMS images returned 200; the published CV returned 200 and a
  `%PDF-` header (147,423 bytes); an unknown local route returned 404.
- Clean source copy: `npm ci --include=dev`, production build and export
  verification passed without copied node_modules, build cache, .env files,
  .git, source-material or attachment Temp files. After explicit Turbopack
  root configuration, the copy builds from its own source/dependencies.

## Browser checks

- Desktop 1440px, tablet 768px, and mobile 320px/390px: no unintended horizontal
  page overflow in the tested layouts. Contact fields and certificate controls fit.
- Mobile icon menu opens, closes after section selection, and closes with Escape
  while restoring focus. Section tracking reaches Contact at the page bottom.
- EN/ID switch, dark/light mode, and persistence across reload work. QA restored
  the original Indonesian/light preferences afterward.
- Native case-study disclosure opens with Enter and closes with Space. The
  summary's interactive width is confined to its button; findings and source
  caveats remain readable, including the MBG metric discrepancy and East Java AUC.
- GitHub/demo controls share 180px width and 49px height in the tested desktop layout.
- Gallery opens only through the dedicated button; clicking the Excel activity
  image itself does not open the viewer. Original Power BI/Excel photos load.
- MBG gallery advances to its supporting image, zooms, closes with Escape,
  restores the triggering control's focus and releases the page scroll lock.
- SQL certificate opens in the same-page viewer on mobile; no page navigation.
- Tableau is absent from initial page load, mounts on Live demo, loads the real
  dashboard and its visualization controls, then unmounts on Escape. Focus and
  scroll are restored; an external Open in Tableau fallback remains available.
- Contact rejects malformed email and whitespace-only messages; editing clears
  the custom message error. No email was sent or valid draft submitted during QA.
- Skip link moves focus to main content. No application console errors/warnings
  were observed in the tested browser flow, including the embedded dashboard.

## Deployment conditions and limits

`C:\website\portfolio` itself has not been created or tested; the clean-copy test
establishes that the project does not depend on its current OneDrive path.
Follow [the move checklist](production-move.md), preserving source/public assets
and both lockfiles. Sanity data remains online; do not rerun `cms:seed`.

Render still needs the user's latest GitHub source, the actual public origin in
`NEXT_PUBLIC_SITE_URL`, and that origin in Sanity CORS without credentials.
Changes to build-time environment values require a rebuild. The actual Render
URL and its public deployment have not been audited in this task.

Google Analytics event delivery to the user's real GA4 property is not confirmed
by local testing; check Realtime on the public domain after setting the real
Measurement ID in Sanity. Do not treat code checks as delivery confirmation.

The contact form opens an email draft and requires the visitor to send it.
Sanity/Tableau availability and visitor browser restrictions remain external
dependencies. The Sites deployment preserves owner-private access. No audience
change, CMS content edit, Render deploy or GitHub push was performed by this audit.

This records tested behavior on the audit date, not a guarantee for every browser,
device, future CMS edit or future dependency release. No Lighthouse score or
cross-browser certification is claimed.
