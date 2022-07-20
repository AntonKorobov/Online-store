export const listOfFilters = {
    language: false,
    category: [],
    coverType: false,
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

//-------------------------------------------------------------
function filterByLanguage(array, language) {
    return array.filter(element => element['language'] === language)
}

function filterByCategory(array, category) {
    if(category.length === 0) return array;
    return array.filter(element => {
        let categoryCounter = 0;
        for (let i = 0; i < category.length; i++) {
            if(element['category'].indexOf(category[i]) !== -1) return true
        }
        return false
    })
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}


