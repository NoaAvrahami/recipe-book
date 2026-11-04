import type { Recipe } from "./recipeTypes"

interface RecipeApiResponse {
  meals?: unknown
}

function isRecipe(value: unknown): value is Recipe {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const record = value as Record<string, unknown>
  if (
    typeof record.idMeal !== "string" ||
    typeof record.strMeal !== "string" ||
    typeof record.strMealThumb !== "string"
  ) {
    return false
  }

  const stringFields = [
    "strInstructions",
    "strYoutube",
    ...Array.from({ length: 20 }, (_, index) => [
      `strIngredient${index + 1}`,
      `strMeasure${index + 1}`,
    ]).flat(),
  ]

  return stringFields.every((field) => {
    const fieldValue = record[field]
    return fieldValue === undefined || fieldValue === null || typeof fieldValue === "string"
  })
}

export async function fetchRecipes(url: string): Promise<Recipe[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Unable to load recipes. Please try again.")
  }

  const data: unknown = await response.json()
  if (typeof data !== "object" || data === null || !("meals" in data)) {
    return []
  }

  const meals = (data as RecipeApiResponse).meals
  return Array.isArray(meals)
    ? meals.filter((meal: unknown): meal is Recipe => isRecipe(meal))
    : []
}

export function readSavedFavorites(): Recipe[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]")
    return Array.isArray(saved)
      ? saved.filter((item: unknown): item is Recipe => isRecipe(item))
      : []
  } catch {
    return []
  }
}
