# OAT / NIGHT Recipe Catalog

## Brief

**Goal:** Build and publish an art-directed overnight-oats catalog with four distinct flavor worlds around the owner's cinnamon-free base recipe.

**Acceptance:** A visitor can browse all four flavors, open each direct recipe URL, scale the batch to 1x, 2x, or 3x, check ingredients, print the recipe, and experience flavor-specific motion and 3D with complete reduced-motion and static fallbacks on the live Vercel site.

**Fleet size:** Project. Use parallel agents for bounded planning, asset, implementation, and review work while the director owns architecture and release decisions.

**Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Bun, GSAP, Three.js, and React Three Fiber.

**Commands:** `bun run build`, `bunx tsc --noEmit`, `bun run lint`. No test script exists, so this project adds no test suite.

**UI route:** `creative-web-studio` builds the new brand surface. `design-taste-frontend` audits it before release.

**Branch:** Plan on `master`, build on `feat/oat-night-catalog`, then fast-forward and push `master` because the owner requested `master` as the primary branch.

## Art direction

OAT / NIGHT uses an edible editorial system: oat-paper backgrounds, cocoa type, ingredient-specific accent colors, oversized display typography, and close food imagery. The landing page acts as a flavor index; each recipe opens into a separate art-directed commercial with its own geometry, motion, light, and pacing. One active procedural jar anchors the experience while each scene changes composition rather than recoloring a shared effect. The signature interaction is a flavor selector that synchronizes copy, palette, recipe action, and scene without trapping navigation or hiding semantic content.

## Storyboard

1. The landing hero introduces OAT / NIGHT, the cinnamon-free base, and four flavor links around one active scene.
2. The flavor index shifts palette and composition while preserving real links and keyboard navigation.
3. Each recipe opens at its own URL with a direct jump to semantic recipe content.
4. One bounded assembly sequence leads into a calm recipe panel with scaling, checkoffs, and print support.
5. Related flavors close the page and return the visitor to the catalog.

## Repo map

- `app/layout.tsx` owns metadata, fonts, skip navigation, and the shared document shell.
- `app/page.tsx` owns the server-rendered landing route.
- `app/recipes/[slug]/page.tsx` statically renders the four direct recipe routes.
- `lib/recipes.ts` is the only recipe and flavor-content source.
- `components/catalog/` owns landing selection and copy.
- `components/recipe/` owns semantic recipe controls and assembly layout.
- `components/scene/` owns the single lazy canvas, shared procedural models, and four scene modules.
- `app/globals.css` holds tokens, reset, global focus, reduced-motion, and print rules. CSS Modules hold surface composition.

## Approach

Use one typed recipe system and four separate scene modules. Server Components render the catalog and recipe content; narrow Client Components own selection, ingredient state, scaling, and animation. GSAP owns DOM and story progress, while R3F reads stable progress refs and renders one active canvas.

The smallest-diff proposal reduced dependencies but reused one configurable scene. That approach risked four palettes wrapped around one composition, which conflicts with the source brief. The selected plan keeps the small proposal's CSS Modules, single-canvas limit, lazy loading, capped DPR, and Bun-only workflow.

## Scope boundary

In scope: four recipes, a cinnamon-free base, direct routes, generated editorial fallback imagery, procedural 3D, bounded GSAP stories, batch scaling, ingredient checkboxes, print output, metadata, responsive design, keyboard support, reduced motion, GitHub, and a verified Vercel production deployment.

Out of scope: authentication, database storage, shopping, favorites, analytics, nutrition panels, invented serving yields, ratings, reviews, dietary guarantees, and storage-duration claims. These require product decisions or evidence that the owner did not provide.

## Constraints

- Keep the base exact: 1/2 cup oats, 3/4 cup skim milk, 1/2 cup yogurt, 1 tablespoon chia seeds, 2 tablespoons honey, 1/2 teaspoon vanilla, and 1/8 teaspoon salt.
- Cinnamon belongs only to the Cinnamon Honey recipe.
- Mark Strawberry Vanilla, Chocolate Peanut Butter, and Blueberry Lemon as draft variations pending kitchen testing.
- Keep every recipe and action usable before 3D loads and when WebGL or motion is unavailable.
- Use Bun for dependency changes, scripts, and one-off CLIs.
- Use `bunx vercel@latest` instead of changing the installed global Vercel CLI.

## Issues

- CN-001: Establish the brand and typed recipe foundation.
- CN-002: Build four procedural flavor scenes.
- CN-006: Build the semantic catalog and recipe routes.
- CN-003: Add scoped motion and editorial fallback assets.
- CN-004: Audit, refine, and verify the complete experience.
- CN-005: Publish GitHub master and Vercel production.

## Verification

- `bun run build`
- `bunx tsc --noEmit`
- `bun run lint`
- Render and inspect `/` plus all four recipe URLs at 390, 768, and 1440 pixels.
- Verify keyboard operation, focus visibility, 1x/2x/3x fractions, ingredient checkoffs, jump navigation, print output, reduced motion, canvas pause, static fallback, direct refresh, and browser history.
- Verify Vercel reports `READY`, request every public route, and inspect the rendered production page rather than trusting the deployment record.

## Risks

- Procedural food can look synthetic. Generated stills and CSS fallbacks preserve the art direction while scene geometry loads.
- Glass and particles can create overdraw. Mobile uses lower DPR and particle counts, and reduced motion skips continuous rendering.
- Route changes can leak animation state. `useGSAP` scopes timelines and every scene owns its GPU resources.
- Recipe variations have not been kitchen-tested. The UI labels their status and avoids unsupported claims.

## Assumptions

- OAT / NIGHT remains the working public name from the referenced master prompt.
- The repository name is `ono`; GitHub and Vercel may use that project slug while the visible brand stays OAT / NIGHT.
- The user authorizes GitHub repository creation, a push to `master`, and a Vercel production deployment through the signed-in accounts.
