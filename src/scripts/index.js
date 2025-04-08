import { getRandomRecipe } from '../scripts/fetchData.js';
import { createEl } from '../scripts/utils.js';

const REFRESH_DELAY = 800;
const MAX_INGREDIENTS_COUNT = 20;

const card = createEl('article', {
  className: 'card',
  parent: document.body,
});
const recipeHead = createEl('div', { className: 'recipe-head', parent: card });
const pictureContainer = createEl('div', {
  className: 'picture-container',
  parent: recipeHead,
});
const image = createEl('img', {
  parent: pictureContainer,
  alt: 'Prepared dish from the recipe',
});
const refreshButton = createEl('button', {
  className: 'refresh-button',
  parent: pictureContainer,
  title: 'Refresh page and get new recipe',
});
const cardInfo = createEl('section', {
  className: 'card-info',
  parent: card,
});
const recipeInfo = createEl('section', {
  className: 'recipe-info',
  parent: recipeHead,
});
const recipeName = createEl('h1', { parent: recipeInfo });
const category = createEl('h2', { parent: recipeInfo });
const area = createEl('p', { className: 'area', parent: recipeInfo });
const tagsList = createEl('ul', {
  className: 'tag-list',
  parent: recipeInfo,
});
const buttonContainer = createEl('div', {
  className: 'button-container',
  parent: cardInfo,
});
const ingredientsButton = createEl('button', {
  className: 'switch-button active',
  textContent: 'Ingredients',
  parent: buttonContainer,
});
const instructionsButton = createEl('button', {
  className: 'switch-button',
  textContent: 'Instructions',
  parent: buttonContainer,
});
const ingredientsList = createEl('ul', {
  className: 'ingredients-list',
  parent: cardInfo,
});
const instructionsList = createEl('ol', {
  className: 'instructions-list hidden',
  parent: cardInfo,
});

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

refreshButton.addEventListener('click', () => {
  refreshButton.classList.add('spin');
  setTimeout(() => {
    refreshButton.classList.remove('spin');
    location.reload();
  }, REFRESH_DELAY);
});

const getFormattedRecipeSteps = (instructions) => {
  const recipeInstructions = instructions
    .replace(/\r/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
  const steps = recipeInstructions.split('\n');
  return steps;
};

const assignAttributeValues = (recipe) => {
  const { strMeal, strCategory, strArea, strMealThumb } = recipe;
  recipeName.textContent = strMeal;
  category.textContent = strCategory;
  area.textContent = `${strArea} Cuisine`;
  image.src = strMealThumb;
};

const createSourceLink = (recipe) => {
  const { strSource } = recipe;
  createEl('a', {
    className: 'recipe-link',
    textContent: 'Go to original recipe →',
    href: strSource,
    target: '_blank',
    parent: recipeInfo,
  });
};

const createIngredientCheckbox = (ingredient) => {
  const newIngredient = createEl('li', { parent: ingredientsList });
  createEl('input', {
    type: 'checkbox',
    id: ingredient,
    parent: newIngredient,
  });
  const label = createEl('label', {
    parent: newIngredient,
  });
  label.setAttribute('for', ingredient);
  createEl('span', {
    textContent: ingredient,
    parent: label,
  });
};

const fillIngredientsList = (recipe) => {
  for (let i = 1; i <= MAX_INGREDIENTS_COUNT; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient) {
      const measuredIngredient = `${measure.toLowerCase()} ${ingredient.toLowerCase()}`;
      createIngredientCheckbox(measuredIngredient);
    }
  }
};

const fillInstructionsList = (recipe) => {
  const recipeSteps = getFormattedRecipeSteps(recipe.strInstructions);

  recipeSteps.forEach((step) => {
    createEl('li', { textContent: step, parent: instructionsList });
  });
};

const fillTagsList = (recipe) => {
  const { strTags } = recipe;
  const tags = strTags
    ? strTags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    : [];

  tags.forEach((tag) => {
    createEl('li', { textContent: tag, parent: tagsList });
  });
};

const setRecipeData = async () => {
  const recipe = await getRandomRecipe();

  assignAttributeValues(recipe);

  if (recipe.strSource) {
    createSourceLink(recipe);
  }

  fillInstructionsList(recipe);
  fillIngredientsList(recipe);
  fillTagsList(recipe);
};

setRecipeData();
