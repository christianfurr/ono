# OAT / NIGHT final review

Date: 2026-09-27

## Outcome

The rejected 3D direction is fully removed. The finished site uses four generated editorial food stills, a typographic hero entrance, a reversible sticky flavor runway, image masks, palette changes, and a bounded pinned preparation story. Recipe content remains available in static HTML when JavaScript, desktop animation, or motion preferences change.

## Design read

- Audience: a design-conscious home cook browsing a small personal recipe catalog.
- Visual language: edible editorial photography, oversized Cormorant Garamond display type, restrained Manrope utility copy, thin rules, and flavor-specific paper colors.
- Composition: split hero, asymmetric flavor stage, full-height preparation sequence, and editorial ingredient layouts.
- Motion: GSAP owns transforms, clipping, opacity, pinning, and scroll progress. CSS owns layout and static fallbacks.
- Restraint: no 3D, WebGL, gradients, glow, glass effects, floating cards, decorative counters, or autonomous looping motion.

## Verification evidence

| Check | Result |
|---|---|
| TypeScript | `bunx tsc --noEmit` passed |
| Lint | `bun run lint` passed with no warnings |
| Production build | `bun run build` passed; 9 static pages generated |
| Direct routes | `/` and all four recipe URLs returned 200; an unknown recipe returned 404 |
| Responsive width | 360, 375, 390, 768, and 1440 CSS pixel captures had matching viewport and document widths with no horizontal overflow |
| Desktop motion | `data-motion-ready` activated at 768 and 1440 when motion was allowed |
| Reduced motion | Motion did not initialize; all four catalog images and full recipe steps remained visible |
| Flavor selector | Selecting Blueberry Lemon scrolled to its section and synchronized `aria-pressed` plus the active palette state |
| Batch scaling | The 3x base rendered 1 1/2 cups, 2 1/4 cups, 1 1/2 cups, 3 tablespoons, 6 tablespoons, 1 1/2 teaspoons, and 3/8 teaspoon |
| Ingredient checkoff | Native checkbox state changed and the matching label treatment updated |
| Keyboard basics | The skip link received focus and targeted the existing `main-content`; radio and checkbox controls remained native focusable inputs |
| Label contrast | Small accent labels were darkened to at least 6.58:1 against every flavor paper color |
| Print | Chromium produced one tagged US Letter page with the recipe, scaled amounts, and method; navigation, motion story, images, and controls were hidden |
| Runtime errors | No page exceptions were observed during the browser interaction pass |
| Asset payload | Four 1122 by 1402 WebP stills total about 812 KB on disk |
| Runtime dependency search | No Three.js, React Three Fiber, canvas, WebGL, or scroll event listener remains in application source |

The final visual pass inspected the 390 mobile hero, 768 split hero, 1440 hero, Strawberry Vanilla catalog state, pinned recipe story, and reduced-motion catalog. All were populated, readable, and free of clipping or blank states.

## Adversarial review

### Product and visual

- The four recipes are not presented as equally proven. Cinnamon Honey is marked as the original flavor; the other three are clearly marked as draft variations pending kitchen testing.
- The cinnamon-free base is repeated on the landing page and cinnamon appears only in the Cinnamon Honey flavor.
- The warm light palette and single light color scheme are intentional because the art direction, generated stills, food context, and print layout were designed as one editorial system.
- Mobile keeps the same typography, imagery, hierarchy, and complete catalog without desktop pinning.
- The Base navigation link remains present at 360, 375, and 390 CSS pixels.
- The repeated flavor name and heightened ingredient gestures are intentional editorial devices within the owner-requested maximal scroll composition.

### Engineering and accessibility

- Motion lives in two client wrappers and is reverted through `gsap.matchMedia`; content and controls do not depend on timeline state.
- Images use local paths, responsive `sizes`, descriptive alt text where meaningful, and empty alt text for duplicated decorative story images.
- Batch controls are native radio inputs; ingredients are native checkboxes; selectors expose `aria-pressed`; headings and landmarks remain semantic.
- Unknown slugs terminate through `notFound`, and the dynamic route is limited to generated recipe params.
- A deletion pass removed stale 3D dependencies and files, unused print styling, duplicate declarations, and starter README copy.

## Accepted waivers

- No dark mode: the brief is a deliberately light, food-editorial composition, and a dark transformation would work against the generated photography and print behavior.
- Mobile uses the complete static composition instead of pinning full-height sections. This preserves reading order, touch behavior, and reduced layout cost on smaller screens.
- The optional finishing milk does not scale because it is an after-chilling texture adjustment, not part of the mixed base.

## Production publication

- Public repository: `https://github.com/christianfurr/ono`
- Default branch: `master`
- Vercel project: `makashi2021s-projects/ono`
- Verified production alias: `https://ono-roan.vercel.app`
- Deployment: `dpl_CqJ5jootTFQRgFxsCW7EB6jWLjie`, target `production`, state `READY`

The public alias returned 200 for the landing page and all four recipe routes, and 404 for an unknown recipe. A second browser pass against the alias repeated the responsive, interaction, print, reduced-motion, and runtime-exception checks with the same results as local production.
