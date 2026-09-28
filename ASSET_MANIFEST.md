# OAT / NIGHT Asset Manifest

## Editorial food stills

The four stills were generated for this project with Codex's built-in OpenAI image-generation tool on 2026-09-27. They contain no third-party photography, logos, or packaged products. Project use remains subject to the OpenAI terms that apply to generated output.

Each source PNG was converted with `cwebp -q 88 -m 6` to a 1122 by 1402 WebP file. The committed files total about 804 KB.

| Path | Use | Prompt summary |
|---|---|---|
| `public/images/oat-night-cinnamon.webp` | Cinnamon Honey hero, catalog, and recipe story | Warm oat-paper set, creamy oats, matte cinnamon, curled bark, and a thin honey ribbon in low morning light. |
| `public/images/oat-night-strawberry.webp` | Strawberry Vanilla catalog and recipe story | Blush studio set, seeded strawberry slices, creamy oats, and a broad vanilla ribbon in fresh daylight. |
| `public/images/oat-night-chocolate.webp` | Chocolate Peanut Butter catalog and recipe story | Cocoa set, chocolate pieces, peanut halves, and two heavy chocolate and peanut-butter ribbons in side light. |
| `public/images/oat-night-blueberry.webp` | Blueberry Lemon catalog and recipe story | Pale lemon set, bloomed blueberries, creamy oats, and an opening lemon-peel spiral in airy daylight. |

Shared constraints in all four prompts: vertical 4:5 editorial food photography, unlabeled glass jar, edible and grounded materials, no text, no logo, no label, no people, no utensils, no watermark, and no commercial packaging.

## Scroll-film sequence

The eight frames were generated for this project with Codex's built-in OpenAI image-generation tool on 2026-09-27. The source PNGs remain in the local Codex generation archive at `/Users/christianfurr/.codex/generated_images/01a0e5a0-7ec4-7c52-8b86-7d7898e73195/` and were copied into the project as WebP derivatives; the originals were not changed or removed.

Shared prompt direction: photorealistic, natural editorial food photography for a full-bleed scroll film; one locked landscape 16:9 camera; a warm oat-paper set; the same unlabeled glass jar set slightly right of center with negative space at left; real, edible textures; an oat-cream, cocoa, honey, and quiet-blue palette; and a continuous late-evening-to-morning light transition. Every frame excludes people, hands, cinnamon, text, labels, logos, watermarks, warped glass, floating ingredients, impossible liquid ribbons, and decorative garnish.

| Frame | Source PNG | Project WebP | Prompt summary |
|---:|---|---|---|
| 01 | `exec-54004c6f-fbfb-41c1-a1c6-6f3e168b0415.png` | `public/images/sequence/oat-film-01.webp` | Empty jar with measured oats, milk, yogurt, chia, and honey arranged in late-evening light. |
| 02 | `exec-1f61d014-1978-45f1-b0b6-7f4f544b853c.png` | `public/images/sequence/oat-film-02.webp` | Oats falling naturally into the same empty jar. |
| 03 | `exec-83dde64e-f214-45fc-ab48-9ed8e7a530f4.png` | `public/images/sequence/oat-film-03.webp` | Milk pouring into the oats while the camera and surrounding ingredients remain fixed. |
| 04 | `exec-fc07cd35-664d-46d1-a1d3-63615265c382.png` | `public/images/sequence/oat-film-04.webp` | Yogurt, chia, and honey layered visibly in the jar before mixing. |
| 05 | `exec-ece9a477-8e69-4c5a-b151-a4439c517396.png` | `public/images/sequence/oat-film-05.webp` | Fully stirred oat mixture with a grounded wooden spoon in warm evening light. |
| 06 | `exec-a8403fa9-e297-46e4-b3bd-7516aecc467b.png` | `public/images/sequence/oat-film-06.webp` | Open jar under cool blue night light as the mixture thickens. |
| 07 | `exec-0e7e6817-f31b-48c2-b1f4-df24be61b979.png` | `public/images/sequence/oat-film-07.webp` | Closed jar before dawn with the oats visibly hydrated after chilling. |
| 08 | `exec-07be8085-96be-49dd-9b79-1922b3e706e6.png` | `public/images/sequence/oat-film-08.webp` | Open finished jar in golden morning light, with honey and loose oats nearby. |

All source PNGs were 1672 by 941 pixels. Each committed derivative was converted with `cwebp -q 84 -m 6 -resize 1440 810`. The eight WebP frames total 763,598 bytes (about 746 KiB).

The site uses the four vertical stills and eight landscape frames directly for its image-led GSAP scroll sequences. It has no stock photography, 3D models, external textures, or WebGL assets.
