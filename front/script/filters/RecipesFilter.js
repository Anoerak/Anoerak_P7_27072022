class RecipesFilter {
    constructor(recipes) {
        this._recipes = recipes;
        this.$recipeGalleryWrapper = document.querySelector('#recipes_gallery');
    }
    
    displayRecipes(recipes) {
        recipes.forEach(element => {
            const newRecipeCard = new RecipeCardTemplate(element);
            newRecipeCard.createRecipeCard();
            this.$recipeGalleryWrapper.appendChild(newRecipeCard.createRecipeCard());
        });
    }

    loadAllRecipes(recipes) {
        this.displayRecipes(recipes);

        // Initiate the Searchbar Filter
            const newSearchbarFilter = new SearchbarFilter(recipes, this._recipes);
            newSearchbarFilter.init();

        // Initiate the Tags Filter
            const newTagsFilter = new TagsFilter(this._recipes);
            newTagsFilter.init(recipes);
    }

    loadFilteredRecipesByTags(recipes, tags) {
        this._filteredRecipes = [];
        // Filter recipes by tags
        recipes.forEach(recipe => {
            tags.forEach(tag => {
                if (tag.family === "ustensil") {
                    if (recipe.ustensils.includes(tag.name)) {
                        this._filteredRecipes.push(recipe);
                    }
                } else if (tag.family === "ingredient") {
                    if (recipe.ingredients.some(ingredient => ingredient.ingredient === tag.name)) {
                        this._filteredRecipes.push(recipe);
                    }
                } else if (tag.family === "appliance") {
                    if (recipe.appliance === tag.name) {
                        this._filteredRecipes.push(recipe);
                    }
                }
            });
        });

        this.$recipeGalleryWrapper.innerHTML = '';

        // Refresh the Tags Lists
            const newTagsFilter = new TagsFilter(this._recipes);
            newTagsFilter.refreshTagsLists(this._filteredRecipes, tags);

        this.loadAllRecipes(this._filteredRecipes);
    }


    loadFilteredRecipesByTags2(recipes, tags) {
        this._filteredRecipes = [];
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

            this.$recipeGalleryWrapper.innerHTML = '';

            let filteredRecipesNoDuplicates = [...new Set(this._filteredRecipes)];
    
            this.displayRecipes(filteredRecipesNoDuplicates);
    
            // Initiate the Searchbar Filter
                const newSearchbarFilter = new SearchbarFilter(filteredRecipesNoDuplicates, this._recipes);
                newSearchbarFilter.init();
    
            // Refresh the Tags Lists
                const newTagsFilter = new TagsFilter(this._recipes);
                newTagsFilter.refreshTagsLists(filteredRecipesNoDuplicates, tags);
                newTagsFilter.init(filteredRecipesNoDuplicates);
    }
}