const recipes = [
  {
    idMeal: "1",
    strMeal: "Spaghetti Carbonara",
    strMealThumb:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
  },
  {
    idMeal: "2",
    strMeal: "Fresh Garden Salad",
    strMealThumb:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
  },
  {
    idMeal: "3",
    strMeal: "Vegetable Bowl",
    strMealThumb:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  },
]

export default function App() {
  return (
    <main className="app">
      <h1>Recipe Book</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h2>{recipe.strMeal}</h2>
          </li>
        ))}
      </ul>
    </main>
  )
}
