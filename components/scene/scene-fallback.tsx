import Image from "next/image";
import type { Recipe } from "@/lib/recipes";
import styles from "./scene.module.css";

type SceneFallbackProps = {
  recipe: Recipe;
};

export function SceneFallback({ recipe }: SceneFallbackProps) {
  return (
    <div className={styles.fallback}>
      <Image
        alt={recipe.image.alt}
        className={styles.fallbackImage}
        fill
        priority
        sizes="(max-width: 720px) 100vw, 58vw"
        src={recipe.image.src}
      />
      <span aria-hidden="true" className={styles.fallbackVeil} />
    </div>
  );
}
