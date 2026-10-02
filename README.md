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

The content source is `content/portfolio.ts`. The three project case studies and original screenshots come from `../Revaldy_Arrahman_Portfolio_Final.pptx`, slides 3–5. Slide 2 supplies education, slide 6 supplies tools, and slide 7 supplies experience. Additional positioning and engineering interests come from the supplied website brief. Work periods come from the supplied ATS CV: December 2025–February 2026 for the Ministry and April 2022–June 2022 for PT Palapa Alta Utama. Dates use the supplied month/year precision. Project GitHub destinations follow the owner's later instructions.

Preserve the source qualifications: MBG notebook accuracy is 81.07%, while the paper reports 90.11%; East Java paper accuracy is 92.1%, with AUC 0.276. East Java is an academic team project, with no supplied attribution of individual tasks.

Assets are organized under:

```text
public/images/profile/
public/images/projects/
public/images/experience/
public/documents/portfolio-slides/
public/documents/cv/
```

Inspect any new photo, CV, screenshot, or deck before adding it. To insert a real portrait, place it in `public/images/profile/` and set `profile.photo` to `/images/profile/filename.jpg`. This replaces the hero focus panel within its existing area. To enable Download CV, add the actual CV and set `profile.cv` to `/documents/cv/filename.pdf`. Configure real email, LinkedIn, and GitHub values in `profile`; blank values never produce fake links.

Portfolio deck download links have been removed. The original source deck and extracted source inspection files remain available locally. The ATS CV remains downloadable from the hero.

Contact includes the owner's supplied email, LinkedIn, and GitHub profiles. The email and message form uses native email validation and opens a prefilled `mailto:` draft; visitors send the draft through their email app. It does not submit to a server or store messages.

## Design system

- Paper `#fafaf8`, ink `#202724`, forest accent `#254b3f`, muted text `#5e6660`.
- Maximum content width: 1,200px. Desktop gutter: 56px, tablet: 32px, mobile: 20px.
- Main font and labels: Segoe UI / Helvetica Neue system sans, with regular upright headings and no decorative serif or monospace treatments.
- Spacing rhythm: 4/8/12/16/24/32/48/64/96px.
- Rules use `#d9ddd6`; most surfaces have square corners; buttons use 3px radius.
- No shadows, skill meters, decorative charts, or invented results.
- Navigation highlights the visible section, collapses on mobile, and supports Escape. Case studies use accessible native disclosure controls.

The supplied portrait and original ATS PDF are now connected through `profile.photo` and `profile.cv`. Skills use a compact responsive grid with exactly the ten tools requested by the owner. Brand marks are stored locally under `public/images/skills/`; SQL and AI Tools use neutral Lucide icons because they are categories rather than product brands.

## Hosting

`.openai/hosting.json` identifies the private Sites project and uses the Next.js static `out/` build. Keep that project identity when publishing later updates.

Production checks and their limits are documented in `docs/production-readiness.md`. The active portrait and organization logos use smaller WebP variants; original PNG assets are preserved.
