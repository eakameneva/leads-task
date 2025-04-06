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
      newIngredient.textContent = ingredient;
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
