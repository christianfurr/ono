---
id: CN-005
title: Publish GitHub master and Vercel production
status: closed
priority: 0
type: task
feature: 2026-09-27-oat-night
blocked_by: [CN-004]
files: [.cairn/MAP.md, .cairn/issues, .cairn/features/2026-09-27-oat-night/REVIEW.md]
acceptance: The GitHub repository uses master as its default branch, Vercel reports the production deployment READY, and public requests plus browser inspection confirm the landing page and all four recipe routes.
assignee: Christian Furr
created: 2026-09-27
closed: 2026-09-27
---

Use authenticated gh and bunx vercel@latest. Never print tokens. Verify the linked Vercel owner and project before deployment, then inspect and smoke-test the public URL.

## Notes

- 2026-09-27 Created the public GitHub repository, fast-forwarded and pushed master, confirmed master as the default branch, linked the makashi2021s-projects/ono Vercel project to GitHub, and deployed production dpl_CqJ5jootTFQRgFxsCW7EB6jWLjie. Vercel reported READY and aliased ono-roan.vercel.app. Public HTTP plus browser QA passed for the landing page, all four recipes, controls, breakpoints, reduced motion, and the invalid-route 404.
