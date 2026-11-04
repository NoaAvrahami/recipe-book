import { useState } from "react"
import { fetchRecipes } from "../recipeApi"
import RecipeInformation from "../components/RecipeInformation"
import type { Recipe } from "../recipeTypes"

interface RandomRecipeProps {
  favorites: Recipe[]
  onToggleFavorite: (recipe: Recipe) => void
}

export default function RandomRecipe({ favorites, onToggleFavorite }: RandomRecipeProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function loadRandomRecipe(): Promise<void> {
    setIsLoading(true)
    setError("")
    setRecipe(null)
    try {
      const results = await fetchRecipes("https://www.themealdb.com/api/json/v1/1/random.php")
      setRecipe(results[0] ?? null)
      if (results.length === 0) setError("No random recipe was returned. Please try again.")
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Unable to load a random recipe.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="panel random-panel" aria-labelledby="random-title">
      <div className="panel-heading">
        <div><p className="eyebrow">Surprise me</p><h2 id="random-title">Random Recipe</h2></div>
      </div>
      <button
        className="favorites-view-toggle random-button"
        type="button"
        onClick={() => void loadRandomRecipe()}
        disabled={isLoading}
      >
        {isLoading ? "Finding a recipe..." : "Get a random recipe"}
      </button>
      {error && <p className="state-message error-state" role="alert">{error}</p>}
      {isLoading && <p className="state-message loading-state" role="status"><span className="loading-spinner" aria-hidden="true" />Loading recipe...</p>}
      {recipe && !isLoading && (
        <RecipeInformation
          recipe={recipe}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      {!recipe && !isLoading && !error && (
        <p className="state-message empty-state">Click the button to discover something delicious.</p>
      )}
    </section>
  )
}
