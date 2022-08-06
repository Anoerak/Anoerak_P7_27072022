class TagsFilter {
    constructor() {
        this.$tagsInputList = document.querySelectorAll('.input_area');
        this.$tagsList = document.querySelectorAll('li');
        this.$selectedTagsList = document.querySelectorAll('.fa-circle-xmark');

        this.$tagsList.forEach(element => {
            element.addEventListener('click', this.handleClick.bind(this));
        });
        this.$selectedTagsList.forEach(element => {
            element.addEventListener('click', this.removeTag.bind(this));
        });
    }

    handleClick(tag) {
        if (tag !== undefined) {
            console.log(tag);
            // Stores the Tag Family and Name into an array
            this._selectedTagsArray.push(this.collectAndStoredTagDatas(tag));

            // Displays the Selected Tag from the _selectedTagArray into the Tag Div
            let displaySelectedTag = new TagTemplate(this.collectAndStoredTagDatas(tag));
            displaySelectedTag.init();

            // Display the Recipes based on the selected Tags
            let recipesFilter = new RecipesFilter(this._recipes);
            recipesFilter.loadFilteredRecipesByTags(this._recipes, this._selectedTagsArray);

            // Initialize the Searchbar Filter
            let searchbarFilter = new SearchbarFilter(this._recipes);
            searchbarFilter.init();
        }
    }


    removeTag(data) {
        data.target.parentNode.remove();
        let tagsDatasArray = [];
        document.querySelectorAll('.selected_tag').forEach(element => {
            let tagDatas = {
                family: element.firstElementChild.classList[0],
                name: element.firstElementChild.classList[1]
            }
            tagsDatasArray.push(tagDatas);
        });
        if (data.length > 0) {
            console.log(data);
        } else {
            console.log('No Tags Selected');
        }
    }




    
    // Collect Tag's Infos (Family, Name) and return it
    collectAndStoredTagDatas(data) {
        if (data.target.classList.contains('ingredient') || data.target.classList.contains('ustensil') || data.target.classList.contains('appliance')) {
            const tagDatas = {
                name: data.target.innerText,
                family: data.target.className
            };
            return tagDatas;
        } else {
            throw new Error('The tag is not an ingredient, appliance or ustensil');
        }
    }

    // Hide irrelevant Tags when the user types in the input
    eventOnTagInput() {
        this.$tagsInputList.forEach(element => {
            element.addEventListener('input', function (event) {
                let tagInput = event.target.value;
                document
                    .querySelector(`.${event.target.parentNode.nextElementSibling.className}`)
                    .querySelectorAll('li')
                    .forEach(element => {
                        if (element.innerText.toLowerCase().includes(tagInput.toLowerCase())) {
                            element.classList.remove('hidden');
                        } else {
                            element.classList.add('hidden');
                        }
                    }
                );
            });
        });
    }

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
                let datasAppliances = [...new Set(datas[0].appliances)];
                let datasUstensils = [...new Set(datas[0].ustensils)];
                let datasIngredients = [...new Set(datas[0].ingredients)];
                this.createNewTagsList(applianceTemp, datas[0].appliances, filters);
                newTagTemplate.displayNewTagsList(datasIngredients, 'ingredients', 'ingredient');
                this.createNewTagsList(ustensilsTemp, datas[0].ustensils, filters);
                newTagTemplate.displayNewTagsList(datasAppliances, 'appliances', 'appliance');
                this.createNewTagsList(ingredientsTemp, datas[0].ingredients, filters);
                newTagTemplate.displayNewTagsList(datasUstensils, 'ustensils', 'ustensil');
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
            if (filters.length > 0) {
                filters.forEach(filter => {
                    if (filter.name === item) {
                        resultsArray.splice(resultsArray.indexOf(filter.name), 1);
                    }
                });
            }
        });
    }

    init(data, tags) {
        this._recipes = data;
        this._selectedTagsArray = [];
        if (tags !== undefined) {
            this._selectedTagsArray = tags;
        };
        this.eventOnTagInput();
    }
}