"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import type { Recipe } from "@/lib/recipes";
import styles from "./catalog.module.css";

type FlavorStyle = CSSProperties & {
  "--active-paper": string;
  "--active-ink": string;
  "--active-accent": string;
  "--active-soft": string;
};

type StepStyle = CSSProperties & {
  "--step-paper": string;
  "--step-ink": string;
  "--step-accent": string;
};

export function CatalogExperience({ items }: { items: readonly Recipe[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "");
  const activeRecipe =
    items.find((recipe) => recipe.slug === activeSlug) ?? items[0];

  if (!activeRecipe) {
    return null;
  }

  const flavorStyle: FlavorStyle = {
    "--active-paper": activeRecipe.palette.paper,
    "--active-ink": activeRecipe.palette.ink,
    "--active-accent": activeRecipe.palette.accent,
    "--active-soft": activeRecipe.palette.accentSoft,
  };

  function chooseFlavor(slug: string) {
    setActiveSlug(slug);
    const target = document.getElementById(`flavor-${slug}`);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }

  return (
    <section
      ref={rootRef}
      id="flavors"
      className={styles.catalog}
      data-active-flavor={activeRecipe.slug}
      style={flavorStyle}
      aria-labelledby="catalog-title"
    >
      <header className={styles.catalogHeader}>
        <div>
          <p className={styles.eyebrow}>The flavor collection</p>
          <h2 id="catalog-title">Four mornings. Pick yours.</h2>
          <p>
            The same cinnamon-free base, pushed toward four very different
            cravings.
          </p>
        </div>

        <fieldset className={styles.flavorPicker}>
          <legend className={styles.srOnly}>Choose a flavor</legend>
          {items.map((recipe) => {
            const selected = recipe.slug === activeRecipe.slug;

            return (
              <button
                key={recipe.slug}
                type="button"
                aria-controls={`flavor-${recipe.slug}`}
                aria-pressed={selected}
                data-flavor-button={recipe.slug}
                onClick={() => chooseFlavor(recipe.slug)}
              >
                {recipe.name}
              </button>
            );
          })}
        </fieldset>
      </header>

      <div className={styles.catalogStory} data-catalog-story>
        <div className={styles.imageStage} data-image-stage>
          <div className={styles.imageDeck}>
            {items.map((recipe) => (
              <div
                key={recipe.slug}
                className={styles.flavorImage}
                data-active={recipe.slug === activeRecipe.slug}
                data-flavor-image={recipe.slug}
                aria-hidden="true"
              >
                <Image
                  alt=""
                  className={styles.stageImage}
                  fill
                  sizes="(max-width: 767px) 100vw, 58vw"
                  src={recipe.image.src}
                />
              </div>
            ))}
            <div className={styles.stageShade} aria-hidden="true" />
            <p className={styles.stageName} aria-live="polite">
              {activeRecipe.name}
            </p>
          </div>
        </div>

        <div className={styles.storySteps}>
          {items.map((recipe) => {
            const stepStyle: StepStyle = {
              "--step-paper": recipe.palette.paper,
              "--step-ink": recipe.palette.ink,
              "--step-accent": recipe.palette.accent,
            };

            return (
              <article
                key={recipe.slug}
                id={`flavor-${recipe.slug}`}
                className={styles.flavorStep}
                data-flavor-step={recipe.slug}
                style={stepStyle}
              >
                <div className={styles.mobileFlavorImage}>
                  <Image
                    alt={recipe.image.alt}
                    fill
                    sizes="100vw"
                    src={recipe.image.src}
                  />
                </div>

                <div className={styles.stepCopy}>
                  <p className={styles.flavorNote}>{recipe.copy.eyebrow}</p>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.copy.description}</p>
                  <p className={styles.statusLabel}>{recipe.statusLabel}</p>
                  <Link
                    className={styles.recipeLink}
                    href={`/recipes/${recipe.slug}`}
                  >
                    Open recipe
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
