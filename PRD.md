# PRD — Recipe Book App

> עמוד אחד. בלי קוד. אפשר לכתוב אותו בעזרת צ'אטבוט (ראו סעיף 5 בדף השיעור).

## 1. Pitch
A clean and simple master-detail web application for finding quick, easy, and tasty recipes.

## 2. Who it is for
Anyone who wants to cook and is looking for accessible, delicious recipe ideas.

## 3. Screens
- **List** — Displays a list of recipes, showing the image and the name of each dish.
- **Details** — Displays the selected recipe's full details, specifically the required ingredients and the step-by-step preparation process.

## 4. Must-have features
עד 5. מה שלא נכנס לכאן — לא בונים עכשיו.

1.Display a list of recipes retrieved from a public API.
2.Click on a recipe in the list to view its full details in a dedicated panel.
3.A search box to filter the recipe list by name.
4.UI states for "Loading..." and "Error" during data fetching.

## 5. Acceptance criteria
3–5 שורות שאפשר לבדוק בעיניים.

- When I open the app, I see a list of recipe names and their images.
- When I click on a specific recipe, I see its ingredients and preparation process.
- When I type "chicken" in the search box, I see only recipes that include "chicken" in their name.
- When the API is fetching data, I see a "Loading..." message on the screen.

## 6. Not now
- User login and authentication.
- Saving recipes to a "Favorites" list.
- Creating an automatic grocery shopping list based on ingredients.

## 7. Data
- **API:** `https://www.themealdb.com/api/json/v1/1/search.php?s=pasta`
- **שדות ברשימה:** `idMeal` (ID), `strMeal` (Name), `strMealThumb` (Image)
- **שדות בפרטים:** `strInstructions` (Process), and the various `strIngredient` fields (Ingredients).
