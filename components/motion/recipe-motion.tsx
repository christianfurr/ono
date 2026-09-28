"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type CSSProperties, type ReactNode } from "react";
import type { Recipe } from "@/lib/recipes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RecipeMotionProps = {
  children: ReactNode;
  recipe: Recipe;
};

type RecipeMotionStyle = CSSProperties & {
  "--recipe-paper": string;
  "--recipe-ink": string;
  "--recipe-accent": string;
  "--recipe-soft": string;
};

const imageCrops = [
  { scale: 1.04, xPercent: 0, yPercent: 0 },
  { scale: 1.17, xPercent: -5, yPercent: 2 },
  { scale: 1.28, xPercent: 7, yPercent: -4 },
  { scale: 1.1, xPercent: -2, yPercent: 5 },
] as const;

const beatReveals = [
  "inset(0% 100% 0% 0%)",
  "inset(100% 0% 0% 0%)",
  "inset(0% 0% 100% 0%)",
  "inset(0% 50% 0% 50%)",
] as const;

export function RecipeMotion({ children, recipe }: RecipeMotionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const recipeStyle: RecipeMotionStyle = {
    "--recipe-paper": recipe.palette.paper,
    "--recipe-ink": recipe.palette.ink,
    "--recipe-accent": recipe.palette.accent,
    "--recipe-soft": recipe.palette.accentSoft,
  };

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as
            | { desktop?: boolean; motion?: boolean }
            | undefined;

          if (!conditions?.desktop || !conditions.motion) {
            return;
          }

          root.dataset.motionReady = "true";

          const hero = root.querySelector<HTMLElement>("[data-recipe-hero]");
          const title = root.querySelector<HTMLElement>("[data-recipe-title]");
          const imageFrame = root.querySelector<HTMLElement>(
            "[data-recipe-image-frame]",
          );
          const heroImage = imageFrame?.querySelector<HTMLElement>("img");
          const heroSupport = hero?.querySelectorAll<HTMLElement>("p, a");

          const entrance = gsap.timeline({
            defaults: { duration: 0.92, ease: "power3.out" },
          });

          if (title) {
            entrance.fromTo(title, { yPercent: 112 }, { yPercent: 0 });
          }

          if (heroSupport?.length) {
            entrance.fromTo(
              heroSupport,
              { autoAlpha: 0, x: -28 },
              { autoAlpha: 1, duration: 0.68, stagger: 0.07, x: 0 },
              "-=0.55",
            );
          }

          if (imageFrame) {
            entrance.fromTo(
              imageFrame,
              { clipPath: "inset(0% 0% 100% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.18 },
              0.06,
            );
          }

          if (hero && heroImage) {
            gsap.fromTo(
              heroImage,
              { scale: 1.02, yPercent: -3 },
              {
                ease: "none",
                scale: 1.16,
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.75,
                },
                yPercent: 6,
              },
            );
          }

          const story = root.querySelector<HTMLElement>("[data-prep-story]");
          const sticky = root.querySelector<HTMLElement>("[data-prep-sticky]");
          const storyImage = root.querySelector<HTMLElement>("[data-prep-image]");
          const beats = Array.from(
            root.querySelectorAll<HTMLElement>("[data-prep-beat]"),
          );
          const curtains = Array.from(
            root.querySelectorAll<HTMLElement>("[data-prep-curtain]"),
          );
          const progress = root.querySelector<HTMLElement>(
            "[data-prep-progress]",
          );

          if (!story || !sticky || !storyImage || beats.length < 2) {
            return;
          }

          gsap.set(beats, {
            autoAlpha: 0,
            clipPath: "inset(0% 0% 100% 0%)",
            yPercent: 18,
          });
          gsap.set(beats[0], {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
          });
          gsap.set(curtains, { xPercent: -101 });
          gsap.set(storyImage, imageCrops[0]);
          gsap.set(progress, { scaleX: 1 / beats.length });

          const storyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: story,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (beats.length - 1) * 0.72}`,
              pin: sticky,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          storyTimeline.to({}, { duration: 0.28 });

          beats.slice(1).forEach((beat, index) => {
            const beatIndex = index + 1;
            const previousBeat = beats[beatIndex - 1];
            const curtain = curtains[index];
            const crop = imageCrops[beatIndex % imageCrops.length];

            if (curtain) {
              storyTimeline.to(curtain, {
                duration: 0.3,
                ease: "power2.inOut",
                xPercent: 0,
              });
            }

            storyTimeline
              .to(
                previousBeat,
                {
                  autoAlpha: 0,
                  clipPath: "inset(100% 0% 0% 0%)",
                  duration: 0.24,
                  ease: "power2.in",
                  yPercent: -18,
                },
                "<+=0.04",
              )
              .to(
                storyImage,
                {
                  duration: 0.42,
                  ease: "power2.inOut",
                  ...crop,
                },
                "<",
              )
              .fromTo(
                beat,
                {
                  autoAlpha: 1,
                  clipPath: beatReveals[beatIndex % beatReveals.length],
                  yPercent: 18,
                },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.32,
                  ease: "power3.out",
                  yPercent: 0,
                },
                "<+=0.1",
              );

            if (curtain) {
              storyTimeline.to(
                curtain,
                {
                  duration: 0.32,
                  ease: "power2.inOut",
                  xPercent: 101,
                },
                "<+=0.02",
              );
            }

            if (progress) {
              storyTimeline.to(
                progress,
                {
                  duration: 0.25,
                  ease: "power2.out",
                  scaleX: (beatIndex + 1) / beats.length,
                },
                "<",
              );
            }

            storyTimeline.to({}, { duration: 0.3 });
          });

          return () => {
            delete root.dataset.motionReady;
          };
        },
      );

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      id="main-content"
      data-recipe-motion-root
      style={recipeStyle}
    >
      {children}
    </main>
  );
}
