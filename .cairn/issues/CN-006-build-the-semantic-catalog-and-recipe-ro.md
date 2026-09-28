---
id: CN-006
title: Build the semantic catalog and recipe routes
status: open
priority: 0
type: feature
feature: 2026-09-27-oat-night
blocked_by: [CN-001]
files: [app/page.tsx, app/recipes, components/site-header.tsx, components/catalog/catalog-experience.tsx, components/catalog/catalog.module.css, components/recipe/recipe-panel.tsx, components/recipe/recipe-hero.tsx, components/recipe/recipe.module.css]
acceptance: The landing page links to four statically generated recipe URLs, and each route supports jump navigation, exact 1x/2x/3x scaling, labeled ingredient checkboxes, related flavors, and clean print output without JavaScript-dependent content.
assignee:
created: 2026-09-27
closed:
---

Keep pages server-rendered and move only selector, checkbox, and batch state into focused Client Components. The dynamic route is app/recipes/[slug]/page.tsx. Use awaited params, generateStaticParams, generateMetadata, and notFound for invalid slugs.
