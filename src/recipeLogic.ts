import type { Recipe } from "./recipeTypes"

export function toggleFavoriteRecipe(favorites: Recipe[], recipe: Recipe): Recipe[] {
  const isAlreadyFavorite = favorites.some(
    (favorite) => favorite.idMeal === recipe.idMeal,
  )

  return isAlreadyFavorite
    ? favorites.filter((favorite) => favorite.idMeal !== recipe.idMeal)
    : [...favorites, recipe]
}
