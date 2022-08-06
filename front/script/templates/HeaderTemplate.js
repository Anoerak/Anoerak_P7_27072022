class Header {
    constructor(datas) {
        this._datas = datas;
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
                <input id="searchbar_input" type="text" placeholder="Rechercher une recette">
            </div>
            <div id="filters">
                <div id="ingredients" class="tagList_container">
                    <div class="input_field">
                        <input class="input_area" id="ingredients_input" type="text" placeholder="Ingrédients"><i class="fa-solid fa-chevron-down input_ingredients_down"></i><i class="fa-solid fa-chevron-up hidden"></i>
                    </div>
                    <ul class="ingredients ul_taglist">
                        ${this.createTags(this._ingredients, 'ingredients').innerHTML}
                    </ul>    
                </div>
                <div id="appliances" class="tagList_container">
                    <div class="input_field">
                        <input class="input_area" id="appliances_input" type="text" placeholder="Appareils"><i class="fa-solid fa-chevron-down input_appliances_down"></i><i class="fa-solid fa-chevron-up hidden"></i>
                    </div>
                    <ul class="appliances ul_taglist">
                        ${this.createTags(this._appliance, 'appliance').innerHTML}
                    </ul>    
                </div>
                <div id="ustensils" class="tagList_container">
                    <div class="input_field">
                        <input class="input_area" id="ustensils_input" type="text" placeholder="Ustensils"><i class="fa-solid fa-chevron-down input_ustensils_down"></i><i class="fa-solid fa-chevron-up hidden"></i>
                    </div>
                    <ul class="ustensils ul_taglist">
                        ${this.createTags(this._ustensils, 'ustensils').innerHTML}
                    </ul>    
                </div>
            </div>
        `;
    }

    // Creates "li" for the Tags
    createTags(data, key) {
        const newTagsModel = new TagsModel(this._datas);
        const tags = newTagsModel.getTags(data, key);
        this.$tagsWrapper = document.createElement('ul');
        tags.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${element}
            `;
            if (key === 'ingredients') {
                li.classList.add('ingredient')
            } else if (key === 'appliance') {
                li.classList.add('appliance')
            } else if (key === 'ustensils') {
                li.classList.add('ustensil')
            };
            this.$tagsWrapper.appendChild(li);
        });
        return this.$tagsWrapper;
    }

    // Initializes the Header and the Searchbar in the DOM
    init() {
        this.displayHeader();
        this.displaySearchbar();
    }
}