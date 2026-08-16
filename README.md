# Qronon website

Editable React and Vite source for the Qronon website at `qronon.ai`.

## Make changes locally

Install Node.js 22, then run:

```bash
npm ci
npm run dev
```

Vite prints the local address in the terminal. Open that address in a browser.

The main files to edit are:

| Change | File |
| --- | --- |
| Page copy, navigation and page structure | `src/main.jsx` |
| Colours, typography, spacing and responsive layout | `src/styles.css` |
| Logo and favicon | `public/` |
| Formspree endpoint | `FORMSPREE_ENDPOINT` in `src/main.jsx` |
| Careers role copy | `mlRole` and `JobDetail` in `src/main.jsx` |
| GitHub Pages deployment | `.github/workflows/deploy-pages.yml` |

The live chaotic-system animation is the `SystemVisual` component in
`src/main.jsx`.

## Check a production build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`. Do not edit `dist/` directly;
it is recreated on every build and is intentionally excluded from Git.

## Replace the previous Next.js repository

1. Create a backup branch of the existing repository.
2. Remove or disable the old Next.js Pages workflow. Only one workflow should
   deploy to GitHub Pages.
3. Copy the contents of this folder into the repository root. Do not upload the
   enclosing `Qronon-github-source` folder.
4. Commit and push to `main`.
5. In GitHub, keep **Settings → Pages → Source** set to **GitHub Actions**.
6. Confirm that the custom domain remains `qronon.ai` in the Pages settings.
7. Open the Actions tab and wait for **Deploy Qronon website** to finish.

The workflow installs the locked dependencies, builds the website, uploads the
`dist/` artifact and deploys it to GitHub Pages automatically. If the default
branch is not `main`, change the branch name in `deploy-pages.yml`.

The old Next.js-only files (`.next`, `app`, `components`, `next-env.d.ts`,
`next.config.ts`, and the old Tailwind/PostCSS configuration) are not used by
this project. They can be removed after the new deployment has been confirmed.

## Contact form

The Contact form submits to `https://formspree.io/f/mrbrwbnj`. Form submission
requires an internet connection; the rest of the site is entirely static.
General enquiries and expressions of interest in the open role use
`info@qronon.ai`.
