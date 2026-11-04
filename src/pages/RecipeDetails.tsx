import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchRecipes } from "../recipeApi"
import RecipeInformation from "../components/RecipeInformation"
import type { Recipe } from "../recipeTypes"

interface RecipeDetailsProps {
  favorites: Recipe[]
  onToggleFavorite: (recipe: Recipe) => void
}

export default function RecipeDetails({ favorites, onToggleFavorite }: RecipeDetailsProps) {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isActive = true

    async function loadRecipe(): Promise<void> {
      if (!id) {
        setError("Recipe not found.")
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")
      try {
        const results = await fetchRecipes(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
        )
        if (isActive) setRecipe(results[0] ?? null)
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError instanceof Error ? fetchError.message : "Unable to load recipe.")
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadRecipe()
    return () => { isActive = false }
  }, [id])

  if (isLoading) {
    return <p className="state-message loading-state" role="status"><span className="loading-spinner" aria-hidden="true" />Loading recipe...</p>
  }
  if (error) return <p className="state-message error-state" role="alert">{error}</p>
  if (!recipe) return <p className="state-message empty-state">Recipe not found.</p>

  return (
    <RecipeInformation
      recipe={recipe}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
    />
  )
}
