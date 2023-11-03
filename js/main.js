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
  const apiFetchContainer = document.querySelector('.ingredientNameContainer')

  const randomCocktailFetch = document.querySelector('.shakeBtn');


  // Get the alcoholic and non-alcoholic sections
  const alcoholicSection = document.querySelector(".alcoholic");
  const nonAlcoholicSection = document.querySelector(".non-alcoholic");
  const apiFetchSection = document.querySelector('.cocktailFetchInfo');

  const randomCocktailFetchDisplay = document.querySelector('.randomCocktailDiv');

  // Toggle visibility for alcoholic section
  alcoholicContainer.addEventListener("click", function() {
    if (alcoholicSection.classList.contains("hideBoxes")) {
      alcoholicSection.classList.remove("hideBoxes");
      alcoholicSection.classList.add("show");
      
      // Hide non-alcoholic and API info sections
      nonAlcoholicSection.classList.remove("show");
      nonAlcoholicSection.classList.add("hideBoxes");
      apiFetchSection.classList.remove("show");
      apiFetchSection.classList.add("hideBoxes");
    } else {
      alcoholicSection.classList.remove("show");
      alcoholicSection.classList.add("hideBoxes");
    }
  });

  // Toggle visibility for non-alcoholic section
  nonAlcoholicContainer.addEventListener("click", function() {
    if (nonAlcoholicSection.classList.contains("hideBoxes")) {
      nonAlcoholicSection.classList.remove("hideBoxes");
      nonAlcoholicSection.classList.add("show");
      
      // Hide alcoholic and API info sections
      alcoholicSection.classList.remove("show");
      alcoholicSection.classList.add("hideBoxes");
      apiFetchSection.classList.remove("show");
      apiFetchSection.classList.add("hideBoxes");
    } else {
      nonAlcoholicSection.classList.remove("show");
      nonAlcoholicSection.classList.add("hideBoxes");
    }
});

  // Make API cocktail Info visible
  apiFetchContainer.addEventListener('click', function(){
    if (apiFetchSection.classList.contains('hideBoxes')) {
      apiFetchSection.classList.remove('hideBoxes');
      apiFetchSection.classList.remove('hideBoxes');
      apiFetchSection.classList.add('show');
    }
  })

  // Make Random Cocktail API Info visible
  randomCocktailFetch.addEventListener('click', function() {
    if (randomCocktailFetchDisplay.classList.contains('hideBoxes')) {
      randomCocktailFetchDisplay.classList.remove('hideBoxes');
      randomCocktailFetchDisplay.classList.remove('hideBoxes');
      randomCocktailFetchDisplay.classList.add('show');
    }
  })
  
});


////////// Get Cocktail by specific ingredient

document.querySelector('.mainIngredientList').addEventListener('click', function(event) {
  const ingredientBox = event.target.closest('[data-ingredient]');

  if (ingredientBox) {
    const ingredient = ingredientBox.dataset.ingredient;
    getDrinksByIngredient(ingredient);
  }
});

// Fetch specific ingredient

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

// Fetch API info

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


//////////////////////// Fetch API for Random Cocktail

document.querySelector('.shakeBtn').addEventListener('click', getRandom);

function getRandom() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
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



///////////// Get Cocktail by user input

function getDrink() {
  let drink = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
  .then(res => res.json())
  .then(data => {
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



///////////////////// Fetch API for random Non ALcoholic Cocktail

// document.querySelector('.drinkType2').addEventListener('click', function() {
//   Make sure to hide the alcoholic drinks and random cocktail sections
//   alcoholicSection.classList.remove("show");
//   alcoholicSection.classList.add("hideBoxes");
//   randomCocktailFetchDisplay.classList.remove("show");
//   randomCocktailFetchDisplay.classList.add("hideBoxes");
  
//   getRandomNonAlcoholicDrink();
// });

// function getRandomNonAlcoholicDrink() {
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Non_Alcoholic`)
//     .then(res => res.json())
//     .then(data => {
//         if (data.drinks.length > 0) {
//           const nonAlcDrink = data.drinks[0];

//           // Unhide the box to display the drink
//           document.querySelector('.nonAlcFetchInfo').classList.remove('hideBoxes');

//           document.querySelector('.nonAlcCocktailName').innerText = nonAlcDrink.strDrink;
//           document.querySelector('.nonAlcCocktailImage').src = nonAlcDrink.strDrinkThumb;
//           document.querySelector('.nonAlcCocktailGlass').innerText = nonAlcDrink.strGlass;
//           document.querySelector('.nonAlcCocktailDescription').innerText = nonAlcDrink.strInstructions;

//           nonAlcIngredientsAndMeasurements(nonAlcDrink); // Fixed variable name
          
//         } else {
//           updateForNonAlcDrinks();
//         }
//     })
//     .catch(err => {
//         console.error(`Error: ${err}`);
//     });
// }

// function nonAlcIngredientsAndMeasurements(nonAlcDrink) {
//   const nonAlcIngredients = document.querySelector('.nonAlcCocktailIngredients');
//   nonAlcIngredients.innerHTML = '';

//   for (let i = 1; i <= 15; i++) {
//     const nonAlcIngr = nonAlcDrink[`strIngredient${i}`];
//     const nonAlcMeas = nonAlcDrink[`strMeasure${i}`]; // Fixed typo
//     if(nonAlcIngr) {
//       const listNonAlc = document.createElement('li');
//       listNonAlc.textContent = `${nonAlcMeas ? nonAlcMeas : ''} ${nonAlcIngr}`;
//       nonAlcIngredients.appendChild(listNonAlc);
//     }
//   }
// }

// function updateForNonAlcDrinks() {
//   // Fixed to update non-alcoholic elements
//   document.querySelector('.nonAlcCocktailName').innerText = 'No drinks found';
//   document.querySelector('.nonAlcCocktailImage').src = '';
//   document.querySelector('.nonAlcCocktailGlass').innerText = '';
//   document.querySelector('.nonAlcCocktailDescription').innerText = '';
//   document.querySelector('.nonAlcCocktailIngredients').innerHTML = '';
// }

