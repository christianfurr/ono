---
id: CN-003
title: Add scoped motion and editorial fallback assets
status: open
priority: 1
type: feature
feature: 2026-09-27-oat-night
blocked_by: [CN-002, CN-006]
files: [components/motion/catalog-motion.tsx, components/motion/recipe-motion.tsx, components/catalog/catalog.module.css, components/recipe/recipe.module.css, components/scene/scene.module.css, app/globals.css, public/images/oat-night-cinnamon.png, public/images/oat-night-strawberry.png, public/images/oat-night-chocolate.png, public/images/oat-night-blueberry.png, ASSET_MANIFEST.md]
acceptance: GSAP drives a brief entrance and one bounded reversible recipe story, generated editorial stills appear as optimized fallbacks and catalog imagery, and every effect has reduced-motion and cleanup behavior.
assignee:
created: 2026-09-27
closed:
---

Generate four original food stills with the built-in image tool, record their origin, and use them as real project assets. Motion must not gate links, text, or recipe controls.
