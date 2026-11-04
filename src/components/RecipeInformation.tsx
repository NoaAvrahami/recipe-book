import type { IngredientIndex, Recipe } from "../recipeTypes"

interface RecipeInformationProps {
  recipe: Recipe
  favorites: Recipe[]
  onToggleFavorite: (recipe: Recipe) => void
}

interface Ingredient {
  ingredient: string
  measure: string
}

export default function RecipeInformation({
  recipe,
  favorites,
  onToggleFavorite,
}: RecipeInformationProps) {
  const isFavorite = favorites.some((favorite) => favorite.idMeal === recipe.idMeal)
  const ingredients: Ingredient[] = Array.from({ length: 20 }, (_, index) => {
    const ingredientIndex = (index + 1) as IngredientIndex
    const ingredient = recipe[`strIngredient${ingredientIndex}`]?.trim()
    const measure = recipe[`strMeasure${ingredientIndex}`]?.trim()
    return ingredient ? { ingredient, measure: measure || "" } : null
  }).filter((ingredient): ingredient is Ingredient => ingredient !== null)

  return (
    <article className="panel recipe-details">
      <img className="detail-image" src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>{recipe.strMeal}</h2>
      <button
        className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
        type="button"
        onClick={() => onToggleFavorite(recipe)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}
      </button>
      <h4>Ingredients</h4>
      {ingredients.length > 0 ? (
        <ul className="ingredient-list">
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={`${recipe.idMeal}-${ingredient}-${index}`}>
              <span>{ingredient}</span>
              {measure && <span className="ingredient-measure">{measure}</span>}
            </li>
          ))}
        </ul>
      ) : <p className="detail-copy">No ingredients listed.</p>}
      <h4>Instructions</h4>
      <p className="instruction-copy">{recipe.strInstructions || "No instructions available."}</p>
      {recipe.strYoutube?.trim() && (
        <a className="youtube-link" href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  )
}
