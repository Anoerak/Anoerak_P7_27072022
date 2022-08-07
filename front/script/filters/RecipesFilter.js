class RecipesFilter {
    constructor(recipes) {
        this._recipes = recipes;
        this.$recipeGalleryWrapper = document.querySelector('#recipes_gallery');
    }
    
    displayRecipes(recipes) {
        this.$recipeGalleryWrapper.innerHTML = '';
        recipes.forEach(element => {
            const newRecipeCard = new RecipeCardTemplate(element);
            newRecipeCard.createRecipeCard();
            this.$recipeGalleryWrapper.appendChild(newRecipeCard.createRecipeCard());
        });
    }

    loadRecipes(recipes) {
        this.displayRecipes(recipes);

        // Initiate the Searchbar Filter
            const newSearchbarFilter = new SearchbarFilter(recipes, this._recipes);
            newSearchbarFilter.init();

        // Initiate the Tags Filter
            const newTagsFilter = new TagsFilter(this._recipes);
            newTagsFilter.refreshTagsLists(recipes);
            newTagsFilter.init();
    }

    loadFilteredRecipesByTags(recipes, tags) {
        this._filteredRecipes = [];
        if (tags.length === 0) {
            this.loadRecipes(this._recipes);
        } else {
            this._filteredRecipes = recipes.filter(recipe => {
                return tags.every(tag => {
                    if (tag.family === "ustensil") {
                        return recipe.ustensils.includes(tag.name);
                    } else if (tag.family === "ingredient") {
                        return recipe.ingredients.some(ingredient => ingredient.ingredient === tag.name);
                    } else if (tag.family === "appliance") {
                        return recipe.appliance === tag.name;
                    }
                });
            });

            let filteredRecipesNoDuplicates = [...new Set(this._filteredRecipes)];
    
            this.loadRecipes(filteredRecipesNoDuplicates);
        }
    }
}