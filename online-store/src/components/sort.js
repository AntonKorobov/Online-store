const sortWrapper = document.querySelector(".sort-wrapper");
const sortSelector = document.querySelector(".sort_selector");

export function sortProducts(arrayOfProducts, typeOfSorting = sortSelector.value) {
    let filteredArray = [...arrayOfProducts];

    if(typeOfSorting === "Name-a-z"){
        filteredArray = filteredArray.sort((a, b)=>{
            return a["title"].localeCompare(b["title"]) 
        })
    }
    
    if(typeOfSorting === "Name-z-a"){
        filteredArray = filteredArray.sort((a, b)=>{
            return b["title"].localeCompare(a["title"]) 
        })
    }

    if(typeOfSorting === "Price-lowest"){
        filteredArray = filteredArray.sort((a, b)=>{
            return a["price"]-b["price"]
        })
    }

    if(typeOfSorting === "Price-highest"){
        filteredArray = filteredArray.sort((a, b)=>{
            return b["price"]-a["price"]
        })
    }
return filteredArray
}

export function eventChangeSortSelector(foo) {
    sortWrapper.addEventListener('change',(event) => {
        if(event.target.classList.contains('select')){
            foo();
        }
    }, true);
}