# DaLin dokumentace

Dokumentační web projektu [DaLin](https://github.com/jZejda/dalin) — klubového
informačního systému pro správu oddílů orientačních sportů. Postaveno na
frameworku [Zudoku](https://zudoku.dev). Obsah byl migrován z původního
VitePress webu.

## Vývoj

Vyžaduje Node.js ≥ 20.19 (`nvm use 23.4.0`).

```bash
npm install
npm run dev        # dev server na http://localhost:3000
npm run build      # produkční build do dist/
npm run preview    # náhled produkčního buildu
```

## Struktura obsahu

- `pages/index.mdx` — úvodní stránka
- `pages/napoveda/` — uživatelská příručka
- `pages/install/` — instalace a konfigurace
- `pages/develop/` — dokumentace pro vývojáře
- `pages/changelog/` — novinky podle verzí
- `zudoku.config.tsx` — navigace, vzhled a nastavení webu

API dokumentace je hostována externě na
[Scalar](https://registry.scalar.com/@default-team-gbfg7/apis/dalin-api-documentation/latest)
a z webu se na ni pouze odkazuje.
