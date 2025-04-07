const card = document.createElement('article');
card.classList.add('card');
document.body.appendChild(card);
const pictureContainer = document.createElement('div');
pictureContainer.classList.add('picture-container');
card.appendChild(pictureContainer);
const image = document.createElement('img');
pictureContainer.append(image);
card.append(pictureContainer);
const cardInfo = document.createElement('section');
cardInfo.classList.add('card-info');
card.append(cardInfo);
const recipeInfo = document.createElement('section');
recipeInfo.classList.add('recipe-info');
cardInfo.append(recipeInfo);
const recipeName = document.createElement('h1');
recipeInfo.append(recipeName);
const category = document.createElement('h2');
recipeInfo.append(category);
const area = document.createElement('p');
recipeInfo.append(area);
const tagsList = document.createElement('ul');
tagsList.classList.add('tag-list');
recipeInfo.append(tagsList);
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
const ingredientsButton = document.createElement('button');
ingredientsButton.classList.add('switch-button');
ingredientsButton.textContent = 'Ingredients';
const instructionsButton = document.createElement('button');
instructionsButton.classList.add('switch-button');
instructionsButton.textContent = 'Instructions';
buttonContainer.append(ingredientsButton, instructionsButton);
cardInfo.append(buttonContainer);
const ingredientsList = document.createElement('ul');
ingredientsList.classList.add('ingredients-list');
cardInfo.append(ingredientsList);
const instructionsList = document.createElement('ol');
cardInfo.append(instructionsList);
const specialInstructions = document.createElement('div');
instructionsList.append(specialInstructions);

instructionsList.classList.add('hidden');
ingredientsButton.classList.add('active');

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
    const specialSections = ['TO SERVE', 'Variations', 'Notes'];
    const filteredSteps = [];
    steps.forEach((step) => {
      const stepLower = step.toLowerCase().trim();

      if (stepLower.startsWith('step') || stepLower.startsWith('steps')) return;

      if (
        specialSections.some((section) =>
          stepLower.startsWith(section.toLowerCase())
        )
      ) {
        const specialParagraph = document.createElement('p');
        const strongTag = document.createElement('strong');
        strongTag.textContent = step;
        specialParagraph.appendChild(strongTag);
        specialInstructions.appendChild(specialParagraph);
      } else {
        const cleanStep = step.replace(/^\d+[\.)]\s*/, '').trim();

        if (cleanStep) {
          filteredSteps.push(cleanStep);
        }
      }
    });

    filteredSteps.forEach((step) => {
      const newStep = document.createElement('li');
      newStep.textContent = step;
      instructionsList.append(newStep);
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
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = ingredient;
      const label = document.createElement('label');
      label.setAttribute('for', ingredient);
      label.textContent = ingredient;
      newIngredient.appendChild(checkbox);
      newIngredient.appendChild(label);
      ingredientsList.append(newIngredient);
    });

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
