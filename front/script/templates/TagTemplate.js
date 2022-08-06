class TagTemplate {
    constructor(tag) {
        this._tag = tag;
    }

    createTagDiv() {
        if (document.querySelector('.selected_tags') === null) {
            let selectedTagList = document.createElement('div');
            selectedTagList.classList.add('selected_tags');
            let parent = document.querySelector("#filters");
            parent.parentNode.insertBefore(selectedTagList, parent);
        }
    }

    createTagSpan() {
        document.querySelectorAll('.selected_tags').forEach(element => {
            if (!element.innerHTML.includes(this._tag.name)) {
                let newTag = document.createElement('span');
                newTag.classList.add(`tag_${this._tag.family}`);
                newTag.classList.add('selected_tag');
                newTag.innerHTML = `${this._tag.name}<i class="${this._tag.family} ${this._tag.name} fa-solid fa-circle-xmark"></i>
                `;
                let selectedTagList = document.querySelector(".selected_tags");
                selectedTagList.appendChild(newTag);
            } else {
                // throw new Error('The tag is already selected');
            }
        });
    }
    
    createNewTagsList(array, filters, value) {
        this.$ingredientsUlWrapper = document.querySelector('.'+filters);
        this.$ingredientsUlWrapper.innerHTML = array.map(element => `<li class="${value}">${element}</li>`).join('');
    }

    createNoTagsFound() {
        const noTagsFound = document.createElement('span');
        noTagsFound.classList.add('no_tags_found');
        noTagsFound.innerHTML = `
            <p>Aucun(s) filtre(s) pour cette recherche...</p>
        `;
        return noTagsFound;
    }
    
    init() {
        this.createTagDiv();
        this.createTagSpan();
    }
}