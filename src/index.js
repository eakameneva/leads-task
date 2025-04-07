const card = document.createElement('div');
card.classList.add('card');
document.body.appendChild(card);
const image = document.createElement('img');
card.append(image);
const category = document.createElement('h2');
card.append(category);
const recipeName = document.createElement('h1');
card.append(recipeName);
const area = document.createElement('p');
card.append(area);
const tagsList = document.createElement('ul');
tagsList.classList.add('tag-list');
card.append(tagsList);
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
const ingredientsButton = document.createElement('button');
ingredientsButton.textContent = 'Ingredients';
const instructionsButton = document.createElement('button');
instructionsButton.textContent = 'Instructions';
buttonContainer.append(ingredientsButton, instructionsButton);
card.append(buttonContainer);
const ingredientsList = document.createElement('ul');
ingredientsList.classList.add('ingredients-list');
card.append(ingredientsList);
const instructionsList = document.createElement('ol');
card.append(instructionsList);
const specialInstructions = document.createElement('div');
card.append(specialInstructions);

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
      card.append(originalLink);
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
