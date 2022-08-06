class TagsFilter {
    constructor(data) {
        this._allRecipes = data;
        this.$tagsInputList = document.querySelectorAll('.input_area');
    }

    handleClick(recipes, tags) {
        this.$tagsList = document.querySelectorAll('li');
        this.$tagsList.forEach(element => {
            element.addEventListener('click', () => {
                if (tags !== undefined) {
                    // Stores the Tag Family and Name into an array
                    tags.push(this.collectAndStoredTagDatas(element));
        
                    // Displays the Selected Tag from the _selectedTagArray into the Tag Div
                    let displaySelectedTag = new TagTemplate(this.collectAndStoredTagDatas(element));
                    displaySelectedTag.init();
        
                    // Display the Recipes based on the selected Tags
                    let recipesFilter = new RecipesFilter(this._allRecipes);
                    recipesFilter.loadFilteredRecipesByTags(recipes, tags);        
                }            
            });
        });
    }

    removeTag() {
        let activeTags = [];
        document.querySelectorAll('.fa-circle-xmark').forEach(element => {
            activeTags.push(this.collectAndStoredTagDatas(element));
        });
        document.querySelectorAll('.fa-circle-xmark').forEach(element => {
            element.addEventListener('click', () => {
                element.parentNode.remove();
                let tagToRemove = this.collectAndStoredTagDatas(element);
                activeTags.forEach(tag => {
                    if (tag.name === tagToRemove.name) {
                        activeTags.splice(activeTags.indexOf(tag), 1);
                    }
                });
                let recipesFilter = new RecipesFilter(this._allRecipes);
                recipesFilter.loadFilteredRecipesByTags2(this._allRecipes, activeTags);
            });
        });
    }
    
    collectAndStoredTagDatas(data) {
        if (data.classList.contains('ingredient') || data.classList.contains('ustensil') || data.classList.contains('appliance')) {
            if (data.tagName === 'I') {
                const tagDatas = {
                    name: data.classList[1],
                    family: data.classList[0]
                }
                return tagDatas;
            } else if (data.tagName == 'LI') {
                const tagDatas = {
                    name: data.innerText,
                    family: data.className
                };
                return tagDatas;    
            } else {
                throw new Error('The tag is not an ingredient, appliance or ustensil');
            }
        }
    }

    eventOnTagInput() {
        this.$tagsInputList.forEach(element => {
            element.addEventListener('input', function (event) {
                let tagInput = event.target.value;
                document
                    .querySelector(`.${event.target.parentNode.nextElementSibling.classList[0]}`)
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

                let datasAppliances = [...new Set(datas[0].appliances)];
                let datasUstensils = [...new Set(datas[0].ustensils)];
                let datasIngredients = [...new Set(datas[0].ingredients)];

                const displayTagTemplate = new TagTemplate();

                document.querySelector('.ingredients').style.columnCount = '3';
                this.createNewTagsList(ingredientsTemp, datas[0].ingredients, filters);
                displayTagTemplate.createNewTagsList(datasIngredients, 'ingredients', 'ingredient');

                document.querySelector('.ustensils').style.columnCount = '3';
                this.createNewTagsList(ustensilsTemp, datas[0].ustensils, filters);
                displayTagTemplate.createNewTagsList(datasUstensils, 'ustensils', 'ustensil');

                document.querySelector('.appliances').style.columnCount = '3';
                this.createNewTagsList(applianceTemp, datas[0].appliances, filters);
                displayTagTemplate.createNewTagsList(datasAppliances, 'appliances', 'appliance');

            });    
        } else {
            this.displayNoTagFound('ingredients');
            this.displayNoTagFound('ustensils');
            this.displayNoTagFound('appliances');
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

    displayNoTagFound(family) {
        const displayNoTagsFound = new TagTemplate();
        document.querySelector(`.${family}`).style.columnCount = '1';
        document.querySelector(`.${family}`).innerHTML = '';
        document.querySelector(`.${family}`).appendChild(displayNoTagsFound.createNoTagsFound());
    }

    init(data) {
        this._recipes = data;
        this._selectedTagsArray = [];
        this.handleClick(this._recipes, this._selectedTagsArray);
        this.eventOnTagInput();
        this.removeTag();
    }
}