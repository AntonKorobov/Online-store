export const listOfFilters = {
    coverType: false,
    language: false,
    category: false,
}

export function filterProducts(booksBase, listOfFilters) {
    let filteredBase = [...booksBase];
    
    if (listOfFilters.coverType) {
        filteredBase = filterByCoverType(filteredBase, listOfFilters.coverType);
    }
    if (listOfFilters.language) {
        filteredBase = filterByLanguage(filteredBase, listOfFilters.language);
    }
    if (listOfFilters.category) {
        filteredBase = filterByCategory(filteredBase, listOfFilters.category);
    }

    return filteredBase
}

//-------------------------------------------------------------
function filterByLanguage(array, language) {
    return array.filter(element => element['language'] === language)
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}

function filterByCategory(array, category) {//Demo
    return array.filter(element => {
        for (let i = 0; i < element['category'].length; i++) {
            if( element['category'][i] === category) return true
        }
        return false
    })
}
