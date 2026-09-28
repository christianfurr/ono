# OAT / NIGHT Recipe Catalog

## Brief

**Goal:** Build and publish an art-directed overnight-oats catalog with four distinct flavor worlds around the owner's cinnamon-free base recipe.

**Acceptance:** A visitor can scrub one coherent eight-frame oat-preparation film from an empty evening jar to finished morning oats on desktop or phone, browse all four flavors, open each direct recipe URL, scale the batch to 1x, 2x, or 3x, check ingredients, print the recipe, and receive a complete reduced-motion fallback on the live Vercel site.

**Fleet size:** Project. Use parallel agents for bounded planning, asset, implementation, and review work while the director owns architecture and release decisions.

**Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Bun, and GSAP with ScrollTrigger.

**Commands:** `bun run build`, `bunx tsc --noEmit`, `bun run lint`. No test script exists, so this project adds no test suite.

**UI route:** `creative-web-studio` builds the new brand surface. `design-taste-frontend` audits it before release.

**Branch:** Plan on `master`, build on `feat/oat-night-catalog`, then fast-forward and push `master` because the owner requested `master` as the primary branch.

## Art direction

OAT / NIGHT uses an edible editorial system: oat-paper backgrounds, cocoa type, ingredient-specific accent colors, oversized display typography, and close food imagery. The landing page opens with an eight-frame preparation film whose locked camera moves from an empty evening jar through mixing and chilling to finished morning oats. It then acts as a flavor index; each recipe opens into a separate art-directed commercial with its own cropping, motion, light, and pacing. Generated food photography anchors the sticky scroll scenes while ingredient words, masks, and palette fields move around it. Semantic copy, links, and controls remain present without animation.

## Storyboard

1. The landing hero introduces OAT / NIGHT through a fast typographic curtain and a full-bleed food image.
2. A bounded, sticky oat film crossfades eight coherent frames as the visitor scrolls from the empty jar to morning, with shorter pacing on phones.
3. A sticky flavor index shifts palette, image crop, and ingredient typography while preserving real links and keyboard navigation.
4. Each recipe opens at its own URL with a direct jump to semantic recipe content.
5. One bounded image-led assembly sequence leads into a calm recipe panel with scaling, checkoffs, and print support.
6. Related flavors close the page and return the visitor to the catalog.

## Repo map

- `app/layout.tsx` owns metadata, fonts, skip navigation, and the shared document shell.
- `app/page.tsx` owns the server-rendered landing route.
- `app/recipes/[slug]/page.tsx` statically renders the four direct recipe routes.
- `lib/recipes.ts` is the only recipe and flavor-content source.
- `components/catalog/` owns landing selection, copy, and the semantic oat-film frame stack.
- `components/recipe/` owns semantic recipe controls and assembly layout.
- `components/motion/` owns scoped GSAP entrances, sticky scroll sequences, and reduced-motion cleanup.
- `app/globals.css` holds tokens, reset, global focus, reduced-motion, and print rules. CSS Modules hold surface composition.

## Approach

Use one typed recipe system, four generated flavor stills, and eight coherent landscape frames for the oat film. Server Components render the catalog, film frames and beats, and recipe content; narrow Client Components own selection, ingredient state, scaling, and animation. The film is a normal image-and-copy grid before enhancement. When motion is allowed, CSS stacks its images inside a sticky viewport and one GSAP ScrollTrigger timeline crossfades adjacent frames, changes the three text beats, and advances the progress rule. Phone pacing is shorter, and reduced motion stays on the static layout. No React state, raw scroll listener, canvas, video, 3D, or WebGL drives the sequence.

The first implementation used procedural 3D, but the owner rejected that visual direction after seeing it. The replacement keeps CSS Modules, generated imagery, semantic routes, and the Bun-only workflow while moving all spectacle into restrained, reversible scroll choreography.

## Scope boundary

In scope: four recipes, a cinnamon-free base, direct routes, four flavor stills, an eight-frame oat film, sticky and bounded GSAP stories, batch scaling, ingredient checkboxes, print output, metadata, responsive design, keyboard support, reduced motion, GitHub, and a verified Vercel production deployment.

Out of scope: authentication, database storage, shopping, favorites, analytics, nutrition panels, invented serving yields, ratings, reviews, dietary guarantees, and storage-duration claims. These require product decisions or evidence that the owner did not provide.

## Constraints

- Keep the base exact: 1/2 cup oats, 3/4 cup skim milk, 1/2 cup yogurt, 1 tablespoon chia seeds, 2 tablespoons honey, 1/2 teaspoon vanilla, and 1/8 teaspoon salt.
- Cinnamon belongs only to the Cinnamon Honey recipe.
- Mark Strawberry Vanilla, Chocolate Peanut Butter, and Blueberry Lemon as draft variations pending kitchen testing.
- Keep every recipe and action usable before motion initializes and when reduced motion is requested.
- Keep the oat film's text in semantic HTML and its default layout readable; only enhance it into a sticky sequence when motion is allowed.
- Use stacked local images and one GSAP timeline for the film. Do not reintroduce canvas, video, 3D, or WebGL.
- Use Bun for dependency changes, scripts, and one-off CLIs.
- Use `bunx vercel@latest` instead of changing the installed global Vercel CLI.

## Issues

- CN-001: Establish the brand and typed recipe foundation.
- CN-002: Build four procedural flavor scenes (superseded by owner feedback).
- CN-006: Build the semantic catalog and recipe routes.
- CN-003: Add scoped motion and editorial fallback assets.
- CN-004: Audit, refine, and verify the complete experience.
- CN-005: Publish GitHub master and Vercel production.
- CN-008: Build and verify the eight-frame scroll-scrubbed oat film.

## Verification

- `bun run build`
- `bunx tsc --noEmit`
- `bun run lint`
- Render and inspect `/` plus all four recipe URLs at 390, 768, and 1440 pixels.
- At 390, 768, and 1440 pixels, inspect the oat film near its start, midpoint, and end; verify adjacent-frame blending, legible beat changes, bounded sticky release, and no blank state.
- Confirm all eight local frames load before they are needed without blocking the initial page, and record their total payload.
- Verify keyboard operation, focus visibility, 1x/2x/3x fractions, ingredient checkoffs, jump navigation, print output, reduced motion, sticky-scene release, direct refresh, and browser history.
- Under reduced motion, verify the film keeps its finished still and complete semantic copy in a static layout and creates no ScrollTrigger.
- Verify Vercel reports `READY`, request every public route, and inspect the rendered production page rather than trusting the deployment record.

## Risks

- Image crops can become repetitive. Each flavor gets a distinct mask, scale, and type composition instead of a recolored template.
- Scroll stories can trap the page or feel slow. Each sequence is bounded and must release cleanly; the oat film uses shorter phone pacing, while reduced motion stays static.
- Eight full-width frames can delay the first scrub. Keep them compressed, locally hosted, and decode them as the visitor approaches rather than making every frame part of the initial critical request.
- Route changes can leak animation state. `useGSAP` scopes timelines and every ScrollTrigger is reverted on cleanup.
- Recipe variations have not been kitchen-tested. The UI labels their status and avoids unsupported claims.

## Assumptions

- OAT / NIGHT remains the working public name from the referenced master prompt.
- The repository name is `ono`; GitHub and Vercel may use that project slug while the visible brand stays OAT / NIGHT.
- The user authorizes GitHub repository creation, a push to `master`, and a Vercel production deployment through the signed-in accounts.
