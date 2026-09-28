---
id: CN-004
title: Audit refine and verify the complete experience
status: closed
priority: 0
type: task
feature: 2026-09-27-oat-night
blocked_by: [CN-003]
files: [app, components, lib, public, README.md, .cairn/MAP.md, .cairn/features/2026-09-27-oat-night/REVIEW.md]
acceptance: Build, TypeScript, and lint pass with zero warnings; 390, 768, and 1440 renders show no overflow or blank states; keyboard, reduced motion, scaling, checkoffs, print, direct routes, cleanup, and fallbacks are verified with evidence.
assignee: Christian Furr
created: 2026-09-27
closed: 2026-09-27
---

Run the creative audit, two adversarial review dimensions, a deletion pass, and real browser checks. Fix confirmed defects only and record verification plus waivers.

## Notes

- 2026-09-27 Completed the visual and engineering audit. Fixed sub-AA small accent labels and preserved both primary nav links down to 360px. TypeScript, ESLint, production build, direct-route status, invalid-route 404, 360/375/390/768/1440 overflow, flavor selection, 3x scaling, checkoffs, keyboard focus, reduced motion, print output, and runtime exceptions were verified. Review evidence and intentional visual waivers are recorded in REVIEW.md.
