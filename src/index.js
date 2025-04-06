const card = document.createElement('div');
card.classList.add('card');
document.body.appendChild(card);
const image = document.createElement('img');
card.append(image);
const recipeName = document.createElement('h1');
card.append(recipeName);
const category = document.createElement('p');
card.append(category);
const area = document.createElement('p');
card.append(area);
const youtubeLink = document.createElement('a');
youtubeLink.textContent = 'YouTube Link';
card.append(youtubeLink);
const originalLink = document.createElement('a');
originalLink.textContent = 'Link to original';
card.append(originalLink);
const tagsList = document.createElement('ul');
card.append(tagsList);
const ingredientsList = document.createElement('ul');
card.append(ingredientsList);
const instructionsList = document.createElement('ul');
card.append(instructionsList);
const specialInstructions = document.createElement('div');
card.append(specialInstructions);

async function getRandomRecipe() {
  try {
    const response = await fetch(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    if (!response.ok) {
      throw new Error('Could not fetch a recipe');
    }

    const data = await response.json();

    const recipe = data.meals[0];

    recipeName.textContent = recipe.strMeal;
    category.textContent = recipe.strCategory;
    area.textContent = recipe.strArea;
    image.src = recipe.strMealThumb;
    youtubeLink.href = recipe.strYoutube;
    originalLink.href = recipe.strSource;

    const tags = recipe.strTags ? recipe.strTags.split(',') : [];
    tags.forEach((tag) => {
      const newTag = document.createElement('li');
      newTag.textContent = tag;
      tagsList.append(newTag);
    });
  } catch (error) {
    console.error('Error loading recipe:', error);
  }
}

getRandomRecipe();
