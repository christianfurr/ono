import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Recipe } from "@/lib/recipes";
import styles from "./recipe.module.css";

type RecipeStyle = CSSProperties & {
  "--recipe-paper": string;
  "--recipe-ink": string;
  "--recipe-accent": string;
  "--recipe-soft": string;
};

export function RecipeHero({ recipe }: { recipe: Recipe }) {
  const recipeStyle: RecipeStyle = {
    "--recipe-paper": recipe.palette.paper,
    "--recipe-ink": recipe.palette.ink,
    "--recipe-accent": recipe.palette.accent,
    "--recipe-soft": recipe.palette.accentSoft,
  };

  return (
    <section
      className={styles.hero}
      data-flavor={recipe.slug}
      data-recipe-hero
      style={recipeStyle}
      aria-labelledby="recipe-title"
    >
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{recipe.copy.eyebrow}</p>
        <div className={styles.heroTitleMask}>
          <h1 id="recipe-title" data-recipe-title>
            {recipe.name}
          </h1>
        </div>
        <p className={styles.heroDescription}>{recipe.copy.description}</p>
        <p className={styles.heroStatus}>{recipe.statusLabel}</p>
        <Link className={styles.jumpLink} href="#recipe" data-print-hidden>
          Jump to recipe
        </Link>
      </div>

      <figure
        className={styles.heroImageFrame}
        data-recipe-image-frame
        data-print-hidden
      >
        <Image
          alt={recipe.image.alt}
          className={styles.heroImage}
          fill
          priority
          sizes="(max-width: 767px) 100vw, 56vw"
          src={recipe.image.src}
        />
      </figure>
    </section>
  );
}
