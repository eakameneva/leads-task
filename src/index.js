function createEl(tag, className, textContent) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}
const card = createEl('article', 'card');
document.body.appendChild(card);

const pictureContainer = createEl('div', 'picture-container');
const image = createEl('img');
image.alt = 'Prepared dish from the recipe';
pictureContainer.append(image);
card.append(pictureContainer);

const cardInfo = createEl('section', 'card-info');
card.append(cardInfo);

const recipeInfo = createEl('section', 'recipe-info');
const recipeName = createEl('h1');
const category = createEl('h2');
const area = createEl('p');
const tagsList = createEl('ul', 'tag-list');

recipeInfo.append(recipeName, category, area, tagsList);
cardInfo.append(recipeInfo);

const buttonContainer = createEl('div', 'button-container');
const ingredientsButton = createEl('button', 'switch-button', 'Ingredients');
const instructionsButton = createEl('button', 'switch-button', 'Instructions');
buttonContainer.append(ingredientsButton, instructionsButton);
cardInfo.append(buttonContainer);

const ingredientsList = createEl('ul', 'ingredients-list');
const instructionsList = createEl('ol', 'instructions-list');

cardInfo.append(ingredientsList, instructionsList);

ingredientsButton.classList.add('active');
instructionsList.classList.add('hidden');

ingredientsButton.addEventListener('click', () => {
  instructionsList.classList.add('hidden');
  ingredientsList.classList.remove('hidden');
  instructionsButton.classList.remove('active');
  ingredientsButton.classList.add('active');
});

instructionsButton.addEventListener('click', () => {
  ingredientsList.classList.add('hidden');
  instructionsList.classList.remove('hidden');
  instructionsButton.classList.add('active');
  ingredientsButton.classList.remove('active');
});

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
    area.textContent = `${recipe.strArea} Cuisine`;
    image.src = recipe.strMealThumb;

    if (recipe.strSource) {
      const originalLink = document.createElement('a');
      originalLink.href = recipe.strSource;
      originalLink.textContent = 'Link to original';
      recipeInfo.append(originalLink);
    }

    let recipeInstructions = recipe.strInstructions
      .replace(/\r/g, '')
      .replace(/\n{2,}/g, '\n')
      .trim();
    const steps = recipeInstructions.split('\n');
    const filteredSteps = [];
    steps.forEach((step) => {
      const cleanStep = step.replace(/^\d+[\.)]?\s*/, '').trim();
      const stepLower = cleanStep.toLowerCase().trim();
      if (stepLower.startsWith('step') || stepLower.startsWith('steps')) return;
      if (cleanStep) {
        filteredSteps.push(cleanStep);
      }
    });

    filteredSteps.forEach((step) => {
      instructionsList.append(createEl('li', '', step));
    });

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(
          `${measure.toLowerCase()} ${ingredient.toLowerCase()}`
        );
      }
    }
    ingredients.forEach((ingredient) => {
      const newIngredient = document.createElement('li');
      const checkbox = createEl('input');
      checkbox.type = 'checkbox';
      checkbox.id = ingredient;
      const label = createEl('label');
      label.setAttribute('for', ingredient);
      label.textContent = ingredient;
      newIngredient.append(checkbox, label);
      ingredientsList.append(newIngredient);
    });

    const tags = recipe.strTags ? recipe.strTags.split(',') : [];
    tags.forEach((tag) => {
      tagsList.append(createEl('li', '', tag));
    });
  } catch (error) {
    console.error('Error loading recipe:', error);
  }
}

getRandomRecipe();
