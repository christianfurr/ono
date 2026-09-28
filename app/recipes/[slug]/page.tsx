import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecipeHero } from "@/components/recipe/recipe-hero";
import { RecipePanel } from "@/components/recipe/recipe-panel";
import styles from "@/components/recipe/recipe.module.css";
import { SiteHeader } from "@/components/site-header";
import { getRecipeBySlug, recipes } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

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

      <main id="main-content">
        <RecipeHero recipe={recipe} />
        <RecipePanel recipe={recipe} />

        <section
          className={styles.relatedSection}
          aria-labelledby="related-title"
          data-print-hidden
        >
          <div className={styles.relatedHeading}>
            <p className={styles.eyebrow}>Keep browsing</p>
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
      </main>

      <footer className={styles.footer} data-print-hidden>
        <Link href="/">OAT / NIGHT</Link>
        <p>{recipe.name}</p>
      </footer>
    </div>
  );
}
