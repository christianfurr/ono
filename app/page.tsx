import Image from "next/image";
import Link from "next/link";
import { CatalogExperience } from "@/components/catalog/catalog-experience";
import styles from "@/components/catalog/catalog.module.css";
import { ScrollFilm } from "@/components/catalog/scroll-film";
import { CatalogMotion } from "@/components/motion/catalog-motion";
import { SiteHeader } from "@/components/site-header";
import {
  baseIngredients,
  optionalFinishingMilk,
  recipes,
  type MeasurementUnit,
} from "@/lib/recipes";
import { formatQuantity } from "@/lib/quantities";

function unitLabel(unit: MeasurementUnit, quantity: number) {
  return quantity === 1 ? unit : `${unit}s`;
}

export default function Home() {
  const cinnamon = recipes[0];

  return (
    <div className={styles.page}>
      <SiteHeader />

      <CatalogMotion>
        <section
          className={styles.hero}
          aria-labelledby="home-title"
          data-home-hero
        >
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-hero-support>
              Overnight, reconsidered
            </p>
            <h1 id="home-title" className={styles.displayTitle}>
              <span className={styles.titleMask}>
                <span data-hero-title-line>A little tonight.</span>
              </span>
              <span className={styles.titleMask}>
                <span className={styles.titleItalic} data-hero-title-line>
                  A lovely tomorrow.
                </span>
              </span>
            </h1>
            <p className={styles.heroDescription} data-hero-support>
              Four overnight oats, one cinnamon-free base, and a better morning
              waiting in the fridge.
            </p>
            <Link
              className={styles.primaryLink}
              href="#flavors"
              data-hero-support
            >
              Browse flavors
            </Link>
          </div>

          <figure className={styles.heroAperture} data-hero-aperture>
            <Image
              alt={cinnamon.image.alt}
              className={styles.heroImage}
              data-hero-image
              fetchPriority="high"
              fill
              loading="eager"
              sizes="(max-width: 767px) 100vw, 44vw"
              src={cinnamon.image.src}
            />
            <figcaption>Cinnamon Honey</figcaption>
            <span aria-hidden="true" data-hero-rule />
          </figure>
        </section>

        <ScrollFilm />

        <CatalogExperience items={recipes} />

        <section
          id="base"
          className={styles.baseSection}
          aria-labelledby="base-title"
        >
          <div className={styles.baseIntro}>
            <h2 id="base-title">One base. No cinnamon.</h2>
            <p>
              Every flavor begins here. Cinnamon only enters the Cinnamon Honey
              jar.
            </p>
          </div>

          <ul className={styles.baseList} aria-label="Base ingredients">
            {baseIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <span className={styles.baseAmount}>
                  {formatQuantity(ingredient.quantity)}{" "}
                  {unitLabel(ingredient.unit, ingredient.quantity)}
                </span>
                <span className={styles.baseName}>{ingredient.name}</span>
              </li>
            ))}
          </ul>

          <aside className={styles.baseAside}>
            <h3>After chilling</h3>
            <p>
              Add {optionalFinishingMilk.minimumQuantity}-
              {optionalFinishingMilk.maximumQuantity} tablespoons skim milk if
              you want a looser texture.
            </p>
          </aside>
        </section>
      </CatalogMotion>

      <footer className={styles.footer}>
        <Link href="/">OAT / NIGHT</Link>
        <p>Four overnight-oat recipes. One cinnamon-free base.</p>
      </footer>
    </div>
  );
}
