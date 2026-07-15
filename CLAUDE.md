# CLAUDE.md

Guidance for Claude Code when working in this repository.

## About the project

Documentation site for **DaLin** — a club information system for managing
orienteering sports clubs (https://github.com/jZejda/dalin). Built with
[Zudoku](https://zudoku.dev) (a React/Vite-based documentation framework).
The content was migrated from a VitePress site; the API reference is hosted
externally on Scalar and only linked from the navigation.

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
