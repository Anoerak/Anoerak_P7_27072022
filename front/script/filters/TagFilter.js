class TagFilter {
    constructor() {
        this.$ingredientInputWrapper = document.getElementById('ingredient_input');
        this.$applianceInputWrapper = document.getElementById('appliance_input');
        this.$ustensilInputWrapper = document.getElementById('ustensils_input');
    }

    tagObserver(input, ulClass) {
        input.addEventListener('input', () => {
            let tag = input.value;
            let tagList = document.querySelector(`.${ulClass}`);
            let tagListItems = tagList.querySelectorAll('li');
            for (let i = 0; i < tagListItems.length; i++) {
                if (tagListItems[i].innerHTML.toLowerCase().includes(tag.toLowerCase())) {
                    tagListItems[i].style.display = 'block';
                } else {
                    tagListItems[i].style.display = 'none';
                }
            }
        });
    }

    ingredientTagObserver() {
        this.tagObserver(this.$ingredientInputWrapper, 'ingredient');
    }

    appliancesTagObserver() {
        this.tagObserver(this.$applianceInputWrapper, 'appliance');
    }

    ustensilsTagObserver() {
        this.tagObserver(this.$ustensilInputWrapper, 'ustensil');
    }

    
    /// Previous Version => to Delete

    // ingredientTagObserver() {
    //     this.$ingredientInputWrapper.addEventListener('input', function() {
    //         let ingredient = this.value;
    //         let ingredientList = document.querySelector('.ingredient');
    //         let ingredientListItems = ingredientList.getElementsByTagName('li');
    //         for (let i = 0; i < ingredientListItems.length; i++) {
    //             if (ingredientListItems[i].innerHTML.toLowerCase().includes(ingredient.toLowerCase())) {
    //                 ingredientListItems[i].style.display = 'block';
    //             } else {
    //                 ingredientListItems[i].style.display = 'none';
    //             }
    //         }
    //     });
    // }

    // appliancesTagObserver() {
    //     this.$applianceInputWrapper.addEventListener('input', function() {
    //         let appliance = this.value;
    //         let applianceList = document.querySelector('.appliance');
    //         let applianceListItems = applianceList.getElementsByTagName('li');
    //         for (let i = 0; i < applianceListItems.length; i++) {
    //             if (applianceListItems[i].innerHTML.toLowerCase().includes(appliance.toLowerCase())) {
    //                 applianceListItems[i].style.display = 'block';
    //             } else {
    //                 applianceListItems[i].style.display = 'none';
    //             }
    //         }
    //     });
    // }

    // ustensilsTagObserver() {
    //     this.$ustensilInputWrapper.addEventListener('input', function() {
    //         console.log(this.value);
    //         let ustensil = this.value;
    //         let ustensilList = document.querySelector('.ustensil');
    //         let ustensilListItems = ustensilList.getElementsByTagName('li');
    //         for (let i = 0; i < ustensilListItems.length; i++) {
    //             if (ustensilListItems[i].innerHTML.toLowerCase().includes(ustensil.toLowerCase())) {
    //                 ustensilListItems[i].style.display = 'block';
    //             } else {
    //                 ustensilListItems[i].style.display = 'none';
    //             }
    //         }
    //     });
    // }
              
    init() {
        this.ingredientTagObserver();
        this.appliancesTagObserver();
        this.ustensilsTagObserver();
    }
}
