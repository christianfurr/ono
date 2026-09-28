---
verified_at_sha: 5c580e8
verified_at: 2026-09-27
---

# What this repo is

OAT / NIGHT is a static Next.js recipe catalog for a cinnamon-free overnight-oats base and four flavor variations. Editorial food stills and scoped GSAP timelines create the visual experience. All recipe content is server-rendered, and the site has no backend, authentication, database, analytics, or remote content source.

# Entry points

- `app/layout.tsx` defines metadata, the viewport, optimized fonts, and the skip link.
- `app/page.tsx` renders the landing hero, flavor catalog, and canonical base recipe.
- `app/recipes/[slug]/page.tsx` statically generates the four recipe routes and rejects unknown slugs.
- `lib/recipes.ts` is the typed source of truth for recipe content, status, palettes, and local image paths.
- `lib/quantities.ts` formats exact eighth-based quantities for the 1x, 2x, and 3x controls.

# Where things live

| Concern | Path | Notes |
|---|---|---|
| Catalog content and controls | `components/catalog/` | Flavor selector, semantic steps, responsive layouts |
| Recipe content and controls | `components/recipe/` | Hero, batch scaling, checkoffs, method, print styles |
| Scroll choreography | `components/motion/` | GSAP and ScrollTrigger, scoped through `useGSAP` and `gsap.matchMedia` |
| Recipe data | `lib/recipes.ts` | Cinnamon-free base plus four flavor records |
| Generated food stills | `public/images/` | Four 1122 by 1402 WebP images |
| Asset provenance | `ASSET_MANIFEST.md` | Generation date, prompt summaries, conversion notes |
| Project state | `.cairn/` | PRD, decisions, issues, and final review |

# How data moves

Server Components read the local recipe array and render all links, text, ingredients, and methods into static HTML. `CatalogExperience` owns only the selected flavor state. `RecipePanel` owns only batch and ingredient-check state. The motion wrappers query explicit data attributes, create desktop-only timelines when motion is allowed, and revert their GSAP media contexts on cleanup. A custom event synchronizes the scroll-driven flavor stage with the selector without a global scroll listener.

# Commands

- `bun run dev` starts the development server.
- `bun run build` creates the optimized production build.
- `bun run start` serves that production build locally.
- `bun run lint` runs ESLint.
- `bunx tsc --noEmit` runs TypeScript without emitting files.
- No test command exists in `package.json`; the final browser verification is recorded in `.cairn/features/2026-09-27-oat-night/REVIEW.md`.

# Gotchas

- This repository uses Bun and `bun.lock`; do not add npm, Yarn, or pnpm lockfiles.
- Next.js 16 route `params` are promises and must be awaited.
- Three.js, React Three Fiber, canvas scenes, and WebGL are intentionally absent after the owner rejected the 3D direction.
- Mobile and reduced-motion users receive complete static layouts. Desktop scroll animation never gates text, links, ingredients, or controls.
- The three non-cinnamon flavors are labeled as draft variations pending kitchen testing.
- The optional 1 to 2 tablespoons of finishing milk is a texture adjustment and stays unscaled.
