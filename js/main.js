// NAVBAR SLIDER

const toggleButton = document.getElementsByClassName('navButton')[0];
const navbarLinks = document.getElementsByClassName('navLinks')[0];

// Click event listener to each menu item
const menuItems = document.querySelectorAll('.menu-list a');
for (const item of menuItems) {
  item.addEventListener('click', () => {
    // Close the menu when an item is clicked
    navbarLinks.classList.remove('active');
  });
}

toggleButton.addEventListener('click', (event) => {
  event.stopPropagation();
  navbarLinks.classList.toggle('active');
  // Console purely for debugging
  console.log('click');
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
  const isClickInsideMenu = navbarLinks.contains(event.target) || event.target.classList.contains('menuWrapper');
  const isClickOnButton = event.target === toggleButton;

  if (!isClickInsideMenu && !isClickOnButton) {
    navbarLinks.classList.remove('active');
  }
});

////////////// Drinks showcase

document.addEventListener("DOMContentLoaded", function() {

  // Get the alcoholic and non-alcoholic containers
  const alcoholicContainer = document.querySelector(".drinkType1Container");
  const nonAlcoholicContainer = document.querySelector(".drinkType2Container");
  // Main Ingredient Boxes
  const apiFetchContainers = document.querySelectorAll('.ingredientNameContainer')
  // General Random Cocktail API Fetch
  const randomCocktailFetch = document.querySelector('.shakeBtn');
  // Get the alcoholic and non-alcoholic sections
  const alcoholicSection = document.querySelector(".alcoholic");
  const nonAlcoholicSection = document.querySelector(".non-alcoholic");
  // Fetch the API Info for alcoholic cocktails
  const apiFetchSection = document.querySelector('.cocktailFetchInfo');
  // Fetch the API Info for non-alcoholic cocktails
  const nonAlcFetchInfoSection = document.querySelector('.nonAlcFetchInfo');
  // General random cocktail
  const randomCocktailFetchDisplay = document.querySelector('.randomCocktailDiv');

  // Helper functions
  function hideSection(section) {
    section.classList.remove("show");
    section.classList.add("hideBoxes");
  }

  function showSection(section) {
    section.classList.remove("hideBoxes");
    section.classList.add("show");
  }

  // Event listeners
  alcoholicContainer.addEventListener("click", function() {
    if (alcoholicSection.classList.contains("hideBoxes")) {
      showSection(alcoholicSection);
      hideSection(nonAlcoholicSection);
      hideSection(apiFetchSection);
      hideSection(nonAlcFetchInfoSection);
      hideSection(randomCocktailFetchDisplay);
    } else {
      hideSection(alcoholicSection);
      hideSection(apiFetchSection);
    }
  });

  nonAlcoholicContainer.addEventListener("click", function() {
    if (nonAlcoholicSection.classList.contains("hideBoxes")) {
      showSection(nonAlcoholicSection);
      hideSection(alcoholicSection);
      hideSection(apiFetchSection);
      hideSection(nonAlcFetchInfoSection);
      hideSection(randomCocktailFetchDisplay);
    } else {
      hideSection(nonAlcoholicSection);
      hideSection(nonAlcFetchInfoSection);
    }
  });

  apiFetchContainers.forEach(container => {
    container.addEventListener('click', function() {
      // If it's a non-alcoholic ingredient, don't show the alcoholic API fetch section
      if (!container.closest('.non-alcoholic')) {
        showSection(apiFetchSection);
        hideSection(nonAlcFetchInfoSection);
      }
    });
  });

  randomCocktailFetch.addEventListener('click', function() {
    showSection(randomCocktailFetchDisplay);
    hideSection(alcoholicSection);
    hideSection(nonAlcoholicSection);
    hideSection(apiFetchSection);
    hideSection(nonAlcFetchInfoSection);
  });
  
});


////////////////// Get Cocktail by Main Alcoholic Drink

document.querySelector('.mainIngredientList').addEventListener('click', function(event) {
  const ingredientBox = event.target.closest('[data-ingredient]');

  if (ingredientBox) {
    const ingredient = ingredientBox.dataset.ingredient;
    getDrinksByIngredient(ingredient);
  }
});

// Fetch Main Alcoholic Drink

function getDrinksByIngredient(ingredient) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks);
    const drinksCount = data.drinks.length;
    if (drinksCount > 0) {
      const randomIndex = Math.floor(Math.random() * drinksCount);
      const randomDrinkId = data.drinks[randomIndex].idDrink;
      getDrinkDetails(randomDrinkId);
    } else {
      updateUIForNoDrinks();
    }
  })
  .catch(err => {
    console.error(`Error: ${err}`);
  });
}

// Fetch each drink ID

function getDrinkDetails(drinkId) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
  .then(res => res.json())
  .then(data => {
    const drink = data.drinks[0];
    displayDrinkInfo(drink);
    displayIngredientsAndMeasurements(drink);
  })
  .catch(err => {
    console.error(`Error: ${err}`);
  });
}

// Display Ingredient API info

function displayDrinkInfo(drink) {
  document.querySelector('.cocktailName').innerText = drink.strDrink;
  document.querySelector('.cocktailImage').src = drink.strDrinkThumb;
  document.querySelector('.cocktailGlass').innerText = drink.strGlass;
  document.querySelector('.cocktailDescription').innerText = drink.strInstructions;
}

function displayIngredientsAndMeasurements(drink) {
  const ingredientsList = document.querySelector('.cocktailIngredients');
  ingredientsList.innerHTML = ''; // Clear existing ingredients

  for (let i = 1; i <= 15; i++) { // TheCocktailDB has up to 15 ingredients
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      const listItem = document.createElement('li');
      listItem.textContent = `${measure ? measure : ''} ${ingredient}`;
      ingredientsList.appendChild(listItem);
    }
  }
}

// If no info is available

function updateUIForNoDrinks() {
  document.querySelector('.cocktailName').innerText = 'No drinks found';
  document.querySelector('.cocktailImage').src = '';
  document.querySelector('.cocktailGlass').innerText = '';
  document.querySelector('.cocktailDescription').innerText = '';
  document.querySelector('.cocktailIngredients').innerHTML = '';
}


///////////////////// Fetch API for random Non ALcoholic Cocktail

// Handle click events on the non-alcoholic list
document.querySelector('.nonAlcoholicList').addEventListener('click', function(event) {
  const type = event.target.dataset.type;

  if (type === 'non-alcoholic') {
    getRandomNonAlcoholicDrink();
  }
});

// Fetch a random non-alcoholic drink
function getRandomNonAlcoholicDrink() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks);
    if (data.drinks && data.drinks.length > 0) {
      // Randomly select a non-alcoholic drink from the list
      const randomIndex = Math.floor(Math.random() * data.drinks.length);
      const drink = data.drinks[randomIndex];
      // Fetch the details for the selected drink
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
      .then(res => res.json())
      .then(details => {
        if (details.drinks && details.drinks.length > 0) {
          displayNonAlcoholicDrinkInfo(details.drinks[0]);
        } else {
          updateUIForNoNonAlcoholicDrinks();
        }
      })
      .catch(err => {
        console.error(`Error: ${err}`);
        updateUIForNoNonAlcoholicDrinks();
      });
    } else {
      updateUIForNoNonAlcoholicDrinks();
    }
  })
  .catch(err => {
    console.error(`Error: ${err}`);
    updateUIForNoNonAlcoholicDrinks();
  });
}

// Display random API drink info
function displayNonAlcoholicDrinkInfo(drink) {
  document.querySelector('.nonAlcCocktailName').innerText = drink.strDrink;
  document.querySelector('.nonAlcCocktailImage').src = drink.strDrinkThumb;
  document.querySelector('.nonAlcCocktailGlass').innerText = drink.strGlass;
  document.querySelector('.nonAlcCocktailDescription').innerText = drink.strInstructions;

  const ingredientsList = document.querySelector('.nonAlcCocktailIngredients');
  ingredientsList.innerHTML = ''; // Clear existing ingredients

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      const listItem = document.createElement('li');
      listItem.textContent = `${measure ? measure : ''} ${ingredient}`;
      ingredientsList.appendChild(listItem);
    }
  }

  // Make the nonAlcFetchInfo section visible
  const apiFetchSection = document.querySelector('.nonAlcFetchInfo');
  if (apiFetchSection.classList.contains('hideBoxes')) {
    apiFetchSection.classList.remove('hideBoxes');
    apiFetchSection.classList.add('show');
  }
}

// If no non-alcoholic drink info is available
function updateUIForNoNonAlcoholicDrinks() {
  document.querySelector('.nonAlcCocktailName').innerText = 'No drinks found';
  document.querySelector('.nonAlcCocktailImage').src = '';
  document.querySelector('.nonAlcCocktailGlass').innerText = '';
  document.querySelector('.nonAlcCocktailDescription').innerText = '';
  document.querySelector('.nonAlcCocktailIngredients').innerHTML = '';
}

//////////////////////// Fetch API for Random Cocktail

document.querySelector('.shakeBtn').addEventListener('click', getRandom);

function getRandom() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      console.log(data.drinks);
        const drinksCount = data.drinks.length;
        if (drinksCount > 0) {
          const randomDrink = data.drinks[0];

          document.querySelector('.randomCocktailName').innerText = randomDrink.strDrink;
          document.querySelector('.randomCocktailImage').src = randomDrink.strDrinkThumb;
          document.querySelector('.randomCocktailType').innerText = randomDrink.strAlcoholic;
          document.querySelector('.cocktailGlassRandom').innerText = randomDrink.strGlass;
          document.querySelector('.randomCocktailInstructions').innerText = randomDrink.strInstructions;

          randomIngredientsAndMeasurements(randomDrink, '.randomCocktailIngredients');
          
        } else {
          updateRandomCocktailUIForNoDrinks();
        }
    })
    .catch(err => {
        console.error(`Error: ${err}`);
    });
}


// Fetch API info on ingredients and measurements

function randomIngredientsAndMeasurements(drink, ingredientsContainerSelector) {
  const randomIngredientsList = document.querySelector(ingredientsContainerSelector);
  randomIngredientsList.innerHTML = ''; // Clear existing ingredients

  for (let i = 1; i <= 15; i++) { // TheCocktailDB has up to 15 ingredients
    const randomIngredient = drink[`strIngredient${i}`];
    const randomMeasure = drink[`strMeasure${i}`];
    if (randomIngredient) {
      const listItem = document.createElement('li');
      listItem.textContent = `${randomMeasure ? randomMeasure : ''} ${randomIngredient}`;
      randomIngredientsList.appendChild(listItem);
    }
  }
}

// If no info is available

function updateRandomCocktailUIForNoDrinks() {
  document.querySelector('.randomCocktailName').innerText = "No drinks found";
  document.querySelector('.randomCocktailImage').src = "";
  document.querySelector('.randomCocktailType').innerText = "";
  document.querySelector('.cocktailGlassRandom').innerText = "";
  document.querySelector('.randomCocktailInstructions').innerText = "";
  document.querySelector('.randomCocktailIngredients').innerHTML = '';
}


///////////////////// Fetch API for user input cocktail

document.querySelector('.userInputBtn').addEventListener('click', inputCocktailFetch);


function inputCocktailFetch() {
  let drink = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks);
    const drinksCount = data.drinks.length;
    if (drinksCount > 0) {
      const randomIndex = Math.floor(Math.random() * drinksCount);
      const randomDrink = data.drinks[randomIndex];
    
      document.querySelector('.userCocktailName').innerText = randomDrink.strDrink;
      document.querySelector('.userCocktailInputImage').src = randomDrink.strDrinkThumb;
      document.querySelector('.userCocktailType').innerText = randomDrink.strAlcoholic;
      document.querySelector('.userCocktailGlassType').innerText = randomDrink.strGlass;
      document.querySelector('.userCocktailInstructions').innerText = randomDrink.strInstructions;

    } else {
      document.querySelector('h2').innerText = "No drinks found";
      document.querySelector('img').src = "";
      document.querySelector('h3').innerText = "";
    }
  })
  .catch(err => {
    console.log(`Error ${err}`)
  })
}






































///////////// Get Cocktail by user input

function getDrink() {
  let drink = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks);
    const drinksCount = data.drinks.length;
    if (drinksCount > 0) {
      const randomIndex = Math.floor(Math.random() * drinksCount);
      const randomDrink = data.drinks[randomIndex];
    
      document.querySelector('h2').innerText = randomDrink.strDrink;
      document.querySelector('img').src = randomDrink.strDrinkThumb;
      document.querySelector('h3').innerText = randomDrink.strInstructions;
    } else {
      document.querySelector('h2').innerText = "No drinks found";
      document.querySelector('img').src = "";
      document.querySelector('h3').innerText = "";
    }
  })
  .catch(err => {
    console.log(`Error ${err}`)
  })
}

// Search cocktail by name
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// List all cocktails by first letter
// https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a

// Search ingredients by name
// https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

//  Lookup full details by ID
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Lookup ingredients by ID
// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

// Lookup random cocktail
// https://www.thecocktaildb.com/api/json/v1/1/random.php

// Search by ingredient
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin

// Filter by Alcoholic or Non-Alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

// Filter by Category
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink

// Filter by glass
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass

// List the categories, glasses, ingredients or alcoholic filters
// https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
// https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list

