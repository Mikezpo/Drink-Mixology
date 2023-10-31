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


  // Get the alcoholic and non-alcoholic sections
  const alcoholicSection = document.querySelector(".alcoholic");
  const nonAlcoholicSection = document.querySelector(".non-alcoholic");
  const apiFetchSection = document.querySelector('.cocktailFetchInfo');

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
  
});


////////// Get Cocktail by specific ingredient

document.querySelector('.mainIngredientList').addEventListener('click', function(event) {
  const ingredientBox = event.target.closest('[data-ingredient]');

  if (ingredientBox) {
    const ingredient = ingredientBox.dataset.ingredient;
    getDrinksByIngredient(ingredient);
  }
});


function getDrinksByIngredient(ingredient) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php?i=${ingredient}`)
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks);
    const drinksCount = data.drinks.length;
    if (drinksCount > 0) {
      const randomIndex = Math.floor(Math.random() * drinksCount);
      const randomDrink = data.drinks[randomIndex];
      
      document.querySelector('.cocktailname').innerText = randomDrink.strDrink;
      document.querySelector('.cocktailImage').src = randomDrink.strDrinkThumb;
      document.querySelector('.cocktailDescription').innerText = randomDrink.strInstructions;
    } else {
      document.querySelector('.cocktailname').innerText = "No drinks found";
      document.querySelector('.cocktailImage').src = "";
      document.querySelector('.cocktailDescription').innerText = "";
    }
  })
  .catch(err => {
    console.log(`Error ${err}`);
  });
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
          document.querySelector('.RandomCocktailDescription').innerText = randomDrink.strInstructions;
        } else {
          document.querySelector('.randomCocktailName').innerText = "No drinks found";
          document.querySelector('.randomCocktailImage').src = "";
          document.querySelector('.RandomCocktailDescription').innerText = "";
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






// Gin

// document.querySelector('.ingredientName-1Container').addEventListener('click', getGin)

// function getGin() {
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.drinks);
//     const drinksCount = data.drinks.length;
//     if (drinksCount > 0) {
//       const randomIndex = Math.floor(Math.random() * drinksCount);
//       const randomDrink = data.drinks[randomIndex];
      
//       document.querySelector('.cocktailname').innerText = randomDrink.strDrink;
//       document.querySelector('.cocktailImage').src = randomDrink.strDrinkThumb;
//       document.querySelector('.cocktailDescription').innerText = randomDrink.strInstructions;
//     } else {
//       document.querySelector('.cocktailname').innerText = "No drinks found";
//       document.querySelector('.cocktailImage').src = "";
//       document.querySelector('.cocktailDescription').innerText = "";
//     }
//   })
//   .catch(err => {
//     console.log(`Error ${err}`)
//   })
// }

// Vodka

// document.querySelector('.ingredient-2').addEventListener('click', getVodka)

// function getVodka() {
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka`)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.drinks);
//   })
//   .catch(err => {
//     console.log(`Error ${err}`)
//   })
// }

// Whiskey

// document.querySelector('.ingredient-3').addEventListener('click', getWhiskey)

// function getVodka() {
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka`)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.drinks);
//   })
//   .catch(err => {
//     console.log(`Error ${err}`)
//   })
// }

// Rum

// document.querySelector('.ingredient-3').addEventListener('click', getRum)

// function getRum() {
//   fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum`)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.drinks);
//   })
//   .catch(err => {
//     console.log(`Error ${err}`)
//   })
// }

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

// Path for each drink name

// dateModified
// : 
// "2015-08-18 14:42:59"
// idDrink
// : 
// "11007"
// strAlcoholic
// : 
// "Alcoholic"
// strCategory
// : 
// "Ordinary Drink"
// strCreativeCommonsConfirmed
// : 
// "Yes"
// strDrink
// : 
// "Margarita"
// strDrinkAlternate
// : 
// null
// strDrinkThumb
// : 
// "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
// strGlass
// : 
// "Cocktail glass"
// strIBA
// : 
// "Contemporary Classics"
// strImageAttribution
// : 
// "Cocktailmarler"
// strImageSource
// : 
// "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg"
// strIngredient1
// : 
// "Tequila"
// strIngredient2
// : 
// "Triple sec"
// strIngredient3
// : 
// "Lime juice"
// strIngredient4
// : 
// "Salt"
// strIngredient5
// : 
// null
// strIngredient6
// : 
// null
// strIngredient7
// : 
// null
// strIngredient8
// : 
// null
// strIngredient9
// : 
// null
// strIngredient10
// : 
// null
// strIngredient11
// : 
// null
// strIngredient12
// : 
// null
// strIngredient13
// : 
// null
// strIngredient14
// : 
// null
// strIngredient15
// : 
// null
// strInstructions
// : 
// "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass."
// strInstructionsDE
// : 
// "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben."
// strInstructionsES
// : 
// null
// strInstructionsFR
// : 
// null
// strInstructionsIT
// : 
// "Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere."
// strInstructionsZH-HANS
// : 
// null
// strInstructionsZH-HANT
// : 
// null
// strMeasure1
// : 
// "1 1/2 oz "
// strMeasure2
// : 
// "1/2 oz "
// strMeasure3
// : 
// "1 oz "
// strMeasure4
// : 
// null
// strMeasure5
// : 
// null
// strMeasure6
// : 
// null
// strMeasure7
// : 
// null
// strMeasure8
// : 
// null
// strMeasure9
// : 
// null
// strMeasure10
// : 
// null
// strMeasure11
// : 
// null
// strMeasure12
// : 
// null
// strMeasure13
// : 
// null
// strMeasure14
// : 
// null
// strMeasure15
// : 
// null
// strTags
// : 
// "IBA,ContemporaryClassic"
// strVideo
// : 
// null