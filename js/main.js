// NAVBAR SLIDER

const toggleButton = document.getElementsByClassName('navButton')[0];
const navbarLinks = document.getElementsByClassName('navLinks')[0];

// Add click event listener to each menu item
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
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
  const isClickInsideMenu = navbarLinks.contains(event.target) || event.target.classList.contains('menuWrapper');
  const isClickOnButton = event.target === toggleButton;

  if (!isClickInsideMenu && !isClickOnButton) {
    navbarLinks.classList.remove('active');
  }
});


// Drinks showcase



// API


fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks);
      })
    .catch(err => {
        console.log(`Error ${err}`)
    })


document.querySelector('button').addEventListener('click', getDrink)

document.querySelector('input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    getDrink();
  }
});

function getRandom() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks);
      })
    .catch(err => {
        console.log(`Error ${err}`)
    })
}

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