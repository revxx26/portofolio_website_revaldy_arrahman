# Gallery, live demo, social preview and owner analytics

## Edit content in Sanity

- Projects → Link live demo / dashboard: leave blank to hide the button. Only Customer Churn has a demo initially. Tableau Public views open in an on-demand in-page modal; other HTTPS demos open in a new tab.
- Project main image and additional images form one gallery. Each enlarge button opens its corresponding image, with next/previous, keyboard arrows, mobile swipe and zoom. Images themselves remain non-clickable.
- Volunteer and Certifications → Galeri gambar tambahan: add real supporting images with EN/ID captions and alt text. The full-size original is automatically the first image. A single-image entry hides gallery navigation. Do not add duplicates just to make a gallery.
- No project filtering was added.

## Activate Google Analytics 4

1. Open https://analytics.google.com/ and sign in to your Google account.
2. For a new account choose Start measuring, create an account and a property named Revaldy Portfolio. Choose Indonesia / Jakarta time and the appropriate reporting currency. Review and accept Google's terms yourself.
3. Choose Web as the data stream. Enter your actual public website URL (the Render URL if that is your public deployment), and name the stream Portfolio.
4. Copy the Measurement ID beginning with `G-`. It is a public website configuration value, not your account password.
5. Open https://revaldy-portfolio-admin.sanity.studio/ → Profile & CV → Google Analytics Measurement ID. Paste only that ID and Publish. No code or redeploy is needed to activate it on the current CMS-connected website.
6. Visit the website and check GA4 Reports → Realtime. Ad blockers, browser privacy settings and opted-out visitors can prevent collection. Localhost testing is excluded.
7. Leave the ID blank and Publish to disable analytics for new page loads. Refresh an existing browser session to remove an already-loaded Google script entirely.

Events: `page_view` (GA4), `cv_click` (click intent, not a completed download), `project_demo_click`, `project_github_click`, `case_study_open`, `gallery_open`. Custom events contain only content IDs and gallery image counts. No form email, message, image URL or URL query string is supplied in custom events. Google handles its standard technical visit data under your GA4 settings. Google Signals and ad personalization signals are disabled; DNT and Global Privacy Control are respected. Statistics are viewed in the owner's Google Analytics account, never as a public visitor counter. Analytics remains off until a valid, real ID is supplied; live delivery cannot be verified before that.

Official setup: https://support.google.com/analytics/answer/9304153?hl=en

## Social sharing preview

The static 1200 × 630 PNG is `public/images/social/portfolio-preview.png`, composed with Next's ImageResponse from the existing portrait and character logo. Regenerate with `node scripts/generate-social-preview.mjs` after editing that design. Open Graph and Twitter metadata reference this image.

On Render, set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS Render origin and rebuild so absolute metadata URLs point to that deployment. Update the GitHub repository with this source and allow Render to rebuild. Add the Render origin to Sanity CORS if it has not been added.

The current Sites publication is owner-private. Its audience is unchanged; public social crawlers cannot read an authenticated private page. Sharing previews can be checked on the updated public Render deployment. Platforms may cache an old preview and need a refresh through their sharing debugger.

Tableau embedding reference: https://help.tableau.com/current/pro/desktop/en-us/embed_list.htm
