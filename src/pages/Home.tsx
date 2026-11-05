import { useEffect, useState } from "react"
import { fetchRecipes } from "../recipeApi"
import RecipeList from "../components/RecipeList"
import SearchBar from "../components/SearchBar"
import type { Recipe } from "../recipeTypes"

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchQuery, setSearchQuery] = useState("pasta")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isActive = true

    async function loadRecipes(): Promise<void> {
      setIsLoading(true)
      setError("")
      try {
        const results = await fetchRecipes(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`,
        )
        if (isActive) setRecipes(results)
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError instanceof Error ? fetchError.message : "Unable to load recipes.")
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadRecipes()
    return () => { isActive = false }
  }, [searchQuery])

  return (
    <>
      <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
      <section className="panel recipe-list-panel" aria-labelledby="recipes-title">
        <div className="panel-heading">
          <div><p className="eyebrow">Browse</p><h2 id="recipes-title">Recipes</h2></div>
          {!isLoading && !error && recipes.length > 0 && (
            <span className="recipe-count">
              {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
            </span>
          )}
        </div>
        {isLoading ? (
          <p className="state-message loading-state" role="status"><span className="loading-spinner" aria-hidden="true" />Loading recipes...</p>
        ) : error ? (
          <p className="state-message error-state" role="alert">{error}</p>
        ) : recipes.length === 0 ? (
          <p className="state-message empty-state">No recipes found</p>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </section>
    </>
  )
}
