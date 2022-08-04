
class Api {
    constructor(url) {
        this._url = url;
        this._datas = [{
            recettes: [],
            ingredients: [],
            appliances: [],
            ustensils: []    
        }];
    }

    // Returns Multiples Arrays (Recipes, Ingredients, Appliances, Ustensils) Based on the "url" Parameter
    getDatas() {
        const datas = (
            fetch(this._url)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.recipes.length; i++) {
                        this._datas[0].recettes.push(data.recipes[i]);
                        let ingredients = [];
                        let ingredient = data.recipes[i].ingredients;
                        for (let j = 0; j < ingredient.length; j++) {
                            ingredients.push(ingredient[j].ingredient);
                        }
                        this._datas[0].ingredients.push({
                            id: data.recipes[i].id,
                            ingredients: ingredients
                        });
                        this._datas[0].appliances.push({
                            id: data.recipes[i].id,
                            appliance: data.recipes[i].appliance
                        });
                        this._datas[0].ustensils.push({
                            id: data.recipes[i].id,
                            ustensils: data.recipes[i].ustensils
                        });
                    }
                    return this._datas
                })
                .catch(error => console.error(error))
        );
        return datas;
    }
}