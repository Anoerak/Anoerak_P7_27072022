class Index {
    constructor() {
        this.recipesApi = new Api('./data/recipes.json');
        this.$recipeGalleryWrapper = document.createElement('section');
        this.$recipeGalleryWrapper.id = 'recipes_gallery';
        this.$mainWrapper = document.querySelector('main');
        this.$mainWrapper.appendChild(this.$recipeGalleryWrapper);
    }

    // Gets the Recipes from the API
    async getRecipes() {
        const apiResult = this.recipesApi.getDatas();
        return apiResult;
    }

    // Displays the Datas on the DOM
    async displayDatas(datas) {
        // Displays the Skeleton and Header of the Application
            const newHeader = new Header(datas);
            newHeader.init();

        // Displays the List of Tags when Click on the Input/Hide the List when Clicking anywhere else
            const displayTagsList = new TagsListFunctions();
            displayTagsList.displayList();

        // Displays All the Recipes
            const newRecipesFilter = new RecipesFilter(datas[0].recettes);
            newRecipesFilter.loadRecipes(datas[0].recettes);
    }

    // Initializes the Application
    async init() {
        const myDatas = await this.getRecipes();

        this.displayDatas(myDatas);
    }
}

const index = new Index();
index.init();