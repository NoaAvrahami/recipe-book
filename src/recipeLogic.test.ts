import { describe, expect, it } from "vitest"
import { toggleFavoriteRecipe } from "./recipeLogic"
import type { Recipe } from "./recipeTypes"

const recipes: Recipe[] = [
  { idMeal: "1", strMeal: "Pasta Carbonara", strMealThumb: "/carbonara.jpg" },
  { idMeal: "2", strMeal: "Chicken Soup", strMealThumb: "/soup.jpg" },
  { idMeal: "3", strMeal: "Tomato Pasta", strMealThumb: "/tomato.jpg" },
]

describe("toggleFavoriteRecipe", () => {
  it("adds a recipe to an empty favorites array", () => {
    expect(toggleFavoriteRecipe([], recipes[0])).toEqual([recipes[0]])
  })

  it("adds a recipe to an existing favorites array", () => {
    expect(toggleFavoriteRecipe([recipes[0]], recipes[1])).toEqual([
      recipes[0],
      recipes[1],
    ])
  })

  it("removes an existing favorite recipe", () => {
    expect(toggleFavoriteRecipe([recipes[0], recipes[1]], recipes[0])).toEqual([
      recipes[1],
    ])
  })

  it("removes the last favorite and returns an empty array", () => {
    expect(toggleFavoriteRecipe([recipes[0]], recipes[0])).toEqual([])
  })

  it("does not mutate the original favorites array", () => {
    const favorites = [recipes[0]]
    const result = toggleFavoriteRecipe(favorites, recipes[1])

    expect(favorites).toEqual([recipes[0]])
    expect(result).toEqual([recipes[0], recipes[1]])
  })
})
