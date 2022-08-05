class TagsModel {
    constructor(data) {
        this._ingredients = data[0].ingredients;
        this._ustensils = data[0].ustensils;
        this._appliance = data[0].appliances;
    }

    // Returns an Array of Tags Based on the "data" and "tagFilter" parameters
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

    // Formats the String to Capitalize the First Letter
    capitalizeWord(arr) {
        return arr.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
    }    
}