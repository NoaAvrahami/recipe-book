import { Link } from "react-router-dom"
import type { Recipe } from "../recipeTypes"

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <li>
      <Link className="recipe-card" to={`/recipe/${encodeURIComponent(recipe.idMeal)}`}>
        <img src={recipe.strMealThumb} alt="" />
        <span className="recipe-card-copy">
          <span className="recipe-card-name">{recipe.strMeal}</span>
          <span className="recipe-card-action">View recipe</span>
        </span>
        <span className="recipe-card-arrow" aria-hidden="true">→</span>
      </Link>
    </li>
  )
}
