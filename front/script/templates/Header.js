class Header {
    constructor(datas) {
        this._datas = datas;
        console.log(this._datas);
        this._ingredients = datas[0].ingredients;
        this._ustensils = datas[0].ustensils;
        this._appliance = datas[0].appliances;

        this.$headerWrapper= document.querySelector('header');
    }
    
    // Displays the Header
    displayHeader() {
        this.$headerWrapper.innerHTML = `
            <div id="banner">
                <img src="./assets/images/les_petits_plats.webp" alt="Logo les petits plats en forme de toque de chef cuisinier">
                <h1>Les petits plats</h1>
            </div>
            <nav></nav>
        `;
    }

    // Displays the Searchbar & the Tags
    displaySearchbar() {
        this.$navWrapper = document.querySelector('nav');
        this.$navWrapper.innerHTML = `
            <div id="searchbar">
                <input type="text" placeholder="Rechercher une recette">
                <button><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div id="filters">
                <div id="ingredients">
                    <div class="input_field">
                        <input id="ingredient_input"type="text" placeholder="Ingrédients"><i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <ul class="ingredient">
                        ${this.createTags(this._ingredients, 'ingredients').innerHTML}
                    </ul>    
                </div>
                <div id="appliances">
                    <div class="input_field">
                        <input id="appliance_input" type="text" placeholder="Appareils"><i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <ul class="appliance">
                        ${this.createTags(this._appliance, 'appliance').innerHTML}
                    </ul>    
                </div>
                <div id="ustensils">
                    <div class="input_field">
                        <input id="ustensils_input" type="text" placeholder="Ustensils"><i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <ul class="ustensil">
                        ${this.createTags(this._ustensils, 'ustensils').innerHTML}
                    </ul>    
                </div>
            </div>
        `;
    }

    // Displays the Tags
    createTags(data, key) {
        const newTagsModel = new TagsModel(this._datas);
        const tags = newTagsModel.getTags(data, key);
        this.$tagsWrapper = document.createElement('ul');
        tags.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${element}
            `;
            this.$tagsWrapper.appendChild(li);
        });
        return this.$tagsWrapper;
    }



    // createIngredientsTags() {
    //     const newIngredientsTagsModel = new TagsModel(this._datas);
    //     const ingredientsTags = newIngredientsTagsModel.getIngredients();
    //     this.$ingredientsTagsWrapper = document.createElement('ul');
    //     ingredientsTags.forEach(element => {
    //         const li = document.createElement('li');
    //         li.innerHTML = `
    //             ${element}
    //         `;
    //         this.$ingredientsTagsWrapper.appendChild(li);
    //     });
    //     return this.$ingredientsTagsWrapper;
    // }

    // createAppliancesTags() {
    //     const newAppliancesTagsModel = new TagsModel(this._datas);
    //     const appliancesTags = newAppliancesTagsModel.getAppliance();
    //     this.$appliancesTagsWrapper = document.createElement('ul');
    //     appliancesTags.forEach(element => {
    //         const li = document.createElement('li');
    //         li.innerHTML = `
    //             ${element}
    //         `;
    //         this.$appliancesTagsWrapper.appendChild(li);
    //     });
    //     return this.$appliancesTagsWrapper;
    // }

    // createUstensilsTags() {
    //     const newUstensilsTagsModel = new TagsModel(this._datas);
    //     const ustensilsTags = newUstensilsTagsModel.getUstensils();
    //     this.$ustensilsTagsWrapper = document.createElement('ul');
    //     ustensilsTags.forEach(element => {
    //         const li = document.createElement('li');
    //         li.innerHTML = `
    //             ${element}
    //         `;
    //         this.$ustensilsTagsWrapper.appendChild(li);
    //     });
    //     return this.$ustensilsTagsWrapper;
    // }

    init() {
        this.displayHeader();
        this.displaySearchbar();
    }
}