---
id: CN-003
title: Add scoped motion and editorial fallback assets
status: open
priority: 1
type: feature
feature: 2026-09-27-oat-night
blocked_by: [CN-006, CN-007]
files: [components/motion/catalog-motion.tsx, components/motion/recipe-motion.tsx, components/catalog/catalog-experience.tsx, components/catalog/catalog.module.css, components/recipe/recipe-hero.tsx, components/recipe/recipe-panel.tsx, components/recipe/recipe.module.css, app/page.tsx, app/globals.css, public/images/oat-night-cinnamon.webp, public/images/oat-night-strawberry.webp, public/images/oat-night-chocolate.webp, public/images/oat-night-blueberry.webp, ASSET_MANIFEST.md]
acceptance: GSAP drives a typographic entrance, a sticky image-led flavor sequence, and one bounded reversible recipe story; every effect has a mobile layout, reduced-motion behavior, and cleanup.
assignee:
created: 2026-09-27
closed:
---

Use the four original food stills as the visual anchors. Motion must not gate links, text, or recipe controls, and no WebGL or 3D dependency remains.
