import { useEffect, useState } from "react"
import "./App.css"

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
      <header className="app-header">
        <p className="eyebrow">A little inspiration for your kitchen</p>
        <h1>Recipe Book</h1>
        <p className="app-description">
          Find something delicious to make today.
        </p>
        <div className="search-field">
          <label htmlFor="recipe-search">Search recipes</label>
          <input
            id="recipe-search"
            type="search"
            placeholder="Try pasta, chicken, or soup..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value)
              setIsLoading(true)
              setError("")
              setSelectedRecipe(null)
            }}
          />
        </div>
      </header>

      <div className="recipe-layout">
        <section className="panel recipe-list-panel" aria-labelledby="recipes-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Browse</p>
              <h2 id="recipes-title">Recipes</h2>
            </div>
            {!isLoading && !error && recipes.length > 0 && (
              <span className="recipe-count">
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
              </span>
            )}
          </div>

          {isLoading ? (
            <p className="state-message loading-state" role="status">
              <span className="loading-spinner" aria-hidden="true" />
              Loading recipes...
            </p>
          ) : error ? (
            <p className="state-message error-state" role="alert">
              {error}
            </p>
          ) : recipes.length === 0 ? (
            <p className="state-message empty-state">No recipes found</p>
          ) : (
            <ul className="recipe-list">
              {recipes.map((recipe) => (
                <li key={recipe.idMeal}>
                  <button
                    className={`recipe-card${selectedRecipe?.idMeal === recipe.idMeal ? " is-selected" : ""}`}
                    type="button"
                    onClick={() => setSelectedRecipe(recipe)}
                    aria-pressed={selectedRecipe?.idMeal === recipe.idMeal}
                  >
                    <img src={recipe.strMealThumb} alt="" />
                    <span className="recipe-card-copy">
                      <span className="recipe-card-name">{recipe.strMeal}</span>
                      <span className="recipe-card-action">View recipe</span>
                    </span>
                    <span className="recipe-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          className="panel details-panel"
          aria-live="polite"
          aria-labelledby="details-title"
        >
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Make it yours</p>
              <h2 id="details-title">Recipe Details</h2>
            </div>
          </div>
          {selectedRecipe === null ? (
            <div className="detail-placeholder">
              <span className="placeholder-icon" aria-hidden="true">✳</span>
              <h3>Your next favorite</h3>
              <p>Select a recipe to see its ingredients and instructions.</p>
            </div>
          ) : (
            <article className="recipe-details">
              <img
                className="detail-image"
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
              />
              <h3>{selectedRecipe.strMeal}</h3>
              <h4>Ingredients</h4>
              {ingredients.length > 0 ? (
                <ul className="ingredient-list">
                  {ingredients.map(({ ingredient, measure }, index) => (
                    <li key={`${ingredient}-${index}`}>
                      <span>{ingredient}</span>
                      {measure && <span className="ingredient-measure">{measure}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="detail-copy">No ingredients listed.</p>
              )}
              <h4>Instructions</h4>
              <p className="instruction-copy">
                {selectedRecipe.strInstructions || "No instructions available."}
              </p>
              {selectedRecipe.strYoutube?.trim() && (
                <a
                  className="youtube-link"
                  href={selectedRecipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          )}
        </section>
      </div>
    </main>
  )
}
