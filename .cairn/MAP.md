---
verified_at_sha: 3006686
verified_at: 2026-09-27
---

# What this repo is

OAT / NIGHT is a static Next.js recipe catalog for a cinnamon-free overnight-oats base and four flavor variations. Four flavor stills and an eight-frame, scroll-scrubbed preparation film create the visual experience through scoped GSAP timelines. All recipe content is server-rendered, and the site has no backend, authentication, database, analytics, or remote content source.

# Entry points

- `app/layout.tsx` defines metadata, the viewport, optimized fonts, and the skip link.
- `app/page.tsx` renders the landing hero, oat film, flavor catalog, and canonical base recipe.
- `app/recipes/[slug]/page.tsx` statically generates the four recipe routes and rejects unknown slugs.
- `lib/recipes.ts` is the typed source of truth for recipe content, status, palettes, and local image paths.
- `lib/quantities.ts` formats exact eighth-based quantities for the 1x, 2x, and 3x controls.

# Where things live

| Concern | Path | Notes |
|---|---|---|
| Catalog content and controls | `components/catalog/` | Flavor selector, semantic steps, responsive layouts, and `scroll-film.tsx` |
| Recipe content and controls | `components/recipe/` | Hero, batch scaling, checkoffs, method, print styles |
| Scroll choreography | `components/motion/` | GSAP and ScrollTrigger, including the oat-film frame crossfades, scoped through `useGSAP` and `gsap.matchMedia` |
| Recipe data | `lib/recipes.ts` | Cinnamon-free base plus four flavor records |
| Generated food imagery | `public/images/` | Four portrait flavor stills plus eight landscape film frames under `sequence/` |
| Asset provenance | `ASSET_MANIFEST.md` | Generation date, prompt summaries, conversion notes |
| Project state | `.cairn/` | PRD, decisions, issues, and final review |

# How data moves

Server Components read the local recipe array and render all links, text, ingredients, methods, oat-film images, and film beats into static HTML. `CatalogExperience` owns only the selected flavor state. `RecipePanel` owns only batch and ingredient-check state. The motion wrappers query explicit data attributes and revert their GSAP media contexts on cleanup. The flavor runway remains desktop-only; the oat film uses one motion-allowed timeline on desktop and phone to crossfade its stacked local images, move its semantic beats, and advance its progress rule. Without motion initialization, the film remains a readable image-and-copy grid. A custom event synchronizes the flavor stage with the selector without a global scroll listener.

# Commands

- `bun run dev` starts the development server.
- `bun run build` creates the optimized production build.
- `bun run start` serves that production build locally.
- `bun run lint` runs ESLint.
- `bunx tsc --noEmit` runs TypeScript without emitting files.
- No test command exists in `package.json`; the final browser verification is recorded in `.cairn/features/2026-09-27-oat-night/REVIEW.md`.

# Production

- GitHub: `https://github.com/christianfurr/ono`
- Default branch: `master`
- Vercel project: `makashi2021s-projects/ono`
- Production alias: `https://ono-roan.vercel.app`

# Gotchas

- This repository uses Bun and `bun.lock`; do not add npm, Yarn, or pnpm lockfiles.
- Next.js 16 route `params` are promises and must be awaited.
- Three.js, React Three Fiber, canvas scenes, and WebGL are intentionally absent after the owner rejected the 3D direction.
- The oat film intentionally uses bounded sticky scroll on both desktop and phone; reduced-motion users receive its complete static layout. Motion never gates text, links, ingredients, or controls.
- Keep the eight film frames coherent and locally hosted under `public/images/sequence/`; the stacked-image crossfade is the sequence renderer, not canvas or video.
- The three non-cinnamon flavors are labeled as draft variations pending kitchen testing.
- The optional 1 to 2 tablespoons of finishing milk is a texture adjustment and stays unscaled.
