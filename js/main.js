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
      
      // Toggle visibility for non-alcoholic section
      nonAlcoholicSection.classList.remove("show");
      nonAlcoholicSection.classList.add("hideBoxes");
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
      
      // Toggle visibility for alcoholic section
      alcoholicSection.classList.remove("show");
      alcoholicSection.classList.add("hideBoxes");

      // Toggle visibility for API Cocktail info
      apiFetchSection.classList.remove('show');
      apiFetchSection.classList.add('hideBoxes');
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

  for (let i = 1; i <= 15; i++) { // Maximum amount of ingredients per cocktail
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

document.querySelector('.shakeBtn').addEventListener('click', getRandom)

// document.querySelector('.shakeBtn').addEventListener('keypress', function(event) {
//   if (event.key === 'Enter') {
//     getRandom();
//   }
// });

// Get random Cocktail

function getRandom() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks);
        const drinksCount = data.drinks.length;
        if (drinksCount > 0) {
          const randomIndex = Math.floor(Math.random() * drinksCount);
          const randomDrink = data.drinks[randomIndex];
          
          document.querySelector('.randomCocktailName').innerText = randomDrink.strDrink;
          document.querySelector('.randomCocktailImage').src = randomDrink.strDrinkThumb;
          document.querySelector('.randomCocktailType').innerText = randomDrink.strAlcoholic;
          document.querySelector('.cocktailGlassRandom').innerText = randomDrink.strGlass;
          document.querySelector('.randomCocktailInstructions').innerText = randomDrink.strInstructions;
          
          
          
        } else {
          document.querySelector('.randomCocktailName').innerText = "No drinks found";
          document.querySelector('.randomCocktailImage').src = "";
          document.querySelector('.cocktailType').innerText = "";
          document.querySelector('.cocktailGlassRandom').innerText = "";
          document.querySelector('.randomCocktailInstructions').innerText = "";
          
        }
    })
    .catch(err => {
        console.log(`Error ${err}`)
    })
}



///////////////////////// API RANDOM TEST


// fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php?i=Gin`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data.drinks[0]);
//       })
//     .catch(err => {
//         console.log(`Error ${err}`)
//     })

/////////////////////////

// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Brandy
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila

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
