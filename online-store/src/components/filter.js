export const listOfFilters = {
    language: false,
    category: [],
    coverType: false,
}

export function filterProducts(booksBase, listOfFilters) {
    let filteredBase = [...booksBase];
    
    if (listOfFilters.language) {
        filteredBase = filterByLanguage(filteredBase, listOfFilters.language);
    }
    if (listOfFilters.category.length > 0) {
        filteredBase = filterByCategory(filteredBase, listOfFilters.category);
    }
    if (listOfFilters.coverType) {
        filteredBase = filterByCoverType(filteredBase, listOfFilters.coverType);
    }

    return filteredBase
}

//-------------------------------------------------------------
function filterByLanguage(array, language) {
    return array.filter(element => element['language'] === language)
}

function filterByCategory(array, category) {
    if(category[0] === 'All') return array;
    return array.filter(element => {
        for (let i = 0; i < category.length; i++) {
            if(element['category'].indexOf(category[i]) === -1) return false
        }
        return true
    })
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}


