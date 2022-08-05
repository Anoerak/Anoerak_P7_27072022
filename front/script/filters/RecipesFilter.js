class RecipesFilter {
    constructor(recipes) {
        this._recipes = recipes;
        this._filteredRecipes = [];
        this._filteredRecipesTag = [];
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
            // const newTagsFilter = new TagsFilter();
            // newTagsFilter.init(this._recipes);
    }

    loadFilteredRecipesByTags(recipes, tags) {
        // Create an Array with all the Recipes' Tags based on recipes parameter
            let RecipesTagsMix = recipes.map(recipe => { return {id: recipe.id, tags: `${recipe.appliance},${recipe.ustensils},${recipe.ingredients.map(ingredient => ingredient.ingredient)}`}});
            let recipesTags = RecipesTagsMix.map(recipe => { return {id: recipe.id, tags: recipe.tags.toLowerCase()}});
        // Look for a match between the selected Tags and the Recipes' Tags based on their IDs
            if (tags.length > 0) {
                let selectedTag = [];
                selectedTag.push(tags[tags.length -1]);
                this.filterRecipesByTags(recipes, recipesTags, selectedTag);
            } else {
                this.filterRecipesByTags(recipes, recipesTags, tags);
            }
        // Refresh the Tags' Lists
            this.refreshTagsLists(this._filteredRecipes[0], tags);
        // Reinitialize the Tag Filter with the new Recipes
            const newTagsFilter = new TagsFilter();
            newTagsFilter.init(this._filteredRecipes[0], this._filteredRecipesTag[0], this._recipes);
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

    refreshTagsLists(array, filters) {
        let filteredRecipesTag = array.map(recipe => { return {id: recipe.id, appliances: recipe.appliance, ustensils: recipe.ustensils, ingredients: recipe.ingredients.map(ingredient => ingredient.ingredient)}});
        let datas = [{
            ingredients: [],
            appliances: [],
            ustensils: []
        }];
        if (filteredRecipesTag.length > 1) {
            filteredRecipesTag.forEach(recipe => {
                let applianceTemp = recipe.appliances.split(',');
                let ustensilsTemp = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
                let ingredientsTemp = recipe.ingredients.map(ingredient => ingredient);
                const newTagTemplate = new TagTemplate();
                this.createNewTagsList(applianceTemp, datas[0].appliances, filters);
                newTagTemplate.displayNewTagsList(datas[0].ingredients, 'ingredients', 'ingredient');
                this.createNewTagsList(ustensilsTemp, datas[0].ustensils, filters);
                newTagTemplate.displayNewTagsList(datas[0].appliances, 'appliances', 'appliance');
                this.createNewTagsList(ingredientsTemp, datas[0].ingredients, filters);
                newTagTemplate.displayNewTagsList(datas[0].ustensils, 'ustensils', 'ustensil');
            });    
        } else {
            document.querySelector('.ingredients').innerHTML = '';
            document.querySelector('.appliances').innerHTML = '';
            document.querySelector('.ustensils').innerHTML = '';
        }
    }

    createNewTagsList(originalArray, resultsArray, filters) {
        originalArray.forEach(item => {
            if (!resultsArray.includes(item.toLowerCase())) {
                resultsArray.push(item);
                resultsArray.sort();
            }
            filters.forEach(filter => {
                if (filter.name === item) {
                    resultsArray.splice(resultsArray.indexOf(filter.name), 1);
                }
            });
        });
    }
}