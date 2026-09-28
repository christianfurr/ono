---
id: CN-008
title: Build the scroll-scrubbed oat film
status: in_progress
priority: 0
type: feature
feature: 2026-09-27-oat-night
blocked_by: [CN-003]
files: [app/page.tsx, components/catalog/scroll-film.tsx, components/catalog/scroll-film.module.css, components/motion/catalog-motion.tsx, public/images/sequence, ASSET_MANIFEST.md, .cairn/MAP.md, .cairn/DECISIONS.md, .cairn/features/2026-09-27-oat-night/PRD.md, .cairn/features/2026-09-27-oat-night/REVIEW.md]
acceptance: A pinned image sequence scrubs smoothly from night preparation to finished morning oats on desktop and phone, adds at least six new coherent frames, preserves semantic content and reduced motion, passes Bun build and lint, and is verified on the production alias.
assignee: Christian Furr
created: 2026-09-27
closed:
---

Replace the current slideshow-like impression with one signature scroll-controlled photographic film. Keep the camera and jar composition coherent, cross-blend adjacent frames, preload responsibly, and do not reintroduce 3D or WebGL.

The film uses eight locally hosted landscape frames rendered as ordinary images. Its semantic image-and-copy grid is the default; when motion is allowed, CSS stacks the frames in a bounded sticky viewport and the existing GSAP owner crossfades them on desktop and phone. Reduced motion keeps the finished still and all semantic copy in a static layout. Canvas and video are not part of the renderer.

## Notes

- 2026-09-27: Cairn architecture, product scope, and review placeholders were updated for the eight-frame film. Build, browser, asset, and production verification remain pending.
- 2026-09-27: Local verification passed at 390, 768, and 1440 pixels plus 844 by 390 landscape. Forward and reverse scrub, reduced motion, route and control regressions, TypeScript, lint, and the production build all passed. The eight frames total 763,598 bytes; production deployment remains.
