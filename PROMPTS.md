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