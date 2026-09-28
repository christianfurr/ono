---
verified_at_sha: 615a927
verified_at: 2026-09-27
---

# What this repo is
OAT / NIGHT is a Next.js recipe catalog for a cinnamon-free overnight-oats base and four flavor worlds. The app is a static, client-enhanced experience with no backend, account system, or remote data source.

# Entry points
- `app/layout.tsx` owns global metadata, fonts, and the document shell.
- `app/page.tsx` renders the landing catalog.
- `app/globals.css` holds Tailwind 4 design tokens, motion rules, responsive composition, and print rules.

# Where things live
| Concern | Directory | Copy from |
|---|---|---|
| App Router pages | `app/` | `app/page.tsx` |
| Static assets | `public/` | Replace the starter SVGs with project-owned assets |
| Project state | `.cairn/` | `.cairn/MAP.md` |

# How data moves
The scaffold has no application data flow yet. Recipe data will remain local and typed; interactive batch and ingredient state will stay in isolated Client Components.

# Commands
- `bun run dev` starts the Next.js development server.
- `bun run build` runs the production build and TypeScript validation.
- `bun run lint` runs ESLint.
- `bunx tsc --noEmit` runs TypeScript without emitting files.
- No test command exists in `package.json`.

# Gotchas
- `AGENTS.md` requires checking the installed Next.js 16 docs under `node_modules/next/dist/docs/` before using framework APIs.
- Dynamic route `params` are promises in Next.js 16; await them in `app/recipes/[slug]/page.tsx`.
- `bun.lock` is the only package lockfile and must stay in sync with `package.json`.
