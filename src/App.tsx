import { useEffect, useState } from "react"
import {
  Link,
  NavLink,
  Route,
  Routes,
  useParams,
} from "react-router-dom"
import { filterRecipesByQuery, toggleFavoriteRecipe } from "./recipeLogic"
import type { IngredientIndex, Recipe } from "./recipeTypes"
import "./App.css"

interface Ingredient {
  ingredient: string
  measure: string
}

interface RecipeApiResponse {
  meals?: unknown
}

interface RecipeDetailsProps {
  recipe: Recipe
  favorites: Recipe[]
  onToggleFavorite: (recipe: Recipe) => void
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

  const stringFields = ["strInstructions", "strYoutube", ...Array.from(
    { length: 20 },
    (_, index) => [`strIngredient${index + 1}`, `strMeasure${index + 1}`],
  ).flat()]

  return stringFields.every((field) => {
    const fieldValue = record[field]
    return fieldValue === undefined || fieldValue === null || typeof fieldValue === "string"
  })
}

async function fetchRecipes(url: string): Promise<Recipe[]> {
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

function readSavedFavorites(): Recipe[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("favoriteRecipes") || "[]")
    return Array.isArray(saved)
      ? saved.filter((item: unknown): item is Recipe => isRecipe(item))
      : []
  } catch {
    return []
  }
}

function App() {
  const [favorites, setFavorites] = useState<Recipe[]>(readSavedFavorites)

  useEffect(() => {
    try {
      localStorage.setItem("favoriteRecipes", JSON.stringify(favorites))
    } catch {
      // Favorites remain usable for this session if localStorage is unavailable.
    }
  }, [favorites])

  function toggleFavorite(recipe: Recipe): void {
    setFavorites((currentFavorites) => toggleFavoriteRecipe(currentFavorites, recipe))
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">A little inspiration for your kitchen</p>
        <h1>Recipe Book</h1>
        <p className="app-description">Find something delicious to make today.</p>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
            Favorites
          </NavLink>
          <NavLink to="/random" className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}>
            Random
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/recipe/:id"
          element={<RecipePage favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<FavoritesPage favorites={favorites} />}
        />
        <Route
          path="/random"
          element={<RandomPage favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

function HomePage() {
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

  const displayedRecipes = filterRecipesByQuery(recipes, searchQuery)

  return (
    <>
      <section className="search-field home-search">
        <label htmlFor="recipe-search">Search recipes</label>
        <input
          id="recipe-search"
          type="search"
          placeholder="Try pasta, chicken, or soup..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </section>
      <section className="panel recipe-list-panel" aria-labelledby="recipes-title">
        <div className="panel-heading">
          <div><p className="eyebrow">Browse</p><h2 id="recipes-title">Recipes</h2></div>
          {!isLoading && !error && displayedRecipes.length > 0 && (
            <span className="recipe-count">{displayedRecipes.length} {displayedRecipes.length === 1 ? "recipe" : "recipes"}</span>
          )}
        </div>
        {isLoading ? (
          <p className="state-message loading-state" role="status"><span className="loading-spinner" aria-hidden="true" />Loading recipes...</p>
        ) : error ? (
          <p className="state-message error-state" role="alert">{error}</p>
        ) : displayedRecipes.length === 0 ? (
          <p className="state-message empty-state">No recipes found</p>
        ) : (
          <RecipeList recipes={displayedRecipes} />
        )}
      </section>
    </>
  )
}

function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.idMeal}>
          <Link className="recipe-card" to={`/recipe/${encodeURIComponent(recipe.idMeal)}`}>
            <img src={recipe.strMealThumb} alt="" />
            <span className="recipe-card-copy">
              <span className="recipe-card-name">{recipe.strMeal}</span>
              <span className="recipe-card-action">View recipe</span>
            </span>
            <span className="recipe-card-arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function RecipePage({ favorites, onToggleFavorite }: RecipeDetailsProps) {
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

  if (isLoading) return <p className="state-message loading-state" role="status"><span className="loading-spinner" aria-hidden="true" />Loading recipe...</p>
  if (error) return <p className="state-message error-state" role="alert">{error}</p>
  if (!recipe) return <p className="state-message empty-state">Recipe not found.</p>
  return <RecipeDetails recipe={recipe} favorites={favorites} onToggleFavorite={onToggleFavorite} />
}

function FavoritesPage({ favorites }: { favorites: Recipe[] }) {
  return (
    <section className="panel recipe-list-panel" aria-labelledby="favorites-title">
      <div className="panel-heading"><div><p className="eyebrow">Saved for later</p><h2 id="favorites-title">Favorites</h2></div></div>
      {favorites.length > 0 ? <RecipeList recipes={favorites} /> : (
        <div className="detail-placeholder">
          <span className="placeholder-icon" aria-hidden="true">♡</span>
          <h3>No favorites yet</h3>
          <p>Save a recipe from its details page and it will appear here.</p>
          <Link className="youtube-link" to="/">Browse recipes</Link>
        </div>
      )}
    </section>
  )
}

function RandomPage({ favorites, onToggleFavorite }: RecipeDetailsProps) {
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
      <div className="panel-heading"><div><p className="eyebrow">Surprise me</p><h2 id="random-title">Random Recipe</h2></div></div>
      <button className="favorites-view-toggle random-button" type="button" onClick={() => void loadRandomRecipe()} disabled={isLoading}>
        {isLoading ? "Finding a recipe..." : "Get a random recipe"}
      </button>
      {error && <p className="state-message error-state" role="alert">{error}</p>}
      {isLoading && <p className="state-message loading-state" role="status"><span className="loading-spinner" aria-hidden="true" />Loading recipe...</p>}
      {recipe && !isLoading && <RecipeDetails recipe={recipe} favorites={favorites} onToggleFavorite={onToggleFavorite} />}
      {!recipe && !isLoading && !error && <p className="state-message empty-state">Click the button to discover something delicious.</p>}
    </section>
  )
}

function RecipeDetails({ recipe, favorites, onToggleFavorite }: RecipeDetailsProps) {
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
      <button className={`favorite-button${isFavorite ? " is-favorite" : ""}`} type="button" onClick={() => onToggleFavorite(recipe)} aria-pressed={isFavorite}>
        {isFavorite ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}
      </button>
      <h4>Ingredients</h4>
      {ingredients.length > 0 ? (
        <ul className="ingredient-list">
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={`${recipe.idMeal}-${ingredient}-${index}`}><span>{ingredient}</span>{measure && <span className="ingredient-measure">{measure}</span>}</li>
          ))}
        </ul>
      ) : <p className="detail-copy">No ingredients listed.</p>}
      <h4>Instructions</h4>
      <p className="instruction-copy">{recipe.strInstructions || "No instructions available."}</p>
      {recipe.strYoutube?.trim() && (
        <a className="youtube-link" href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a>
      )}
    </article>
  )
}

function NotFoundPage() {
  return (
    <section className="panel detail-placeholder">
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
      <Link className="youtube-link" to="/">Return home</Link>
    </section>
  )
}

export default App
