# wesleyso-dev.github.io

Personal portfolio of Wesley So, live at **[wesleyso-dev.github.io](https://wesleyso-dev.github.io)**.
React 19, TypeScript, Vite, Tailwind CSS v4, React Router.

```sh
nvm use           # Node 24, from .nvmrc
npm install
npm run dev       # local dev server
npm run typecheck
npm run lint
npm run build     # type-check + production build (also writes dist/404.html for GitHub Pages deep links)
```

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): install, lint, build,
then publish `dist/` to GitHub Pages. Pages must be set to **Settings → Pages → Source: GitHub Actions** (one-time).
Dependabot opens grouped update PRs monthly.

## Writing content

All copy lives in [`src/content/`](src/content/). Anything not yet written is a `tbd('…')`
placeholder, which renders on the page as a dashed **TBD** slot so it can't ship unnoticed.

```sh
grep -rn "tbd(" src/content     # everything still to write
```

- `site.ts`: name, role, hero facts, links, About, experience, skills
- `projects.ts`: project cards and case studies (overview, problem, decisions + trade-offs, challenges, outcome, learnings)

Links use `Href`: a URL, a `tbd()` placeholder (rendered as an inert "coming soon" label), or `null` for
"intentionally absent" (e.g. a private repo shows "Private repository").

## Design system

Editorial minimalism with a Swiss-modernist grid. Tokens are defined once in
[`src/styles/index.css`](src/styles/index.css) (`@theme`) and exposed as Tailwind utilities.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#f4f0e8` | Page background |
| `plate` | `#ebe6da` | Recessed surfaces (project plates, portrait) |
| `ink` | `#191714` | Text, 15.7:1 on paper |
| `muted` | `#5f5a50` | Secondary text, 6.0:1 |
| `faint` | `#8a8478` | Decoration and large numerals only, 3.3:1 |
| `rule` | `#d8d1c3` | Hairlines |
| `cobalt` | `#1f3fcc` | The single accent, 7.0:1 (AA at any size) |

**Type.** Instrument Sans (UI, headlines), Newsreader italic (editorial accent), IBM Plex Mono (metadata labels).
Fluid scale: `label`, `small`, `body`, `lead`, `title`, `headline`, `display`. Fonts are self-hosted.

**Grid.** `.grid-site`: 4 columns on mobile, 12 from 768px, max width 90rem. Sections open with a hairline,
a mono index number in the margin, and a headline from column 4.

**Motion.** Hero intro stagger, hover underlines and arrow nudges, a mobile menu fade, and page transitions via
the View Transitions API (project plates morph between card and case study). All motion is disabled under
`prefers-reduced-motion`.

## Structure

```
src/
  content/        copy and data (the only files you edit for content)
  styles/         tokens + base styles
  components/
    layout/       RootLayout, SiteHeader, MobileMenu, SiteFooter, nav config
    ui/           Text, ExternalLink, Arrow, SectionHeading, ProjectPlate, CopyButton
  sections/       homepage sections
  pages/          HomePage, CaseStudyPage, NotFoundPage
  hooks/          usePageMeta, useScrolled
```
