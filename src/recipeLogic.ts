import type { Recipe } from "./recipeTypes"

export function filterRecipesByQuery(recipes: Recipe[], query: string): Recipe[] {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) {
    return recipes
  }

  return recipes.filter((recipe) =>
    recipe.strMeal.toLocaleLowerCase().includes(normalizedQuery),
  )
}

export function toggleFavoriteRecipe(favorites: Recipe[], recipe: Recipe): Recipe[] {
  const isAlreadyFavorite = favorites.some(
    (favorite) => favorite.idMeal === recipe.idMeal,
  )

  return isAlreadyFavorite
    ? favorites.filter((favorite) => favorite.idMeal !== recipe.idMeal)
    : [...favorites, recipe]
}
