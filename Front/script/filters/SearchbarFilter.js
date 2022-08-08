class SearchbarFilter {
    constructor(data) {
        this.$gallery = document.querySelector('#recipes_gallery');
        this.$searchbar = document.querySelector('#searchbar_input');
        this.$searchbar.addEventListener('input', this.searchRegex.bind(this));

        this._recipes = data;

        this.inputRegex = /^[a-zA-Z éèêëàäâïîöôùüûœøæêÀÄÂÉÈËÊÏÎÔÖÙÛÜ-]{3,}$/;
    }

    searchRegex() {
        const searchValue = this.$searchbar.value;
        this.inputRegex.test(searchValue) ? this.searchFunction(this._recipes, searchValue) : this.searchReset();
    }

    searchReset() {
        this.$gallery.innerHTML = '';
        const recipesFilter = new RecipesFilter();
        recipesFilter.displayRecipes(this._recipes);
    }

    searchFunction(recipes, searchValue) {
        // const filteredRecipesByTitles = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue));
        // const filteredRecipesByIngredients = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue)));
        // const filteredRecipesByDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(searchValue));
        // const filteredRecipesConcat = filteredRecipesByTitles.concat(filteredRecipesByIngredients, filteredRecipesByDescription);
        // const filteredRecipes = [...new Set(filteredRecipesConcat)];

        const filteredRecipes = 
            recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue) || 
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue)) || 
            recipe.description.toLowerCase().includes(searchValue));


        this.$gallery.innerHTML = '';
        if (filteredRecipes.length > 0) {
            const recipesFilter = new RecipesFilter(filteredRecipes);
            recipesFilter.displayRecipes(filteredRecipes);
        } else {
            const recipesCardTemplate = new RecipeCardTemplate();
            recipesCardTemplate.createNoRecipesFound();
            this.$gallery.appendChild(recipesCardTemplate.createNoRecipesFound());
        }
    }

    init() {
        this.searchRegex();
    }
}