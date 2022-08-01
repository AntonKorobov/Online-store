import { BookInterface } from './booksInterface';

const sortWrapper = document.querySelector('.sort-wrapper') as HTMLElement;
const sortSelector = document.querySelector('.sort_selector') as HTMLInputElement;

type SortingTypes = 'Name-a-z' | 'Name-z-a' | 'Price-highest' | 'Price-lowest';

export function sortProducts(
    arrayOfProducts: BookInterface[],
    typeOfSorting: SortingTypes = sortSelector.value as SortingTypes
): BookInterface[] {
    let filteredArray = [...arrayOfProducts];

    if (typeOfSorting === 'Name-a-z') {
        filteredArray = filteredArray.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
    }

    if (typeOfSorting === 'Name-z-a') {
        filteredArray = filteredArray.sort((a, b) => {
            return b.title.localeCompare(a.title);
        });
    }

    if (typeOfSorting === 'Price-lowest') {
        filteredArray = filteredArray.sort((a, b) => {
            return a.price - b.price;
        });
    }

    if (typeOfSorting === 'Price-highest') {
        filteredArray = filteredArray.sort((a, b) => {
            return b.price - a.price;
        });
    }
    return filteredArray;
}

export function eventChangeSortSelector(foo: () => void) {
    sortWrapper.addEventListener(
        'change',
        (event) => {
            if ((event.target as HTMLInputElement).classList.contains('select')) {
                foo();
            }
        },
        true
    );
}
