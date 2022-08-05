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
        this.inputRegex.test(searchValue) ? this.searchFunction(this._recipes) : this.searchReset();
    }

    searchReset() {
        this.$gallery.innerHTML = '';
        const recipesFilter = new RecipesFilter();
        recipesFilter.displayRecipes(this._recipes);
        recipesFilter.refreshTagsLists(this._recipes, []);
    }

    searchFunction(recipes) {
        const searchValue = this.$searchbar.value.toLowerCase();
        let filteredRecipesPull = [];

        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name.toLowerCase().includes(searchValue)) {
                filteredRecipesPull.push(recipes[i]);
            } else if (recipes[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue))) {
                filteredRecipesPull.push(recipes[i]);
            } else if (recipes[i].description.toLowerCase().includes(searchValue)) {
                filteredRecipesPull.push(recipes[i]);
            }
        }

        const filteredRecipes = [...new Set(filteredRecipesPull)];
        
        this.$gallery.innerHTML = '';
        if (filteredRecipes.length > 0) {
            const recipesFilter = new RecipesFilter(filteredRecipes);
            recipesFilter.displayRecipes(filteredRecipes);
            recipesFilter.refreshTagsLists(filteredRecipes, []);
            const newTagsFilter = new TagsFilter();
            newTagsFilter.init(filteredRecipes);
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