class SearchbarFilter {
    constructor(data, allDatas) {
        this.$gallery = document.querySelector('#recipes_gallery');
        this.$searchbar = document.querySelector('#searchbar_input');
        this.$searchbar.addEventListener('input', this.searchRegex.bind(this));
        this._recipes = data;
        this._allDatas = allDatas;

        this.inputRegex = /^[a-zA-Z éèêëàäâïîöôùüûœøæêÀÄÂÉÈËÊÏÎÔÖÙÛÜ'()-]{3,}$/;
    }

    searchRegex() {
        const searchValue = this.$searchbar.value;
        this.inputRegex.test(searchValue) ? this.searchFunction(this._recipes, searchValue) : this.searchReset(searchValue);
    }

    searchReset(searchValue) {
        if (searchValue.length < 1) {
            this.$gallery.innerHTML = '';

            const recipesFilter = new RecipesFilter(this._allDatas);
            recipesFilter.displayRecipes(this._recipes);

            const newTagsFilter = new TagsFilter(this._allDatas);
            newTagsFilter.refreshTagsLists(this._allDatas);
            newTagsFilter.init();
        } else if (1 <= searchValue.length < 3) {
            this.$gallery.innerHTML = '';
            const recipesCardTemplate = new RecipeCardTemplate();
            recipesCardTemplate.createMinimumSearchLength();

            const newTagsFilter = new TagsFilter(this._allDatas);
            newTagsFilter.refreshTagsLists([]);

            this.$gallery.appendChild(recipesCardTemplate.createMinimumSearchLength());
        }
    }

    searchFunction(recipes, searchValue) {
        let filteredRecipes = [];
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].name.toLowerCase().includes(searchValue) || 
                recipes[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchValue)) || 
                recipes[i].description.toLowerCase().includes(searchValue)) {
                    filteredRecipes.push(recipes[i]) 
            }
        }
        
        if (filteredRecipes.length > 0) {
            const recipesFilter = new RecipesFilter(this._allDatas);
            recipesFilter.displayRecipes(filteredRecipes);

            const newTagsFilter = new TagsFilter(this._allDatas);
            newTagsFilter.refreshTagsLists(filteredRecipes);
            newTagsFilter.init();
        } else {
            this.$gallery.innerHTML = '';
            const recipesCardTemplate = new RecipeCardTemplate();
            recipesCardTemplate.createNoRecipesFound();

            const newTagsFilter = new TagsFilter();
            newTagsFilter.refreshTagsLists(filteredRecipes);
            
            this.$gallery.appendChild(recipesCardTemplate.createNoRecipesFound());
        }
    }

    init() {
        this.searchRegex();
    }
}