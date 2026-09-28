import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecipeMotion } from "@/components/motion/recipe-motion";
import { RecipeHero } from "@/components/recipe/recipe-hero";
import { RecipePanel } from "@/components/recipe/recipe-panel";
import styles from "@/components/recipe/recipe.module.css";
import { SiteHeader } from "@/components/site-header";
import { getRecipeBySlug, recipes } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

const preparationBeats = [
  {
    title: "Measure",
    copy: "Add the base and your flavor additions to a jar.",
  },
  {
    title: "Mix",
    copy: "Stir until the chia, oats, and flavor additions are evenly combined.",
  },
  {
    title: "Overnight",
    copy: "Cover the jar and refrigerate overnight.",
  },
  {
    title: "Morning",
    copy: "Stir again, then loosen with a little skim milk only if you want to.",
  },
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.name,
    description: `${recipe.copy.description} Get the ingredients and three-step method.`,
    openGraph: {
      title: recipe.name,
      description: recipe.copy.description,
      type: "website",
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = recipes.filter(
    (relatedRecipe) => relatedRecipe.slug !== recipe.slug,
  );

  return (
    <div className={styles.page} data-flavor={recipe.slug}>
      <SiteHeader />

      <RecipeMotion recipe={recipe}>
        <RecipeHero recipe={recipe} />

        <section
          className={styles.prepStory}
          aria-labelledby="prep-story-title"
          data-prep-story
          data-print-hidden
        >
          <div className={styles.prepSticky} data-prep-sticky>
            <div className={styles.prepImageFrame}>
              <Image
                alt=""
                className={styles.prepImage}
                data-prep-image
                fill
                sizes="(max-width: 767px) 100vw, 62vw"
                src={recipe.image.src}
              />
              <div className={styles.prepCurtains} aria-hidden="true">
                {preparationBeats.slice(1).map((beat) => (
                  <span key={beat.title} data-prep-curtain />
                ))}
              </div>
            </div>

            <header className={styles.prepHeader}>
              <h2 id="prep-story-title">Four moves. One good morning.</h2>
            </header>

            <div className={styles.prepBeatTrack} aria-hidden="true">
              {preparationBeats.map((beat) => (
                <article
                  key={beat.title}
                  className={styles.prepBeat}
                  data-prep-beat
                >
                  <p>{beat.title}</p>
                  <h3>{beat.copy}</h3>
                </article>
              ))}
            </div>

            <ol className={styles.prepBeatList}>
              {preparationBeats.map((beat) => (
                <li key={beat.title} className={styles.prepBeat}>
                  <p>{beat.title}</p>
                  <h3>{beat.copy}</h3>
                </li>
              ))}
            </ol>

            <div className={styles.prepProgress} aria-hidden="true">
              <span data-prep-progress />
            </div>
          </div>
        </section>

        <RecipePanel recipe={recipe} />

        <section
          className={styles.relatedSection}
          aria-labelledby="related-title"
          data-print-hidden
        >
          <div className={styles.relatedHeading}>
            <h2 id="related-title">Three more jars.</h2>
            <Link href="/#flavors">See the full flavor index</Link>
          </div>

          <div className={styles.relatedGrid}>
            {relatedRecipes.map((relatedRecipe) => (
              <article key={relatedRecipe.slug} className={styles.relatedCard}>
                <Link
                  href={`/recipes/${relatedRecipe.slug}`}
                  aria-label={`View ${relatedRecipe.name} recipe`}
                >
                  <Image
                    src={relatedRecipe.image.src}
                    alt={relatedRecipe.image.alt}
                    width={1122}
                    height={1402}
                    sizes="(max-width: 47.99rem) 100vw, 33vw"
                  />
                </Link>
                <h3>
                  <Link href={`/recipes/${relatedRecipe.slug}`}>
                    {relatedRecipe.name}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      </RecipeMotion>

      <footer className={styles.footer} data-print-hidden>
        <Link href="/">OAT / NIGHT</Link>
        <p>{recipe.name}</p>
      </footer>
    </div>
  );
}
