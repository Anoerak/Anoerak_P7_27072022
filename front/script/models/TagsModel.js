class TagsModel {
    constructor(data) {
        this._ingredients = data[0].ingredients;
        this._ustensils = data[0].ustensils;
        this._appliance = data[0].appliances;
    }

    getTags(data, tagFilter) {
        let filter = [];
        data.forEach(element => {
            let recipeTags = element[tagFilter];
            if (typeof recipeTags === 'object') {
                recipeTags.forEach(tag => {
                    filter.push(tag);
                });
            } else {
                filter.push(recipeTags);
            }
        });
        let uniqueTagsList = [...new Set(this.capitalizeWord(filter))];
        return uniqueTagsList.sort();
    }

    // getIngredients() {
    //     const ingredients = [];
    //     this._ingredients.forEach(element => {
    //         let recipeIngredients = element.ingredients;
    //         if (typeof recipeIngredients === 'object') {
    //             recipeIngredients.forEach(ingredient => {
    //                 ingredients.push(ingredient);
    //             });
    //         } else {
    //             ingredients.push(recipeIngredients);
    //         };
    //     });
    //     let uniqueIngredientsList = [...new Set(this.capitalizeWord(ingredients))];
    //     return uniqueIngredientsList.sort();
    // }

    // getUstensils() {
    //     const ustensils = [];
    //     this._ustensils.forEach(element => {
    //         let recipeUstensils = element.ustensils;
    //         if (typeof recipeUstensils === 'object') {
    //             recipeUstensils.forEach(ustensil => {
    //                 ustensils.push(ustensil);
    //             });
    //         } else {
    //             ustensils.push(recipeUstensils);
    //         };
    //     });
    //     let uniqueUstensilsList = [...new Set(this.capitalizeWord(ustensils))];
    //     return uniqueUstensilsList.sort();
    // }

    // getAppliance() {
    //     const appliances = [];
    //     this._appliance.forEach(element => {
    //         let recipeAppliances = element.appliance;
    //         if (typeof recipeAppliances === 'object') {
    //             recipeAppliances.forEach(apliance => {
    //                 appliances.push(apliance);
    //             });
    //         } else {
    //             appliances.push(recipeAppliances);
    //         }
    //     });
    //     let uniqueAppliancesList = [...new Set(this.capitalizeWord(appliances))];
    //     return uniqueAppliancesList.sort();
    // }

    capitalizeWord(arr) {
        return arr.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
    }
}