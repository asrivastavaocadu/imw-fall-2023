document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const cocktailList = document.getElementById('cocktail-list');

    // Attach a click event listener to the search button
    searchButton.addEventListener('click', searchCocktails);

    // Attach a key press event listener to the input field
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchCocktails();
        }
    });

    //Search for cocktails
    function searchCocktails() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === '') {
            return;
        }

        //clear previous search results
        cocktailList.innerHTML = '';

        //Fetch cocktail data from the API
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.drinks) {
                    data.drinks.forEach(cocktail => {
                        // Create a card for each cocktail and append it to the cocktail list
                        const cocktailCard = createCocktailCard(cocktail);
                        cocktailList.appendChild(cocktailCard);
                    });
                } else {
                    cocktailList.innerHTML = 'No results found.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                cocktailList.innerHTML = 'An error occurred.';
            });
    }
    // Function to create a cocktail card
    function createCocktailCard(cocktail) {
        const card = document.createElement('div');
        card.className = 'cocktail-card';

        // Create elements for the cocktail: name, image, ingredients, and instructions
        const name = document.createElement('h3');
        name.textContent = cocktail.strDrink;

        const image = document.createElement('img');
        image.src = cocktail.strDrinkThumb;

        const instructions = document.createElement('p');
        instructions.textContent = cocktail.strInstructions;

        const ingredients = createIngredientsList(cocktail);

        //Display elements on the card
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(ingredients);
        card.appendChild(instructions);

        return card;
    }
    //Create an ingredient list
    function createIngredientsList(cocktail) {
        const ingredientsList = document.createElement('ul');
        ingredientsList.className = 'ingredients-list';

        // Loop through ingredient and measurement fields and add them to the list
        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measurement = cocktail[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
                const listItem = document.createElement('li');
                listItem.textContent = `${measurement} ${ingredient}`;
                ingredientsList.appendChild(listItem);
            }
        }

        return ingredientsList;
    }
});
