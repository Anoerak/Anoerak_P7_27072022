class RecipeCardTemplate {
    constructor(data) {
        this._recipe = data;
    }

    // Creates the Recipe Card Element and Returns it
    createRecipeCard() {
        const recipeCardModel = new RecipeCardModel(this._recipe);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="#" alt="Pas d'images">
            <div class="card_content">
                <header>
                    <h2>${recipeCardModel.name}</h2>
                    <div class="time">
                        <i class="fa-solid fa-clock"></i>
                        <p>${recipeCardModel.time} min</p>
                    </div>
                </header>
                <div class="informations">
                    <div class="ingredients">
                        <ul>
                            ${this.createListOfIngredients().innerHTML}
                        <ul>
                    </div>
                    <div class="description">
                        <p>${recipeCardModel.description}</p>
                    </div>
                </div>
            </div>
        `;
        return card;
    }

    // Creates the List of Ingredients and Returns it Based on Informations Available in the Recipe (Units, Quantity, Name)
    createListOfIngredients() {
        const recipeCardModel = new RecipeCardModel(this._recipe);
        let ingredients = recipeCardModel.ingredients;
        this.$ingredientsListWrapper = document.createElement('ul');
        ingredients.forEach(element => {
            if (element.quantity === undefined) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <b>${element.ingredient}</b>
                `;
                this.$ingredientsListWrapper.appendChild(li);  
            } else if (element.unit === undefined) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <b>${element.ingredient}:</b> ${element.quantity}
                `;
                this.$ingredientsListWrapper.appendChild(li);  
            } else {
                const li = document.createElement('li');
                li.innerHTML = `
                    <b>${element.ingredient}:</b> ${element.quantity} ${element.unit}
                `;
                this.$ingredientsListWrapper.appendChild(li);
            }
        });
        return this.$ingredientsListWrapper;
    }

    createNoRecipesFound() {
        const noRecipesFound = document.createElement('div');
        noRecipesFound.classList.add('no_recipes_found');
        noRecipesFound.innerHTML = `
            <p>Aucune recette ne correspond à votre critère... <br>
            vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
        `;
        return noRecipesFound;
    }

    createMinimumSearchLength() {
        const minimumSearchLength = document.createElement('div');
        minimumSearchLength.classList.add('minimum_search_length');
        minimumSearchLength.innerHTML = `
            <p>Votre recherche doit contenir au moins 3 caractères</p>
        `;
        return minimumSearchLength;
    }
}