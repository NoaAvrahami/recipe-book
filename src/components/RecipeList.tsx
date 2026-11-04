import type { Recipe } from "../recipeTypes"
import RecipeCard from "./RecipeCard"

interface RecipeListProps {
  recipes: Recipe[]
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)}
    </ul>
  )
}
