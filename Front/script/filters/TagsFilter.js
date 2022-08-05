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

    init(data, tags) {
        this._recipes = data;
        this._selectedTagsArray = [];
        if (tags !== undefined) {
            this._selectedTagsArray = tags;
        };
        this.eventOnTagInput();
    }
}