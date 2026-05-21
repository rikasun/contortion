# Flex Class

A personal flexibility training timer with voice cues, illustrated guides, and password-gated session history. Built for one student, deployed to a single browser tab on a yoga mat.

**Live:** _(TBD — pending custom-domain DNS)_

## What it does

- Walks through a timed sequence of exercises (warm-up → prep stretches → splits → active work) with section-aware transition pads between positions.
- Speaks every cue out loud through the Web Speech API and chimes the last three seconds of each phase. Eyes on the mat, not the screen.
- Persists finished sessions to a Cloudflare-hosted backend so history follows the user across devices. Reading history is password-gated; writes are anonymous but rate-limited.
- Has a "junk session" guard so quickly clicking around the app doesn't generate fake history entries.

## Stack

- **Frontend** — Vite, React 19, TypeScript, TanStack Router + Query, Tailwind 4, Radix Themes. Web Speech + Web Audio APIs.
- **Backend** — single Cloudflare Worker + D1 (SQLite). HMAC-SHA256 signed unlock tokens, IP-based rate limiting at the edge.
- **Hosting** — GitHub Pages (frontend) + Cloudflare (Worker + DB).
- **Deploy** — `git push main` → GitHub Actions builds + Pages deploys (Worker deploy is opt-in via a repo variable).

## Quick start

```sh
./dev.sh
```

Starts frontend at http://localhost:5173 and worker at http://localhost:8787. Bootstraps placeholder dev secrets and applies the local D1 schema. Single Ctrl-C stops both. Local writes are isolated from production.

## Repo layout

```
web/        Frontend (Vite + React)
worker/     Backend (Cloudflare Worker + D1)
dev.sh      Run both locally with one command
.github/    CI: build + deploy on push
CLAUDE.md   Agent-context for working in this repo
```

For everything else — architecture, conventions, deploy state — see [`CLAUDE.md`](./CLAUDE.md).

## License

Code is MIT-licensed; see [`LICENSE`](./LICENSE). Exercise instructions and cues are adapted from materials by Catie Brier ([catiebrier.com](https://www.catiebrier.com)) and are not licensed for redistribution.
