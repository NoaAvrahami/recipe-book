import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Favorites from "./pages/Favorites"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import RandomRecipe from "./pages/RandomRecipe"
import RecipeDetails from "./pages/RecipeDetails"
import { readSavedFavorites } from "./recipeApi"
import { toggleFavoriteRecipe } from "./recipeLogic"
import type { Recipe } from "./recipeTypes"
import "./App.css"

export default function App() {
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
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/recipe/:id"
          element={<RecipeDetails favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route path="/favorites" element={<Favorites favorites={favorites} />} />
        <Route
          path="/random"
          element={<RandomRecipe favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}
