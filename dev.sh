#!/usr/bin/env bash
# Start local frontend (5173) + worker (8787) + apply D1 schema if needed.
# Ctrl-C stops both.
set -euo pipefail

cd "$(dirname "$0")"

# 1. Bootstrap worker secrets if missing (dev-only values, never used in prod)
if [ ! -f worker/.dev.vars ]; then
  echo "→ creating worker/.dev.vars (local dev secrets)"
  cat > worker/.dev.vars <<EOF
PASSWORD=local-dev-password
TOKEN_SIGNING_KEY=local-dev-signing-key-not-for-production-32bytes
EOF
fi

# 2. Install deps if missing
if [ ! -d web/node_modules ];    then echo "→ pnpm install (web)";    (cd web    && pnpm install); fi
if [ ! -d worker/node_modules ]; then echo "→ pnpm install (worker)"; (cd worker && pnpm install); fi

# 3. Apply local D1 schema (CREATE TABLE IF NOT EXISTS — idempotent)
echo "→ applying local D1 schema"
(cd worker && pnpm wrangler d1 execute contortion --local --file=./schema.sql) > /dev/null 2>&1 || true

# 4. Run both in parallel; clean up children on Ctrl-C
PIDS=()
cleanup() {
  echo
  echo "→ stopping (pids: ${PIDS[*]})"
  kill "${PIDS[@]}" 2>/dev/null || true
  wait 2>/dev/null || true
  exit 0
}
trap cleanup INT TERM

echo "→ starting worker on http://localhost:8787"
(cd worker && pnpm dev) &
PIDS+=($!)

echo "→ starting frontend on http://localhost:5173"
(cd web && pnpm dev) &
PIDS+=($!)

wait
