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

API dokumentace (`/api`, `/oris-api`) se generuje přímo v Zudoku z OpenAPI specifikací
v `apis/` (viz `apis` v `zudoku.config.tsx`), včetně možnosti stažení schématu.

## Nasazení

CI (`.github/workflows/ci.yml`) jen ověřuje build — Webglobe hosting nepovoluje SSH
z GitHub Actions runnerů, takže se nasazuje lokálně:

```bash
make deploy          # build + nahrání na produkci (rsync --delete)
make deploy-dry-run  # totéž, ale jen ukáže rozdíly, nic nenahraje
```

Vyžaduje fungující SSH klíč na `ssh-731459@dw303.webglobe.com` (stejný účet jako appka DaLin).
