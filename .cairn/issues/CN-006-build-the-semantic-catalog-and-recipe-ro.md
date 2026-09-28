---
id: CN-006
title: Build the semantic catalog and recipe routes
status: closed
priority: 0
type: feature
feature: 2026-09-27-oat-night
blocked_by: [CN-001]
files: [app/layout.tsx, app/globals.css, app/page.tsx, app/recipes, lib/recipes.ts, components/site-header.tsx, components/catalog/catalog-experience.tsx, components/catalog/catalog.module.css, components/recipe/recipe-panel.tsx, components/recipe/recipe-hero.tsx, components/recipe/recipe.module.css]
acceptance: The landing page links to four statically generated recipe URLs, and each route supports jump navigation, exact 1x/2x/3x scaling, labeled ingredient checkboxes, related flavors, and clean print output without JavaScript-dependent content.
assignee: Christian Furr
created: 2026-09-27
closed: 2026-09-27
---

Keep pages server-rendered and move only selector, checkbox, and batch state into focused Client Components. The dynamic route is app/recipes/[slug]/page.tsx. Use awaited params, generateStaticParams, generateMetadata, and notFound for invalid slugs.

## Notes

- 2026-09-27 Built the server-rendered catalog and four static recipe routes with a photo-led flavor runway, awaited dynamic params, metadata, semantic recipe controls, exact 1x/2x/3x scaling, ingredient checkoffs, print styles, related links, and 390px-safe responsive layouts. Removed decorative numbering and switched the editorial display face to Cormorant Garamond. Verified with TypeScript, ESLint, and the full Bun production build.
