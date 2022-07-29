class TagsModel {
    constructor(data) {
        this._ingredients = data[0].ingredients;
        this._ustensils = data[0].ustensils;
        this._appliance = data[0].appliances;
    }

    getIngredients() {
        const ingredients = [];
        this._ingredients.forEach(element => {
            let recipeIngredients = element.ingredients;
            if (typeof recipeIngredients === 'object') {
                recipeIngredients.forEach(ingredient => {
                    ingredients.push(ingredient);
                });
            } else {
                ingredients.push(recipeIngredients);
            };
        });
        let uniqueIngredientsList = [...new Set(ingredients)];
        return uniqueIngredientsList.sort();
    }

    getUstensils() {
        const ustensils = [];
        this._ustensils.forEach(element => {
            let recipeUstensils = element.ustensils;
            if (typeof recipeUstensils === 'object') {
                recipeUstensils.forEach(ustensil => {
                    ustensils.push(ustensil);
                });
            } else {
                ustensils.push(recipeUstensils);
            };
        });
        let uniqueUstensilsList = [...new Set(ustensils)];
        return uniqueUstensilsList.sort();
    }

    getAppliance() {
        const appliances = [];
        this._appliance.forEach(element => {
            let recipeAppliances = element.appliance;
            if (typeof recipeAppliances === 'object') {
                recipeAppliances.forEach(apliance => {
                    appliances.push(apliance);
                });
            } else {
                appliances.push(recipeAppliances);
            }
        });
        let uniqueAppliancesList = [...new Set(appliances)];
        return uniqueAppliancesList.sort();
    }
}