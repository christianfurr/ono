export type MeasurementUnit = "cup" | "tablespoon" | "teaspoon";
export type RecipeStatus = "established" | "draft";

export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: MeasurementUnit;
  preparation?: string;
};

export type FlavorPalette = {
  paper: string;
  ink: string;
  accent: string;
  accentSoft: string;
};

export type Recipe = {
  slug: string;
  name: string;
  status: RecipeStatus;
  statusLabel: string;
  copy: {
    eyebrow: string;
    description: string;
  };
  palette: FlavorPalette;
  image: {
    src: string;
    alt: string;
  };
  ingredients: readonly Ingredient[];
  instructions: readonly string[];
};

export const baseIngredients = [
  { id: "oats", name: "oats", quantity: 0.5, unit: "cup" },
  { id: "skim-milk", name: "skim milk", quantity: 0.75, unit: "cup" },
  { id: "yogurt", name: "yogurt", quantity: 0.5, unit: "cup" },
  {
    id: "chia-seeds",
    name: "chia seeds",
    quantity: 1,
    unit: "tablespoon",
  },
  { id: "honey", name: "honey", quantity: 2, unit: "tablespoon" },
  {
    id: "vanilla-extract",
    name: "vanilla extract",
    quantity: 0.5,
    unit: "teaspoon",
  },
  { id: "salt", name: "salt", quantity: 0.125, unit: "teaspoon" },
] as const satisfies readonly Ingredient[];

export const optionalFinishingMilk = {
  id: "finishing-milk",
  name: "skim milk",
  minimumQuantity: 1,
  maximumQuantity: 2,
  unit: "tablespoon",
  timing: "Stir in after chilling for a looser texture.",
  scalesWithBatch: false,
} as const;

const instructions = [
  "Add the listed ingredients to a jar and stir until combined.",
  "Cover the jar and refrigerate overnight.",
  "Stir before eating. Add the optional finishing milk if you want a looser texture.",
] as const;

export const recipes = [
  {
    slug: "cinnamon-honey",
    name: "Cinnamon Honey",
    status: "established",
    statusLabel: "Original flavor",
    copy: {
      eyebrow: "Warm spice",
      description: "The cinnamon-free base with honey and cinnamon.",
    },
    palette: {
      paper: "#f2eadb",
      ink: "#4a2014",
      accent: "#b65a2b",
      accentSoft: "#e6ad4f",
    },
    image: {
      src: "/images/oat-night-cinnamon.webp",
      alt: "Cinnamon honey overnight oats in a glass jar with cinnamon sticks and honey",
    },
    ingredients: [
      ...baseIngredients,
      {
        id: "cinnamon",
        name: "cinnamon",
        quantity: 0.5,
        unit: "teaspoon",
      },
    ],
    instructions,
  },
  {
    slug: "strawberry-vanilla",
    name: "Strawberry Vanilla",
    status: "draft",
    statusLabel: "Draft variation, pending kitchen testing",
    copy: {
      eyebrow: "Berry and vanilla",
      description: "The base with sliced strawberries added before chilling.",
    },
    palette: {
      paper: "#fae8e2",
      ink: "#5b1d2a",
      accent: "#c74f66",
      accentSoft: "#f0b7ba",
    },
    image: {
      src: "/images/oat-night-strawberry.webp",
      alt: "Strawberry vanilla overnight oats in a glass jar with sliced strawberries and vanilla pods",
    },
    ingredients: [
      ...baseIngredients,
      {
        id: "strawberries",
        name: "strawberries",
        quantity: 0.5,
        unit: "cup",
        preparation: "sliced",
      },
    ],
    instructions,
  },
  {
    slug: "chocolate-peanut-butter",
    name: "Chocolate Peanut Butter",
    status: "draft",
    statusLabel: "Draft variation, pending kitchen testing",
    copy: {
      eyebrow: "Cocoa and peanut",
      description: "The base with unsweetened cocoa powder and peanut butter.",
    },
    palette: {
      paper: "#e7d4bd",
      ink: "#351b13",
      accent: "#7a3e26",
      accentSoft: "#d39a4b",
    },
    image: {
      src: "/images/oat-night-chocolate.webp",
      alt: "Chocolate peanut butter overnight oats in a glass jar with cocoa, chocolate, and peanuts",
    },
    ingredients: [
      ...baseIngredients,
      {
        id: "cocoa-powder",
        name: "unsweetened cocoa powder",
        quantity: 1,
        unit: "tablespoon",
      },
      {
        id: "peanut-butter",
        name: "peanut butter",
        quantity: 2,
        unit: "tablespoon",
      },
      {
        id: "chocolate-chips",
        name: "chocolate chips",
        quantity: 1,
        unit: "tablespoon",
      },
    ],
    instructions,
  },
  {
    slug: "blueberry-lemon",
    name: "Blueberry Lemon",
    status: "draft",
    statusLabel: "Draft variation, pending kitchen testing",
    copy: {
      eyebrow: "Berry and citrus",
      description: "The base with blueberries and finely grated lemon zest.",
    },
    palette: {
      paper: "#eeecd9",
      ink: "#232a52",
      accent: "#41518f",
      accentSoft: "#dccb50",
    },
    image: {
      src: "/images/oat-night-blueberry.webp",
      alt: "Blueberry lemon overnight oats in a glass jar with blueberries and curls of lemon peel",
    },
    ingredients: [
      ...baseIngredients,
      {
        id: "blueberries",
        name: "blueberries",
        quantity: 0.5,
        unit: "cup",
      },
      {
        id: "lemon-zest",
        name: "lemon zest",
        quantity: 1,
        unit: "teaspoon",
        preparation: "finely grated",
      },
    ],
    instructions,
  },
] as const satisfies readonly Recipe[];

export type RecipeSlug = (typeof recipes)[number]["slug"];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}
