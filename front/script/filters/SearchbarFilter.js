class SearchbarFilter {
    constructor() {
        this.$searchbar = document.querySelector('#searchbar_input');
        this.$searchbar.addEventListener('input', this.search.bind(this));
    }

    search() {
        const searchValue = this.$searchbar.value;
        console.log(searchValue);
    }

    init() {

    }
}