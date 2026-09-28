---
id: CN-003
title: Add scoped motion and editorial fallback assets
status: closed
priority: 1
type: feature
feature: 2026-09-27-oat-night
blocked_by: [CN-006, CN-007]
files: [components/motion/catalog-motion.tsx, components/motion/recipe-motion.tsx, components/catalog/catalog-experience.tsx, components/catalog/catalog.module.css, components/recipe/recipe-hero.tsx, components/recipe/recipe-panel.tsx, components/recipe/recipe.module.css, components/site-header.tsx, app/page.tsx, app/recipes, app/globals.css, public/images/oat-night-cinnamon.webp, public/images/oat-night-strawberry.webp, public/images/oat-night-chocolate.webp, public/images/oat-night-blueberry.webp, ASSET_MANIFEST.md]
acceptance: GSAP drives a typographic entrance, a sticky image-led flavor sequence, and one bounded reversible recipe story; every effect has a mobile layout, reduced-motion behavior, and cleanup.
assignee: Christian Furr
created: 2026-09-27
closed: 2026-09-27
---

Use the four original food stills as the visual anchors. Motion must not gate links, text, or recipe controls, and no WebGL or 3D dependency remains.

## Notes

- 2026-09-27 Replaced the rejected 3D direction with generated editorial food photography, scoped GSAP hero entrances, a reversible sticky flavor runway, and a bounded pinned preparation story. Added static mobile and reduced-motion compositions, event cleanup, eager hero loading, and 390px-safe sizing. TypeScript, ESLint, production build, and live browser renders pass.
