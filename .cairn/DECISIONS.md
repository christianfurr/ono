# Decisions

Append-only, newest last. One dated line per decision a future session would
otherwise re-litigate. Not a changelog: git already has one.

- 2026-09-27: Use OAT / NIGHT as the working brand because the owner's referenced master prompt names it.
- 2026-09-27: Keep the canonical base cinnamon-free; add cinnamon only inside flavor-specific recipes.
- 2026-09-27: Store recipes in typed local data and keep auth, databases, carts, nutrition claims, ratings, and serving yields out of scope.
- 2026-09-27: Use GSAP for coordinated DOM and scroll choreography and React Three Fiber for procedural food scenes; do not add a second general animation library.
- 2026-09-27: Remove React Three Fiber and all procedural 3D after the owner rejected that direction; use the generated food photography, CSS composition, and GSAP ScrollTrigger as the complete visual system.
- 2026-09-27: Make an eight-frame, locally hosted oat-preparation film the landing page's signature scroll interaction; crossfade stacked images with one GSAP timeline on desktop and phone, retain a semantic static fallback, and do not use canvas, video, 3D, or WebGL.
