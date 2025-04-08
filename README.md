# Recipe Card Project

This project showcases a **responsive recipe card** that displays dynamic recipe information from an API. Every time the page is refreshed, a new recipe is fetched and displayed.

## Deployment

*https://eakameneva.github.io/leads-task/*

## Notes on Data

The data provided by the API is initially somewhat disorganized (sometimes steps already include numbers, or phrases like 'STEP 1' or sentences are improperly separated). I initially attempted to clean the data using regular expressions to format it correctly, but I eventually decided to display the data as-is. This decision was made because adjusting the data for every minor inconsistency is not practical, and doing so could introduce potential risks or errors. Although this may not look perfect, as seen with some of the cards I believe handling the data like this is a more reliable approach when working with live APIs, where inconsistencies are common.

## Features

- **Dish Name**: The name of the dish is displayed prominently.
- **Category**: The category of the dish (e.g., appetizer, main course, etc.).
- **Image**: A picture of the dish fetched from the API.
- **Ingredients & Measurements**: A list of ingredients with their respective measurements with a possibility to check a checkbox to cross the ingredient out.
- **Cooking Instructions**: Step-by-step cooking instructions.
- **Link to Original Recipe**: A link to the original recipe for more details (optional).
- **Area**: The country or region from which the dish originates (optional).
- **Tags**: Tags related to the dish for easy filtering (optional).
- **Live API**: The dish information changes with every refresh of the page or the click on the button with refresh icon (with a tooltip).
- **Cross-browser support**: Ensures compatibility across major browsers (CSS reset and normalization, Autoprefixer).
- **Responsive Design**: The card is fully responsive, designed for mobile, tablet, and desktop screens with media-queries.
- **Transitions/Animations**: Smooth transitions and animations have been applied for better user experience.

## API

The recipe data is fetched from the [Themealdb API](https://www.themealdb.com/api/json/v1/1/random.php), which provides random recipes with detailed information about ingredients, instructions, and more.

## Technologies Used

- **HTML5**
- **CSS3** (with CSS Preprocessor)
- **JavaScript** (Vanilla)
- **Themealdb API**

## Installation & Setup

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/eakameneva/leads-task.git
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

