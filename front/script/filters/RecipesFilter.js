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

    loadAllRecipes() {
        this.displayRecipes(this._recipes);
        // Initiate the Searchbar Filter
            const newSearchbarFilter = new SearchbarFilter(this._recipes);
            newSearchbarFilter.init();
        // Initiate the Tags Filter
            const newTagsFilter = new TagsFilter();
            newTagsFilter.init(this._recipes);
    }

    loadFilteredRecipesByTags(recipes, tags) {
        console.log("recettes: ", recipes);
        console.log("tags: ", tags);

        this._filteredRecipes = [];

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
                } else if (tag.family === "category") {
                    if (recipe.category === tag.name) {
                        this._filteredRecipes.push(recipe);
                    }
                }
            });
        });

        this.$recipeGalleryWrapper.innerHTML = '';

        // Initiate the Tags Filter
            const newTagsFilter = new TagsFilter();
            newTagsFilter.init(this._filteredRecipes);
            newTagsFilter.refreshTagsLists(this._filteredRecipes, tags);
        
        // Initiate the Searchbar Filter
            const newSearchbarFilter = new SearchbarFilter(this._filteredRecipes);
            newSearchbarFilter.init();

        // Initiate the Tags Filter
            newTagsFilter.init(this._filteredRecipes);
    }

    filterRecipesByTags(recipes, recipesTags, tags) {
        tags.forEach(tag => {
            // Create an Array with all the Recipes' Tags based on recipes parameter
                let filteredRecipesTags = recipesTags.filter(recipe => recipe.tags.includes(tag.name.toLowerCase()));
            // Create an Array with all the Recipes' Id based on filteredRecipesTags parameter
                let filteredRecipesId = filteredRecipesTags.map(recipe => recipe.id);
            // Create an Array with all the Recipes' based on filteredRecipesId parameter
                let filteredRecipes = recipes.filter(recipe => filteredRecipesId.includes(recipe.id));
            // Clean Up the Gallery
                this.$recipeGalleryWrapper.innerHTML = '';
            // Display the Recipes
                this.displayRecipes(filteredRecipes);
                this._filteredRecipes.push(filteredRecipes);
                this._filteredRecipesTag.push(tags);
        });
    };

}