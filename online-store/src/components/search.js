const searchInput = document.querySelector('.search-form__input');
searchInput.select();
export let typedTextValue = '';

export function showSearchResults(array, text){
    const regexp = new RegExp(text, "i");
    return array.filter(element => element['title'].search(regexp) !== -1 )
}

export function getTypingTextValue(foo){
    searchInput.addEventListener('keyup', (event)=>{
        typedTextValue = event.target.value;
        foo()
    })
}

export function eventInputSearchArea(foo) {
    searchInput.addEventListener('input', (event) => {
        if(event.target.value === '') {
            typedTextValue = '';
            searchInput.value = '';
            foo();
        }
     });
}