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
        console.log(listOfFilters.category.length);
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
    return array.filter(element => {
        for (let i = 0; i < element['category'].length; i++) {
            if(category.indexOf(element['category'][i]) !== -1) return true
        }
        return false
    })
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}


