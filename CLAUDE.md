# CLAUDE.md

Guidance for Claude Code when working in this repository.

## About the project

Documentation site for **DaLin** — a club information system for managing
orienteering sports clubs (https://github.com/jZejda/dalin). Built with
[Zudoku](https://zudoku.dev) (a React/Vite-based documentation framework).
The content was migrated from a VitePress site. The API reference (`/api`,
`/oris-api`) is rendered natively by Zudoku from the OpenAPI files in `apis/`
(see `apis` in `zudoku.config.tsx`) — not hosted externally.

## Structure

- `zudoku.config.tsx` — main configuration (navigation, branding, theme, redirects)
- `pages/index.mdx` — landing page (hero + feature cards)
- `pages/napoveda/` — user guide (members, race admins, finance, club admins)
- `pages/install/` — installation and configuration guide
- `pages/develop/` — contributor/developer documentation
- `pages/changelog/` — release notes per major version
- `src/components/` — React components available in MDX (`Badge`, `CardGrid`,
  `LinkCard`, `ZoomableImage`); registered in `mdx.components` in the config
- `public/` — static assets (logos, favicon, OG image)

## Commands

```bash
npm run dev        # dev server (http://localhost:3000)
npm run build      # production build (also catches config/MDX errors)
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit (type errors only)
```

Requires Node ≥ 20.19 — run `nvm use 23.4.0` first (installed versions:
20.20.1, 23.4.0). Note: `npm run lint`/`check` are currently broken — there is
no ESLint config in the repo; use `npm run typecheck` after editing `.ts`/`.tsx`.

## Deployment

```bash
make deploy          # build + mirror routes + rsync --delete to production
make deploy-dry-run   # same, but rsync --dry-run — shows the diff, changes nothing
```

Deploys **locally only** — Webglobe's shared-hosting firewall doesn't allow SSH
from GitHub-hosted runner IPs (port 20001 unreachable), so `.github/workflows/ci.yml`
only builds/typechecks on push, it never deploys. Needs a working SSH key for
`ssh-731459@dw303.webglobe.com:20001` (same hosting account as the DaLin app itself —
see `docs/deployment.md` in the `dalin` repo). Target path:
`/home/html/multi_731459/dalin.cz/_sub/docs`. The old CI deploy used
`SSH_USER_PASSWORD`/`SSH_USER_NAME`/`SSH_SERVER_NAME`/`SSH_KNOWN_HOSTS` repo
secrets over `sshpass` — those are unused now and can be deleted from the repo's
Actions secrets.

## Conventions

- **Documentation language:** all user-facing content (pages in `pages/`,
  navigation labels) is written in **Czech**. Use another language only when
  explicitly requested.
- **Internal language:** `CLAUDE.md` and everything under `.claude/` is
  written in **English**.
- **Navigation** lives in `zudoku.config.tsx` under `navigation`; doc items
  use `{ type: "doc", file: "napoveda/...", label: "..." }`.
- **Pages** are `.mdx` files. Callouts use `:::tip` / `:::info` / `:::warning`
  / `:::danger`, optionally `:::tip{title="..."}`. Role badges in headings use
  `<Badge type="info" text="ČLEN" />`. Images are referenced relatively
  (`./img/foo.png`) and live next to the pages.
- After larger changes, verify with `npm run build` (prerenders all routes and
  catches MDX/config errors).

## Don't

- Don't edit files in `node_modules/` or the generated `dist/`.
- Don't commit `.env*` files (they are in `.gitignore`).
