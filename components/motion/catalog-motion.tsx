"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const FLAVOR_CHANGE_EVENT = "oat-night:flavor-change";

type CatalogMotionProps = {
  children: ReactNode;
};

const imageReveals = [
  {
    clipPath: "inset(100% 0% 0% 0%)",
    endClipPath: "inset(0% 0% 0% 0%)",
    scale: 1.14,
    xPercent: 0,
    yPercent: 5,
  },
  {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    endClipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    scale: 1.08,
    xPercent: -4,
    yPercent: 0,
  },
  {
    clipPath: "circle(0% at 50% 50%)",
    endClipPath: "circle(75% at 50% 50%)",
    scale: 1.2,
    xPercent: 0,
    yPercent: 0,
  },
  {
    clipPath: "inset(0% 50% 0% 50%)",
    endClipPath: "inset(0% 0% 0% 0%)",
    scale: 1.1,
    xPercent: 4,
    yPercent: 0,
  },
] as const;

export function CatalogMotion({ children }: CatalogMotionProps) {
  const rootRef = useRef<HTMLElement>(null);

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

          const hero = root.querySelector<HTMLElement>("[data-home-hero]");
          const titleLines = root.querySelectorAll<HTMLElement>(
            "[data-hero-title-line]",
          );
          const heroSupport = root.querySelectorAll<HTMLElement>(
            "[data-hero-support]",
          );
          const aperture = root.querySelector<HTMLElement>(
            "[data-hero-aperture]",
          );
          const heroImage = root.querySelector<HTMLElement>(
            "[data-hero-image]",
          );
          const heroRule = root.querySelector<HTMLElement>("[data-hero-rule]");

          const entrance = gsap.timeline({
            defaults: { duration: 0.95, ease: "power3.out" },
          });

          entrance
            .fromTo(
              titleLines,
              { yPercent: 112 },
              { yPercent: 0, stagger: 0.11 },
            )
            .fromTo(
              heroSupport,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.07 },
              "-=0.62",
            );

          if (aperture) {
            entrance.fromTo(
              aperture,
              { clipPath: "inset(11% 9% 11% 9%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15 },
              0.08,
            );
          }

          if (heroRule) {
            entrance.fromTo(
              heroRule,
              { scaleY: 0 },
              { scaleY: 1, duration: 0.8 },
              0.42,
            );
          }

          if (hero && heroImage) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.7,
                },
              })
              .fromTo(
                heroImage,
                { scale: 1.02, yPercent: -2 },
                { scale: 1.13, yPercent: 7, ease: "none" },
              );
          }

          const steps = Array.from(
            root.querySelectorAll<HTMLElement>("[data-flavor-step]"),
          );
          const images = Array.from(
            root.querySelectorAll<HTMLElement>("[data-flavor-image]"),
          );
          const stageName = root.querySelector<HTMLElement>("[data-stage-name]");
          let activeIndex = 0;

          if (images.length > 0) {
            gsap.set(images, { autoAlpha: 0, zIndex: 0 });
            gsap.set(images[0], {
              autoAlpha: 1,
              clipPath: imageReveals[0].endClipPath,
              scale: 1,
              xPercent: 0,
              yPercent: 0,
              zIndex: 1,
            });
          }

          const activateFlavor = (index: number) => {
            const incoming = images[index];
            const step = steps[index];

            if (!incoming || !step || index === activeIndex) {
              return;
            }

            activeIndex = index;
            const reveal = imageReveals[index % imageReveals.length];

            gsap.killTweensOf(images);
            gsap.set(incoming, { autoAlpha: 1, zIndex: 2 });
            gsap.fromTo(
              incoming,
              {
                clipPath: reveal.clipPath,
                scale: reveal.scale,
                xPercent: reveal.xPercent,
                yPercent: reveal.yPercent,
              },
              {
                clipPath: reveal.endClipPath,
                duration: 0.95,
                ease: "power3.inOut",
                scale: 1,
                xPercent: 0,
                yPercent: 0,
                onComplete: () => {
                  images.forEach((image, imageIndex) => {
                    if (imageIndex !== index) {
                      gsap.set(image, { autoAlpha: 0, zIndex: 0 });
                    }
                  });
                  gsap.set(incoming, { zIndex: 1 });
                },
              },
            );

            window.dispatchEvent(
              new CustomEvent<string>(FLAVOR_CHANGE_EVENT, {
                detail: step.dataset.flavorStep,
              }),
            );

            if (stageName) {
              gsap.fromTo(
                stageName,
                { clipPath: "inset(0% 0% 100% 0%)", yPercent: 20 },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.62,
                  ease: "power3.out",
                  yPercent: 0,
                },
              );
            }
          };

          steps.forEach((step, index) => {
            const copy = step.querySelector<HTMLElement>("[data-step-copy]");

            ScrollTrigger.create({
              trigger: step,
              start: "top 56%",
              end: "bottom 44%",
              onEnter: () => activateFlavor(index),
              onEnterBack: () => activateFlavor(index),
            });

            if (copy) {
              gsap.fromTo(
                copy,
                { xPercent: index % 2 === 0 ? -9 : 9 },
                {
                  xPercent: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: step,
                    start: "top bottom",
                    end: "center center",
                    scrub: 0.55,
                  },
                },
              );
            }
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
    <main ref={rootRef} id="main-content" data-catalog-motion-root>
      {children}
    </main>
  );
}
