# Revaldy Arrahman · Data portfolio

A responsive, light editorial portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, and Lucide icons. The site exports to `out/` and can be hosted as static files. Motion is limited to hover states and smooth anchor navigation, with reduced-motion support.

## Develop

```sh
npm install
npm run dev
npm run typecheck
npm run build
npm run verify
npm run preview
```

## Content and assets

The portfolio is connected to Sanity project `nbm85yy3` (`production`). The
separate `studio/` dashboard manages EN/ID projects, experience, volunteer,
certifications, skills, profile and CV. See [Sanity setup and editor guide](docs/sanity.md).
Published changes load when visitors open the page; draft content stays private.
Static builds include the latest available snapshot, with bundled content as fallback.

Volunteer teaching and two certificates were added from the owner's supplied
photos, certificate images, and descriptions. See `docs/volunteer-and-certifications.md`
for photo mapping, exact certificate dates, issuer attribution, and source limits.

Project figures, volunteer photos, and certificates open in an in-page modal
through dedicated enlarge or View certificate buttons. Thumbnail areas are not
clickable. The viewer supports original-size zoom, Escape, closing, focus return,
and scrolling the enlarged image without navigating away. Multi-image galleries support previous/next, arrow keys and mobile swipe. Live Tableau demo, social sharing preview and optional private GA4 analytics are documented in [feature setup](docs/gallery-demo-analytics.md).

The content source is `content/portfolio.ts`. The three project case studies and original screenshots come from `../Revaldy_Arrahman_Portfolio_Final.pptx`, slides 3–5. Slide 2 supplies education, slide 6 supplies tools, and slide 7 supplies experience. Additional positioning and engineering interests come from the supplied website brief. Work periods come from the supplied ATS CV: December 2025–February 2026 for the Ministry and April 2022–June 2022 for PT Palapa Alta Utama. Dates use the supplied month/year precision. Project GitHub destinations follow the owner's later instructions.

Preserve the source qualifications: MBG notebook accuracy is 81.07%, while the paper reports 90.11%; East Java paper accuracy is 92.1%, with AUC 0.276. The owner confirmed contributing Python analysis code to both team projects.

Assets are organized under:

```text
public/images/profile/
public/images/projects/
public/images/experience/
public/documents/portfolio-slides/
public/documents/cv/
```

Manage published photos, CV, project screenshots and links through Sanity Studio.
The local `content/` and `public/` files supply the fallback content and original
assets; editing only these does not replace published CMS content.

Portfolio deck download links have been removed. The original source deck and extracted source inspection files remain available locally. The ATS CV remains downloadable from the hero.

Contact includes the owner's supplied email, LinkedIn, and GitHub profiles. The email and message form uses native email validation and opens a prefilled `mailto:` draft; visitors send the draft through their email app. It does not submit to a server or store messages.

## Design system

- Paper `#fafaf8`, ink `#202724`, forest accent `#254b3f`, muted text `#5e6660`.
- Maximum content width: 1,200px. Desktop gutter: 56px, tablet: 32px, mobile: 20px.
- Main font and labels: Segoe UI / Helvetica Neue system sans, with regular upright headings and no decorative serif or monospace treatments.
- Spacing rhythm: 4/8/12/16/24/32/48/64/96px.
- Rules use `#d9ddd6`; cards use 12px corners, images 10px, and controls 8px.
- No shadows, skill meters, decorative charts, or invented results.
- Navigation highlights the visible section. The mobile icon menu uses native details/summary so it can open without JavaScript; with JavaScript it closes after selecting a link, on Escape, and when switching to desktop. Case studies use accessible native disclosure controls.

The supplied portrait and original ATS PDF are now connected through `profile.photo` and `profile.cv`. Skills use a compact responsive grid with exactly the ten tools requested by the owner. Brand marks are stored locally under `public/images/skills/`; SQL and AI Tools use neutral Lucide icons because they are categories rather than product brands.

## Hosting

Render deployment is configured by `render.yaml`, with Node pinned in
`.node-version`. See `docs/render-deployment.md` for the repository layout,
dashboard settings, and verification steps. The Render build also runs the
export checks before publishing `out/`.

`.openai/hosting.json` identifies the private Sites project and uses the Next.js static `out/` build. Keep that project identity when publishing later updates.

Production checks and their limits are documented in `docs/production-readiness.md`. The active portrait and organization logos use smaller WebP variants; original PNG assets are preserved.

## Move to C:\website\portfolio

Copy this `portfolio/` source, keeping `public/`, `scripts/`, `studio/`, both
lockfiles and dotfiles such as `.node-version` and `.gitignore`.
See [the production move checklist](docs/production-move.md) for exclusions and
commands. Sanity data remains online; do not run `cms:seed` again after moving.
