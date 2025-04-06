async function getRandomRecipe() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    if (!response.ok) {
      throw new Error('Could not fetch a recipe');
    }

    const data = await response.json();
  } catch (error) {
    console.error('Error loading recipe:', error);
  }
}

getRandomRecipe();
