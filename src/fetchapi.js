function buttonClicked() {
    var search = document.getElementById('meal').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        displayProducts(data)

        
    });
}

function displayProducts(products) {
    var html = '';

    for (var i = 0; i < products.meals.length; i++) {
        var meal = products.meals[i];
        var ingredientsList = '<ul>'; 

        for (var j = 1; j <= 15; j++) {
            var ingredient = meal[`strIngredient${j}`];
            var measure = meal[`strMeasure${j}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredientsList += `<li>${ingredient} - ${measure}</li>`;
            }
        }

        ingredientsList += '</ul>';

        var instructionsSteps = meal.strInstructions.split('\r\n');
        var instructionsList = '<ul>';

        instructionsSteps.forEach(step => {
            if (step.trim() !== '') {
                instructionsList += `<li>${step}</li>`;
            }
        });

        instructionsList += '</ul>';

        var youtubeLink = meal.strYoutube;

        var pic = meal.strMealThumb;

        html += `
            <div class="meals">
                <div class="meals-recipe">
                    <img src="${pic}" alt="meal(s)">
                </div>
                <div class="desc">
                    <h2>${meal.strMeal}</h2>
                    <h3>Instructions:</h3>
                    <p>${instructionsList}</p>
                    <h3>Ingredients:</h3>
                    <p>${ingredientsList}<p>
                    <h4>Video References</h4>
                    <a href="${youtubeLink}" target="_blank">${youtubeLink}</a>
                </div>
            </div>`;
    }

    document.getElementById('display').innerHTML = html;
}
