import { describe, expect, it } from "vitest"
import { filterRecipesByQuery, toggleFavoriteRecipe } from "./recipeLogic"
import type { Recipe } from "./recipeTypes"

const recipes: Recipe[] = [
  { idMeal: "1", strMeal: "Pasta Carbonara", strMealThumb: "/carbonara.jpg" },
  { idMeal: "2", strMeal: "Chicken Soup", strMealThumb: "/soup.jpg" },
  { idMeal: "3", strMeal: "Tomato Pasta", strMealThumb: "/tomato.jpg" },
]

describe("filterRecipesByQuery", () => {
  it("returns all recipes when the query is empty", () => {
    expect(filterRecipesByQuery(recipes, "")).toEqual(recipes)
  })

  it("returns all recipes when the query contains only whitespace", () => {
    expect(filterRecipesByQuery(recipes, "   ")).toEqual(recipes)
  })

  it("matches meal names without case sensitivity", () => {
    expect(filterRecipesByQuery(recipes, "PASTA")).toEqual([recipes[0], recipes[2]])
  })

  it("trims whitespace around the query", () => {
    expect(filterRecipesByQuery(recipes, "  soup  ")).toEqual([recipes[1]])
  })

  it("returns an empty list when nothing matches", () => {
    expect(filterRecipesByQuery(recipes, "curry")).toEqual([])
  })
})

describe("toggleFavoriteRecipe", () => {
  it("adds a recipe that is not already a favorite", () => {
    expect(toggleFavoriteRecipe([], recipes[0])).toEqual([recipes[0]])
  })

  it("removes a recipe that is already a favorite", () => {
    expect(toggleFavoriteRecipe([recipes[0], recipes[1]], recipes[0])).toEqual([recipes[1]])
  })

  it("does not mutate the input favorites array", () => {
    const favorites = [recipes[0]]
    toggleFavoriteRecipe(favorites, recipes[1])
    expect(favorites).toEqual([recipes[0]])
  })
})
