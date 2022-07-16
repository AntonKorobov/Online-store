export const listOfFilters = {
    language: false,
    category: false,
    coverType: false,
}

export function filterProducts(booksBase, listOfFilters) {
    let filteredBase = [...booksBase];
    
    if (listOfFilters.language) {
        filteredBase = filterByLanguage(filteredBase, listOfFilters.language);
    }
    if (listOfFilters.category) {
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

function filterByCategory(array, category) {//Demo
    return array.filter(element => {
        for (let i = 0; i < element['category'].length; i++) {
            if( element['category'][i] === category) return true
        }
        return false
    })
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}


