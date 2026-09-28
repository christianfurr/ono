# OAT / NIGHT

OAT / NIGHT is a static Next.js catalog for four overnight-oat recipes built from one cinnamon-free base. The experience pairs editorial food photography with scoped GSAP scroll choreography, while keeping the recipes readable and usable without animation.

## Run locally

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify

```bash
bunx tsc --noEmit
bun run lint
bun run build
```

## Structure

- `app/page.tsx` renders the landing catalog and base recipe.
- `app/recipes/[slug]/page.tsx` statically generates the four recipe pages.
- `lib/recipes.ts` is the typed source of truth for recipes and palettes.
- `components/motion/` contains the scoped GSAP timelines.
- `components/catalog/` and `components/recipe/` contain the semantic content and controls.
- `public/images/` contains the project-generated editorial food stills.
- `ASSET_MANIFEST.md` records image provenance and prompt summaries.
- `.cairn/` records decisions, implementation issues, and verification.

The repository uses Bun 1.3.14 and Next.js 16.3.6. The site has no backend, accounts, database, analytics, or runtime environment variables.
