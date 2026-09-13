#!/usr/bin/env bash
# Zudoku writes every route as a flat "<path>.html" file. Our nginx/Apache
# static host doesn't rewrite extensionless URLs to ".html" (so a hard load
# of e.g. /napoveda/index 404s), and for routes that also have nested
# sub-routes (e.g. the OpenAPI reference roots /api, /oris-api) it
# auto-redirects bare "/api" to "/api/" and then 403s because that directory
# has no index.html. Mirroring every "<path>.html" into "<path>/index.html"
# lets the host's own directory+index handling resolve both the bare path
# (via auto-redirect) and the trailing-slash path.
#
# Shared between the local `make deploy` target and CI (build-check only,
# see .github/workflows/ci.yml) so both build the exact same output.
set -euo pipefail
cd "$(dirname "$0")/.."

find dist -name "*.html" | while read -r f; do
  rel="${f#dist/}"
  case "$rel" in
    index.html|400.html|404.html|500.html) continue ;;
  esac
  dir="${f%.html}"
  mkdir -p "$dir"
  if [ ! -f "$dir/index.html" ]; then
    cp "$f" "$dir/index.html"
  fi
done
