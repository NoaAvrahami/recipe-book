export type IngredientIndex =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

type IngredientFields = {
  [Key in `strIngredient${IngredientIndex}`]?: string | null
}

type MeasureFields = {
  [Key in `strMeasure${IngredientIndex}`]?: string | null
}

export interface Recipe extends IngredientFields, MeasureFields {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strYoutube?: string | null
  strInstructions?: string | null
  strCategory?: string | null
  strArea?: string | null
  strTags?: string | null
  strSource?: string | null
  strImageSource?: string | null
  strCreativeCommonsConfirmed?: string | null
  dateModified?: string | null
}
