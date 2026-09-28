---
id: CN-007
title: Remove the rejected WebGL direction
status: closed
priority: 0
type: chore
feature: 2026-09-27-oat-night
blocked_by:
files: [package.json, bun.lock, components/scene/scene-host.tsx, components/scene/scene-canvas.tsx, components/scene/scene-fallback.tsx, components/scene/scene.module.css, components/scene/shared-models.tsx, components/scene/scenes/cinnamon-honey.tsx, components/scene/scenes/strawberry-vanilla.tsx, components/scene/scenes/chocolate-peanut-butter.tsx, components/scene/scenes/blueberry-lemon.tsx, .cairn/DECISIONS.md, .cairn/features/2026-09-27-oat-night/PRD.md]
acceptance: No Three.js, React Three Fiber, WebGL component, or scene dependency remains, and the product plan records the image-led scroll direction.
assignee: Christian Furr
created: 2026-09-27
closed: 2026-09-27
---

Owner rejected the 3D jars after review. Remove the committed implementation and preserve the generated editorial photography for GSAP/CSS scroll choreography.

## Notes

- 2026-09-27 Removed all R3F and Three.js components and Bun dependencies, and updated the decision record and PRD to the owner-approved image-led scroll direction.
