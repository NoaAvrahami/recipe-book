import { useEffect, useState } from "react"

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("pasta")

  useEffect(() => {
    let isActive = true

    async function fetchRecipes() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`,
        )

        if (!response.ok) {
          throw new Error("Unable to load recipes. Please try again.")
        }

        const data = await response.json()
        if (isActive) {
          setRecipes(data.meals ?? [])
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError.message || "Unable to load recipes.")
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    fetchRecipes()

    return () => {
      isActive = false
    }
  }, [searchQuery])

  const ingredients = selectedRecipe
    ? Array.from({ length: 20 }, (_, index) => {
        const ingredient = selectedRecipe[`strIngredient${index + 1}`]?.trim()
        const measure = selectedRecipe[`strMeasure${index + 1}`]?.trim()

        return ingredient ? { ingredient, measure } : null
      }).filter(Boolean)
    : []

  return (
    <main className="app">
      <h1>Recipe Book</h1>
      <label htmlFor="recipe-search">Search recipes</label>
      <input
        id="recipe-search"
        type="search"
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value)
          setIsLoading(true)
          setError("")
          setSelectedRecipe(null)
        }}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.idMeal}>
                <button
                  type="button"
                  onClick={() => setSelectedRecipe(recipe)}
                  aria-pressed={selectedRecipe?.idMeal === recipe.idMeal}
                >
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                  <h2>{recipe.strMeal}</h2>
                </button>
              </li>
            ))}
          </ul>
        )
      )}

      <section aria-live="polite">
        <h2>Recipe Details</h2>
        {selectedRecipe === null ? (
          <p>Please select a recipe.</p>
        ) : (
          <article>
            <h3>{selectedRecipe.strMeal}</h3>
            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
            />
            <h4>Ingredients</h4>
            {ingredients.length > 0 ? (
              <ul>
                {ingredients.map(({ ingredient, measure }, index) => (
                  <li key={`${ingredient}-${index}`}>
                    {measure ? `${measure} ` : ""}{ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients listed.</p>
            )}
            <h4>Instructions</h4>
            <p>
              {selectedRecipe.strInstructions || "No instructions available."}
            </p>
          </article>
        )}
      </section>
    </main>
  )
}
