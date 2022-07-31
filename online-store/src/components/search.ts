import { BookInterface } from './booksInterface';

const searchInput = document.querySelector('.search-form__input') as HTMLInputElement;
searchInput.select();
export let typedTextValue = '';

export function showSearchResults(array: BookInterface[], text: string) {
    const regexp = new RegExp(text, 'i');
    return array.filter((element) => element['title'].search(regexp) !== -1);
}

export function eventGetTypingTextValue(foo: () => void) {
    searchInput.addEventListener('keyup', (event) => {
        typedTextValue = (event.target as HTMLInputElement).value;
        foo();
    });
}

export function eventInputSearchArea(foo: () => void) {
    searchInput.addEventListener('input', (event) => {
        if ((event.target as HTMLInputElement).value === '') {
            typedTextValue = '';
            searchInput.value = '';
            foo();
        }
    });
}
