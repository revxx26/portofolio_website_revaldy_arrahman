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

No start command, server environment variables, database, or catch-all SPA
rewrite is needed. Next.js exports the homepage and `404.html` directly.

## Validate after deployment

- Open the actual Render URL and check navigation on desktop and mobile.
- Confirm the portrait, organization logos, mascot, favicon, and project images load.
- Download the CV and open it as a PDF.
- Check each GitHub button and project disclosure.
- Test an unknown URL returns a 404 instead of the homepage.
- The contact form opens an email draft through the visitor's email app; it does
  not submit messages to a server.

The existing `.openai/hosting.json` identifies a separate Sites deployment and
does not configure Render.

Official references: [Next.js deployment](https://render.com/docs/deploy-nextjs-app),
[Blueprint fields](https://render.com/docs/blueprint-spec), and
[Node version](https://render.com/docs/node-version).
