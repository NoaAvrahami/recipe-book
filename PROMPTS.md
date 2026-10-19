# יומן פרומפטים

כל פרומפט שאתם שולחים לסוכן נרשם כאן **אוטומטית** (ראו `README.md`).
אחרי כל משימה, הוסיפו בעצמכם שורה אחת: מה בדקתם, ומה שיניתם בעצמכם.

<!-- הרשומות מתווספות מתחת לשורה הזאת -->
## Task 1
Prompt: Please complete Task 1 from our tasks list. Update App.jsx to show a list of recipes using a local hardcoded array.
Agent did: Added SAMPLE_RECIPES array and used map() to display the recipes.
I checked: Saved the file and checked the browser to see the 3 static recipes.

## Task 2
Prompt: Please complete Task 2. Add a new useState called selectedRecipe. Below the list, add a Details Panel to show recipe info on click.
Agent did: Added the state and the details panel logic with dummy ingredients.
I checked: Clicked on a recipe card and verified the details panel appeared with the correct recipe name.

## Task 3
Prompt: Please complete Task 3. Add isLoading and error states. Use useEffect to fetch data from TheMealDB API and set the recipes state.
Agent did: Replaced the static array with a fetch request and added Loading/Error UI.
I checked: Refreshed the page, saw the "Loading..." message, and then saw real pasta recipes from the API.

## Task 4
Prompt: Please complete Task 4. Add a search input and update the fetch URL to use searchQuery dynamically.
Agent did: Added an input field and updated the useEffect to fetch based on the search term.
I checked: Typed in the search box and saw the list update, but noticed the input lost focus after one letter.

## Fix Search Bug
Prompt: I have a bug: the search input loses focus after typing a single letter. Please fix it by placing the input directly inside the return statement.
Agent did: Moved the input field out of the inline component so React doesn't unmount it.
I checked: Typed "chicken" continuously and verified the cursor didn't jump out.

## Task 5
Prompt: Please complete Task 5. Update the CSS to make the app responsive using Flexbox/Grid with a master-detail layout.
Agent did: Added CSS classes and rules for responsive design (desktop vs mobile).
I checked: Resized the browser window and verified the layout stacks vertically on narrow screens.

## Add YouTube Link
Prompt: The instructor requested that a YouTube video link be displayed. Please check if selectedRecipe.strYoutube exists and add a link at the bottom.
Agent did: Added an <a> tag pointing to the YouTube URL that opens in a new tab.
I checked: Clicked the "Watch on YouTube" button in the details panel and verified it opened the correct video.

## Bonus: LocalStorage Favorites
Prompt: I want to add a bonus feature: saving favorite recipes using localStorage. Please add a favorites state, sync it with useEffect, and add a toggle button in the details panel.
Agent did: Added state initialized from localStorage, a save effect, and a heart button to toggle favorites.
I checked: Clicked the favorite button on a recipe, refreshed the page, and verified the app remembered my selection.

## 2026-10-19

**13:24 . copilot**

> Task 1: Migrate the project to TypeScript. Please rename `App.jsx` and any other component files to `.tsx`. Define a strict TypeScript `interface` or `type` for the Recipe object coming from TheMealDB (including idMeal, strMeal, strMealThumb, strYoutube, etc.), and apply it to all `useState` hooks and component props. Ensure there are no `any` types used in the code. Also, please log this exact prompt at the bottom of `PROMPTS.md`. If there is no header for today's date, add `## 2026-10-19`. Then add the timestamp in the format `**HH:MM . copilot**` followed by this prompt text using the `>` quote forma

**13:37 . copilot**

> Task 2: Implement `react-router-dom`. Please install the package. Refactor the app to use a `<BrowserRouter>` with a Navigation bar (`<nav>`) containing `NavLink` elements. Create the following routes:
>
> 1. `/` : Home page (showing the search input and the recipe list).
> 2. `/recipe/:id` : Details page (use `useParams` to fetch and show details for a specific recipe).
> 3. `/favorites` : A dedicated page displaying recipes saved in localStorage.
> 4. `/random` : A new extra page with a button that fetches and displays a random recipe from `[https://www.themealdb.com/api/json/v1/1/random.php](https://www.themealdb.com/api/json/v1/1/random.php)`.
> Also, please log this exact prompt at the bottom of `PROMPTS.md` under today's date (2026-10-19), adding the timestamp `**HH:MM . copilot**`

**22:33 . copilot**

> Task 3: Add unit tests using Vitest. Please install `vitest` and `@vitest/ui`, and add a `"test:ui": "vitest --ui"` script to `package.json`. Create a test file (e.g., `logic.test.ts` or similar) and write at least 5 passing unit tests. The tests must check actual logic, not just rendering (for example: test a pure function that filters recipes by search query, or test the logic that toggles a favorite recipe ID in an array).
> Also, please log this exact prompt at the bottom of `PROMPTS.md` under today's date (2026-10-19), adding the timestamp `**HH:MM . copilot**`