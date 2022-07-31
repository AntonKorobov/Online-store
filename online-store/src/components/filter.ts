import { BookInterface } from './booksInterface';

const filterCategoryWrapper = document.querySelector('.filter-category__wrapper') as HTMLElement;
createCategoryCheckbox();

const filterLanguageSelect = document.querySelector('.filter-language') as HTMLFormElement;
const filterCoverTypeSelect = document.querySelector('.filter-coverType') as HTMLFormElement;
const clearFiltersButton = document.querySelector('.clear-filters-button') as HTMLElement;
const sortSelector = document.querySelector('.sort_selector') as HTMLInputElement;
const filtersWrapper = document.querySelector('.filters-wrapper') as HTMLElement;
const listOfCheckbox = document.querySelectorAll('.filter-category__checkbox-input') as NodeListOf<HTMLInputElement>;
const listOfCheckboxAllInput = document.querySelector('#filter-category__checkbox-input-All') as HTMLInputElement;

interface listOfFiltersInterface {
    language: string;
    category: string[];
    coverType: string;
    sortType: string;
}

export const listOfFilters: listOfFiltersInterface = {
    language: '',
    category: [],
    coverType: '',
    sortType: '',
};

export function filterProducts(arrayOfProducts: BookInterface[], listOfFilters: listOfFiltersInterface) {
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
    return filteredArray;
}

export function setFilters() {
    const request = localStorage.getItem('listOfFiltersData');
    let listOfFiltersData: void | listOfFiltersInterface;
    if (request !== null) {
        listOfFiltersData = JSON.parse(request);
    }
    if (listOfFiltersData) {
        filterLanguageSelect.value = listOfFiltersData.language;
        filterCoverTypeSelect.value = listOfFiltersData.coverType;
        sortSelector.value = listOfFiltersData.sortType;
        listOfFiltersData.category.forEach((element) => {
            listOfCheckbox.forEach((filterName) => {
                if (filterName.value === element) {
                    filterName.checked = true;
                }
            });
        });
    }
}

export function updateFilters() {
    listOfFilters.language = '';
    listOfFilters.category.length = 0;
    listOfFilters.coverType = '';
    listOfFilters.sortType = '';

    listOfCheckbox.forEach((element) => {
        if (element.checked === true && element.value !== 'All') {
            listOfFilters.category.push(element.value);
        }
    });

    if (filterLanguageSelect.value !== '') {
        listOfFilters.language = filterLanguageSelect.value;
    }
    if (filterCoverTypeSelect.value !== '') {
        listOfFilters.coverType = filterCoverTypeSelect.value;
    }
    if (listOfFilters.category.length === 0) {
        listOfCheckboxAllInput.checked = true;
    } else {
        listOfCheckboxAllInput.checked = false;
    }

    listOfFilters.sortType = sortSelector.value;

    localStorage.setItem('listOfFiltersData', JSON.stringify(listOfFilters));
}

export function eventClickClearFiltersButton(foo: () => void) {
    clearFiltersButton.addEventListener('click', () => {
        filterLanguageSelect.selectedIndex = 0;
        filterCoverTypeSelect.selectedIndex = 0;

        listOfCheckbox.forEach((element) => {
            element.checked = false;
        });
        foo();
    });
}

export function eventClickFiltersCheckboxInput(foo: () => void) {
    filtersWrapper.addEventListener('click', (event) => {
        if ((event.target as HTMLInputElement).value === 'All') {
            listOfCheckbox.forEach((element) => {
                element.checked = false;
            });
        }
        if ((event.target as HTMLInputElement).classList.contains('filter-category__checkbox-input')) {
            foo();
        }
    });

    filtersWrapper.addEventListener(
        'change',
        (event) => {
            if ((event.target as HTMLInputElement).classList.contains('select')) {
                foo();
            }
        },
        true
    );
}

function filterByLanguage(array: BookInterface[], language: string) {
    return array.filter((element) => element['language'] === language);
}

function filterByCategory(array: BookInterface[], category: string[]) {
    if (category.length === 0) return array;
    return array.filter((element) => {
        for (let i = 0; i < category.length; i++) {
            if (element['category'].indexOf(category[i]) !== -1) return true;
        }
        return false;
    });
}

function filterByCoverType(array: BookInterface[], coverType: string) {
    return array.filter((element) => element['coverType'] === coverType);
}

function createCategoryCheckbox() {
    const arrayOfCategory = [
        'All',
        'Classics',
        'Science Fiction',
        'Literary',
        'Psychological',
        'Political',
        'Action & Adventure',
        'Media Tie-In',
        'Genetic Engineering',
    ];

    arrayOfCategory.forEach((element) => {
        const categoryCheckbox = document.createElement('li');
        categoryCheckbox.classList.add('filter-category__checkbox-wrapper');
        categoryCheckbox.innerHTML = ` 
            <input value="${element}" class="filter-category__checkbox-input" type="checkbox" name="filter" id="filter-category__checkbox-input-${element}">
            <label for="filter-category__checkbox-input-${element}" class="filter-category__checkbox-label">${element}</label>`;
        filterCategoryWrapper.appendChild(categoryCheckbox);
    });
}
