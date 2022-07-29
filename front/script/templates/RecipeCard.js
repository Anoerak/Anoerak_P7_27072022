class RecipeCard {
    constructor(data) {
        this._recipe = data;
        this.$recipeGalleryWrapper = document.querySelector('#recipes_gallery');
    }

    createRecipeCard() {
        const recipeCardModel = new RecipeCardModel(this._recipe);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="#" alt="#">
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

    createListOfIngredients() {
        const recipeCardModel = new RecipeCardModel(this._recipe);
        let ingredients = recipeCardModel.ingredients;
        this.$ingredientsListWrapper = document.createElement('ul');
        ingredients.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `
                <b>${element.ingredient}:</b> ${element.quantity} ${element.unit}
            `;
            this.$ingredientsListWrapper.appendChild(li);
        });
        return this.$ingredientsListWrapper;
    }
}