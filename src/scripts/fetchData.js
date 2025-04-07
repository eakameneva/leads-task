const RECIPE_API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const getRandomRecipe = async () => {
  try {
    const response = await fetch(RECIPE_API_URL);

    if (!response.ok) {
      throw new Error('Could not fetch a recipe');
    }

    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error loading recipe:', error);
    document.body.innerHTML = '';
    createEl('p', {
      className: 'error-message',
      textContent: 'Error loading recipe',
      parent: document.body,
    });
  }
};
