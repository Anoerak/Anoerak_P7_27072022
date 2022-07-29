class RecipeFactory {
    constructor(data, tag, filter) {
        this._data = data;
        this._recipes = data[0].recettes;
        this._tag = tag;
        this._filter = filter;

        this.$recipeGalleryWrapper = document.querySelector('#recipes_gallery');

        if (this._tag === undefined && this._filter === undefined) {
            this._recipes.forEach(recipe => {
                const recipeCard = new RecipeCard(recipe);
                const recipeCardElement = recipeCard.createRecipeCard();
                this.$recipeGalleryWrapper.appendChild(recipeCardElement);
            });
        } else if (this._tag !== undefined || this._filter !== undefined) {
            // Function to filter by tag or by filter
        } else if (this._filter !== undefined && this._tag === undefined) {
            // Function to filter by tag and by ingredient
        }
    }
}