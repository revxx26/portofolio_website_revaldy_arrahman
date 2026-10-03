# Deploy to Render

This project uses Next.js static export. Deploy it as a Render **Static Site**.

## Repository

Upload the contents of `portfolio/` to a GitHub repository with `package.json`,
`package-lock.json`, `.node-version`, and `render.yaml` at its root. Include the
source files, `public/` assets, and `scripts/` build verification. Do not upload
`node_modules/`, `.next/`, `out/`, `.env` files, or generated archives.

A private repository works when the connected Render GitHub account has access.

## Blueprint setup

In Render, select **New > Blueprint**, connect the repository, and review the
single static site defined by `render.yaml`. The default repository branch is
used; a push to its linked branch triggers a deploy.

## Dashboard setup alternative

Select **New > Static Site** and connect the same repository:

| Setting | Value |
| --- | --- |
| Name | `revaldy-arrahman-portfolio` |
| Root Directory | Empty, when `package.json` is at the repository root |
| Build Command | `npm ci --include=dev && npm run build && npm run verify` |
| Publish Directory | `out` |
| Node version | `24.15.0`, supplied by `.node-version` |

If the repository instead contains a top-level `portfolio/` directory, set Root
Directory to `portfolio`; the other dashboard values stay the same. The checked
in Blueprint assumes the project itself is the repository root.

No start command, PORT setting, local database, or catch-all SPA rewrite is
needed. Next.js exports the homepage and `404.html` directly.

## Safari on iOS 16.3

Use `npm run build`, which explicitly selects Webpack and the Safari/iOS 16.3
Browserslist targets in `package.json`. Do not replace it with bare `next build`:
the default Turbopack output shipped a class static initialization block in the
Next.js error-boundary chunk. Safari 16.3 cannot parse that syntax, so hydration
never starts and the entire page's JavaScript controls stay inactive.

`npm run verify` also parses the exported JavaScript and checks that class static
blocks and unsupported regexp literals do not reappear. This is a regression
check for the identified failure, not a substitute for testing on an actual
iPhone. See [the compatibility fix record](ios-16-3-compatibility.md).

## Environment and Sanity

Set these in Render > Environment:

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `nbm85yy3` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | The actual public Render origin, such as `https://YOUR-SITE.onrender.com` |

The project and dataset already have matching defaults. The site URL configures
social preview asset URLs. Select **Save, rebuild, and deploy** after changing
these values: static output embeds them at build time. Do not add a Sanity token.

In Sanity Manage > project > API > CORS origins, add the exact public Render
origin, without credentials. Add your custom domain too if you use one. Published
CMS content loads when the page is opened/refreshed; a new build updates the HTML
snapshot for crawlers. Drafts remain hidden.

For moving the local source to `C:\website\portfolio`, follow
[the production move checklist](production-move.md). That Windows path is not
the Render Root Directory: Render uses a directory inside the GitHub repo.

## Validate after deployment

- Open the actual Render URL and check navigation on desktop and mobile.
- Confirm the portrait, organization logos, mascot, favicon, and project images load.
- Download the CV and open it as a PDF.
- Check each GitHub button and project disclosure.
- Test an unknown URL returns a 404 instead of the homepage.
- Confirm a published Sanity edit appears after a refresh on the Render domain.
- Validate GA4 Realtime only after configuring a real Measurement ID in Sanity;
  localhost is excluded from analytics.
- The contact form opens an email draft through the visitor's email app; it does
  not submit messages to a server.

The existing `.openai/hosting.json` identifies a separate Sites deployment and
does not configure Render.

Official references: [Next.js deployment](https://render.com/docs/deploy-nextjs-app),
[Blueprint fields](https://render.com/docs/blueprint-spec), and
[Node version](https://render.com/docs/node-version).
Environment reference: [Render environment settings](https://render.com/docs/configure-environment-variables).
