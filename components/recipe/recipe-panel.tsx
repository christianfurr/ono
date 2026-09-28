"use client";

import { useState } from "react";
import {
  BATCH_MULTIPLIERS,
  formatQuantity,
  scaleQuantity,
  type BatchMultiplier,
} from "@/lib/quantities";
import {
  optionalFinishingMilk,
  type MeasurementUnit,
  type Recipe,
} from "@/lib/recipes";
import styles from "./recipe.module.css";

function unitLabel(unit: MeasurementUnit, quantity: number) {
  return quantity <= 1 ? unit : `${unit}s`;
}

export function RecipePanel({ recipe }: { recipe: Recipe }) {
  const [multiplier, setMultiplier] = useState<BatchMultiplier>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<
    Record<string, boolean>
  >({});

  function toggleIngredient(id: string) {
    setCheckedIngredients((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  return (
    <article id="recipe" className={styles.recipePanel}>
      <aside className={styles.panelRail}>
        <h2>Recipe</h2>

        <fieldset className={styles.batchControl} data-print-hidden>
          <legend>Batch size</legend>
          <div>
            {BATCH_MULTIPLIERS.map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`${recipe.slug}-batch`}
                  value={value}
                  checked={multiplier === value}
                  onChange={() => setMultiplier(value)}
                />
                <span>{value}×</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          className={styles.printButton}
          type="button"
          onClick={() => window.print()}
          data-print-hidden
        >
          Print recipe
        </button>
      </aside>

      <div className={styles.recipeBody}>
        <section
          className={styles.ingredientsSection}
          aria-labelledby="ingredients-title"
        >
          <div className={styles.sectionHeading}>
            <h2 id="ingredients-title">Ingredients</h2>
            <p aria-live="polite">{multiplier}× batch</p>
          </div>

          <ul className={styles.ingredientList}>
            {recipe.ingredients.map((ingredient) => {
              const scaledQuantity = scaleQuantity(
                ingredient.quantity,
                multiplier,
              );
              const checkboxId = `${recipe.slug}-${ingredient.id}`;

              return (
                <li
                  key={ingredient.id}
                  className={styles.ingredientItem}
                >
                  <label htmlFor={checkboxId}>
                    <input
                      id={checkboxId}
                      type="checkbox"
                      checked={Boolean(checkedIngredients[ingredient.id])}
                      onChange={() => toggleIngredient(ingredient.id)}
                      data-print-hidden
                    />
                    <span className={styles.checkMark} aria-hidden="true" />
                    <span className={styles.ingredientAmount}>
                      {formatQuantity(ingredient.quantity, multiplier)}{" "}
                      {unitLabel(ingredient.unit, scaledQuantity)}
                    </span>
                    <span className={styles.ingredientName}>
                      {ingredient.name}
                      {ingredient.preparation
                        ? `, ${ingredient.preparation}`
                        : ""}
                    </span>
                  </label>
                </li>
              );
            })}

            <li className={`${styles.ingredientItem} ${styles.optionalItem}`}>
              <label htmlFor={`${recipe.slug}-finishing-milk`}>
                <input
                  id={`${recipe.slug}-finishing-milk`}
                  type="checkbox"
                  checked={Boolean(
                    checkedIngredients[optionalFinishingMilk.id],
                  )}
                  onChange={() => toggleIngredient(optionalFinishingMilk.id)}
                  data-print-hidden
                />
                <span className={styles.checkMark} aria-hidden="true" />
                <span className={styles.ingredientAmount}>
                  {optionalFinishingMilk.minimumQuantity}-
                  {optionalFinishingMilk.maximumQuantity} tablespoons
                </span>
                <span className={styles.ingredientName}>
                  skim milk <em>optional, after chilling</em>
                </span>
              </label>
              <p>{optionalFinishingMilk.timing}</p>
            </li>
          </ul>
        </section>

        <section className={styles.methodSection} aria-labelledby="method-title">
          <div className={styles.sectionHeading}>
            <h2 id="method-title">Method</h2>
          </div>

          <ol className={styles.methodList}>
            {recipe.instructions.map((instruction, index) => (
              <li key={instruction}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{instruction}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
