class TagsListFunctions {
    constructor() {
    }

    displayList() {
        document.querySelectorAll('.input_area').forEach(element => {
            element.addEventListener('click', () => {
                if (!element.nextElementSibling.classList.contains('hidden')) {
                    document.querySelectorAll('.ul_taglist').forEach(element => {
                        element.style.display = 'none';
                        element.parentNode.style.width = 'auto';
                        element.previousElementSibling.lastElementChild.classList.add('hidden');
                        element.previousElementSibling.querySelectorAll('.fa-chevron-down').forEach(element => {
                            element.classList.remove('hidden');
                        });
                    });
                    element.nextElementSibling.classList.add('hidden');
                    element.parentNode.lastElementChild.classList.remove('hidden');
                    element.parentNode.nextElementSibling.style.display = 'block';
                    element.parentNode.parentNode.style.width = '100%';
                }
            });
        });
        document.addEventListener('click', (event) => {
            if (!event.target.classList.contains('input_area') && !event.target.classList.contains('ingredients') && !event.target.classList.contains('ingredient') && !event.target.classList.contains('ustensil') && !event.target.classList.contains('ustensils') && 
            !event.target.classList.contains('appliance') && !event.target.classList.contains('appliances')) {
                document.querySelectorAll('.fa-chevron-up').forEach(element => {
                    element.classList.add('hidden');
                });
                document.querySelectorAll('.fa-chevron-down').forEach(element => {
                    element.classList.remove('hidden');
                });
                document.querySelector('.ingredients').style.display = 'none';
                document.querySelector('#ingredients').style.width = 'auto';
                document.querySelector('.appliances').style.display = 'none';
                document.querySelector('#appliances').style.width = 'auto';
                document.querySelector('.ustensils').style.display = 'none';
                document.querySelector('#ustensils').style.width = 'auto';
            }
        });
    }
}

