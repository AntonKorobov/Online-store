export function showSearchResults(array, text){
    const regexp = new RegExp(text, "i");
    return array.filter(element => element['title'].search(regexp) !== -1 )
}