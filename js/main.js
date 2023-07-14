document.querySelector('button').addEventListener('click', getDrink)

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