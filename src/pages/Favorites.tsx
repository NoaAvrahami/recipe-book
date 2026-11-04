import { Link } from "react-router-dom"
import RecipeList from "../components/RecipeList"
import type { Recipe } from "../recipeTypes"

interface FavoritesProps {
  favorites: Recipe[]
}

export default function Favorites({ favorites }: FavoritesProps) {
  return (
    <section className="panel recipe-list-panel" aria-labelledby="favorites-title">
      <div className="panel-heading">
        <div><p className="eyebrow">Saved for later</p><h2 id="favorites-title">Favorites</h2></div>
      </div>
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
