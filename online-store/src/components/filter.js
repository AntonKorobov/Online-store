const filterCategoryWrapper = document.querySelector(".filter-category__wrapper");
createCategoryCheckbox();

const filterLanguageSelect = document.querySelector(".filter-language");
const filterCoverTypeSelect = document.querySelector(".filter-coverType");
const clearFiltersButton = document.querySelector(".clear-filters-button");
const sortSelector = document.querySelector(".sort_selector");
const filtersWrapper = document.querySelector(".filters-wrapper");
const listOfCheckbox = document.querySelectorAll('.filter-category__checkbox-input');
const listOfCheckboxAllInput = document.querySelector('#filter-category__checkbox-input-All');

export const listOfFilters = {
    language: false,
    category: [],
    coverType: false,
    sortType: '',
}

export function filterProducts(arrayOfProducts, listOfFilters) {
    let filteredArray = [...arrayOfProducts];
    
    if (listOfFilters.language) {
        filteredArray = filterByLanguage(filteredArray, listOfFilters.language);
    }
    if (listOfFilters.category.length > 0) {
        filteredArray = filterByCategory(filteredArray, listOfFilters.category);
    }
    if (listOfFilters.coverType) {
        filteredArray = filterByCoverType(filteredArray, listOfFilters.coverType);
    }
    return filteredArray
}

export function setFilters() {
    let listOfFiltersData = JSON.parse(localStorage.getItem("listOfFiltersData")) || null;
    if(listOfFiltersData !== null){
        filterLanguageSelect.value = listOfFiltersData.language;
        filterCoverTypeSelect.value = listOfFiltersData.coverType;
        sortSelector.value = listOfFiltersData.sortType;
        listOfFiltersData.category.forEach(element => {
            listOfCheckbox.forEach(filterName => {
                if(filterName.value === element){
                    filterName.checked = true;
                };
            });
        });
    }
}

export function updateFilters() {
    listOfFilters.language = '';
    listOfFilters.category.length = 0;
    listOfFilters.coverType = '';
    listOfFilters.sortType = '';

    listOfCheckbox.forEach(element => {
        if((element.checked === true)&&(element.value !== "All")) {
            listOfFilters.category.push(element.value);
        }
    });
    
    if (filterLanguageSelect.value !== "") {
        listOfFilters.language = filterLanguageSelect.value;
    }
    if (filterCoverTypeSelect.value !== "") {
        listOfFilters.coverType = filterCoverTypeSelect.value;
    }
    if(listOfFilters.category.length === 0) {
        listOfCheckboxAllInput.checked = true;
    }else{
        listOfCheckboxAllInput.checked = false;
    }

    listOfFilters.sortType = sortSelector.value;

    localStorage.setItem("listOfFiltersData", JSON.stringify(listOfFilters));
}

export function eventClickClearFiltersButton(foo) {
    clearFiltersButton.addEventListener('click', () => {
        filterLanguageSelect.selectedIndex = 0;
        filterCoverTypeSelect.selectedIndex = 0;
    
        listOfCheckbox.forEach(element => {
            element.checked = false;
        })
        foo();
    });
}

export function eventClickFiltersCheckboxInput(foo) {
    filtersWrapper.addEventListener('click', (event) => {
        if(event.target.value === 'All') {
            listOfCheckbox.forEach(element => {
                element.checked = false;
            })
        }
        if(event.target.classList.contains('filter-category__checkbox-input')){
            foo();
        }
    });

    filtersWrapper.addEventListener('change',(event) => {
        if(event.target.classList.contains('select')){
            foo();
        }
    }, true);
}

function filterByLanguage(array, language) {
    return array.filter(element => element['language'] === language)
}

function filterByCategory(array, category) {
    if(category.length === 0) return array;
    return array.filter(element => {
        for (let i = 0; i < category.length; i++) {
            if(element['category'].indexOf(category[i]) !== -1) return true
        }
        return false
    })
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}

function createCategoryCheckbox() {
    const arrayOfCategory = ['All', 'Classics','Science Fiction', 'Literary', 'Psychological', 'Political', 'Action & Adventure', 'Media Tie-In', 'Genetic Engineering'];

    arrayOfCategory.forEach(element => {
        let categoryCheckbox = document.createElement("li");
        categoryCheckbox.classList.add("filter-category__checkbox-wrapper");
        categoryCheckbox.innerHTML = ` 
            <input value="${element}" class="filter-category__checkbox-input" type="checkbox" name="filter" id="filter-category__checkbox-input-${element}">
            <label for="filter-category__checkbox-input-${element}" class="filter-category__checkbox-label">${element}</label>`
        filterCategoryWrapper.appendChild(categoryCheckbox)
    });
}


