class SearchbarFilter {
    constructor(data) {
        this.$gallery = document.querySelector('#recipes_gallery');
        this.$searchbar = document.querySelector('#searchbar_input');
        this.$searchbar.addEventListener('input', this.searchRegex.bind(this));
    }

    searchRegex() {
        const searchValue = this.$searchbar.value;
        console.log(searchValue);
    }


    init() {
        this.searchRegex();
    }
}