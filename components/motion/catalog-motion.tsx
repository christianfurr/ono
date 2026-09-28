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

      media.add(
        {
          compact: "(max-width: 767px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as
            | { compact?: boolean; motion?: boolean }
            | undefined;
          const film = root.querySelector<HTMLElement>("[data-scroll-film]");

          if (!conditions?.motion || !film) {
            return;
          }

          const frames = Array.from(
            film.querySelectorAll<HTMLElement>("[data-film-frame]"),
          );
          const beats = Array.from(
            film.querySelectorAll<HTMLElement>("[data-film-beat]"),
          );
          const progress = film.querySelector<HTMLElement>(
            "[data-film-progress]",
          );

          if (frames.length < 2) {
            return;
          }

          film.dataset.filmMotionReady = "true";

          frames.forEach((frame, index) => {
            gsap.set(frame, {
              autoAlpha: index === 0 ? 1 : 0,
              scale: index === 0 ? 1.055 : 1.04,
              willChange: "auto",
              zIndex: index + 1,
            });
          });

          gsap.set(beats, { opacity: 0, y: 32 });

          if (beats[0]) {
            gsap.set(beats[0], { opacity: 1, y: 0 });
          }

          const transitionDuration = 0.9;
          const filmDuration = frames.length - 1 + transitionDuration;
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: film,
              start: "top top",
              end: "bottom bottom",
              scrub: conditions.compact ? 0.28 : 0.52,
              invalidateOnRefresh: true,
            },
          });

          timeline.to(
            frames[0],
            { duration: 1.15, ease: "none", scale: 1 },
            0,
          );

          frames.slice(1).forEach((frame, offset) => {
            const index = offset + 1;
            const position = index - 1;
            const previous = frames[index - 1];

            timeline.set(
              [previous, frame],
              { willChange: "opacity, transform" },
              position,
            );

            timeline.to(
              frame,
              {
                autoAlpha: 1,
                duration: transitionDuration,
                ease: "none",
                scale: 1,
              },
              position,
            );

            if (previous) {
              timeline.to(
                previous,
                {
                  duration: transitionDuration,
                  ease: "none",
                  scale: 0.988,
                },
                position,
              );

              timeline.set(
                previous,
                { autoAlpha: 0, willChange: "auto" },
                position + transitionDuration,
              );
            }

            timeline.set(
              frame,
              { willChange: "auto" },
              position + transitionDuration,
            );
          });

          if (progress) {
            timeline.to(
              progress,
              { duration: filmDuration, ease: "none", scaleX: 1 },
              0,
            );
          }

          const beatChanges = [2.05, 4.55];

          beatChanges.forEach((position, index) => {
            const outgoing = beats[index];
            const incoming = beats[index + 1];

            if (!outgoing || !incoming) {
              return;
            }

            timeline
              .to(
                outgoing,
                {
                  duration: 0.18,
                  ease: "power2.in",
                  opacity: 0,
                  y: -18,
                },
                position,
              )
              .fromTo(
                incoming,
                { opacity: 0, y: 32 },
                {
                  duration: 0.36,
                  ease: "power3.out",
                  opacity: 1,
                  y: 0,
                },
                position + 0.22,
              );
          });

          const images = frames
            .map((frame) => frame.querySelector<HTMLImageElement>("img"))
            .filter((image): image is HTMLImageElement => image !== null);

          ScrollTrigger.create({
            trigger: film,
            start: "top 125%",
            once: true,
            onEnter: () => {
              images.forEach((image) => {
                image.loading = "eager";
                void image.decode().catch(() => undefined);
              });
            },
          });

          return () => {
            delete film.dataset.filmMotionReady;
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
