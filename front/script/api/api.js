
class Api {
    constructor(url) {
        this._url = url;
        this._recipes = [];
        this._ingredients = [];
        this._appliances = [];
        this._ustensils = [];
    }

    getDatas() {
        const datas = (
            fetch(this._url)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.recipes.length; i++) {
                        let ingredients = [];
                        let ingredient = data.recipes[i].ingredients;
                        for (let j = 0; j < ingredient.length; j++) {
                            ingredients.push(ingredient[j].ingredient);
                        }
                        this._recipes.push(data.recipes[i]);
                        this._ingredients.push({
                            id: data.recipes[i].id,
                            ingredients: ingredients
                        });
                        this._appliances.push({
                            id: data.recipes[i].id,
                            appliance: data.recipes[i].appliance
                        });
                        this._ustensils.push({
                            id: data.recipes[i].id,
                            ustensils: data.recipes[i].ustensils
                        });
                    }
                    return [
                        {
                            recettes: this._recipes, 
                            ingredients: this._ingredients, 
                            appliances: this._appliances, 
                            ustensils: this._ustensils
                        }
                    ]
                })
                .catch(error => console.error(error))
        );
        return datas;
    }
}