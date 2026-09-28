---
id: CN-002
title: Build four procedural flavor scenes
status: open
priority: 0
type: feature
feature: 2026-09-27-oat-night
blocked_by: [CN-001]
files: [components/scene/scene-host.tsx, components/scene/scene-canvas.tsx, components/scene/scene-fallback.tsx, components/scene/scene.module.css, components/scene/shared-models.tsx, components/scene/scenes/cinnamon-honey.tsx, components/scene/scenes/strawberry-vanilla.tsx, components/scene/scenes/chocolate-peanut-butter.tsx, components/scene/scenes/blueberry-lemon.tsx]
acceptance: One lazy R3F canvas renders separate Cinnamon Honey, Strawberry Vanilla, Chocolate Peanut Butter, and Blueberry Lemon compositions with shared jar primitives, capped DPR, pause support, and a complete static fallback.
assignee:
created: 2026-09-27
closed:
---

Use one active canvas, raw Three.js geometry, deterministic details, one custom powder shader, and no per-frame React state. Each world needs its own composition and motion character.
