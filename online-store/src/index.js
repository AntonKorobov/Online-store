import './global.css';

const filterCategoryWrapper = document.querySelector(".filter-category__wrapper");
createCategoryCheckbox();//create HTML

import { showSearchResults } from './components/search'

import { cartCounter } from './components/cart.js'
import { cartData } from './components/cart.js'

let typedTextValue = '';

import{ sortProducts } from './components/sort.js'

import { listOfFilters } from './components/filter.js'
import { filterProducts } from './components/filter.js'

import { addProductToCart } from './components/cart.js'

// const booksBase = require('./components/booksBase.json');
// import { booksBase } from './components/booksBase.ts'
// import booksBase from './components/booksBase.json' assert { type: 'json' };
import booksBase from './components/booksBase.json'

// const responce = await fetch('./components/booksBase.json');
// const booksBase = await responce.json();

const cardsToBuyCounter = document.querySelector(".cart__counter");

const cardsWrapper = document.querySelector(".cards-wrapper");
const clearFiltersButton = document.querySelector(".clear-filters-button");
const resetSettingsButton = document.querySelector(".reset-settings-button");

const searchInput = document.querySelector('.search-form__input');
searchInput.select();
// document.querySelector('.search-input-form').onsubmit = "return false";

const filtersWrapper = document.querySelector(".filters-wrapper");
const sortWrapper = document.querySelector(".sort-wrapper");
const filterLanguageSelect = document.querySelector(".filter-language");
const filterCoverTypeSelect = document.querySelector(".filter-coverType");
const listOfCheckbox = document.querySelectorAll('.filter-category__checkbox-input');

const listOfCheckboxAllInput = document.querySelector('#filter-category__checkbox-input-All');

const sortSelector = document.querySelector(".sort_selector");

//-------------------------------------------------------------
class BookCard {
    constructor(title, author, price, coverType, language, img, cardId, cardClass) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.coverType = coverType;
        this.language = language;
        this.img = img;
        this.cardId = cardId;
        this.cardClass = cardClass;
    }

    createCard() {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                <h2 class="card_title">${this.title}</h2>
                <img class="card_img" src="${this.img}" alt="">
                <div class="card_description">
                    <p class="card_author"><b>Author:</b> ${this.author}</p>
                    <p class="card_price"><b>Price:</b> ${this.price}</p>
                    <p class="card_cover-type"><b>Cover type:</b> ${this.coverType}</p>
                    <p class="card_language"><b>Language:</b> ${this.language}</p>
                    <div class="card_click-area ${this.cardClass}" data-cardId="${this.cardId}"></div>
                </div>`;
        return card
    }
}
//-------------------------------------------------------------

setFilters();
showCards();
updateCartCounter();

//-------------------------------------------------------------
function setFilters() {
    let listOfFiltersData = JSON.parse(localStorage.getItem("listOfFiltersData")) || null;
    if(listOfFiltersData !== null){
        filterLanguageSelect.value = listOfFiltersData.language;
        filterCoverTypeSelect.value = listOfFiltersData.coverType;
        sortSelector.value = listOfFiltersData.sortType;
        listOfFiltersData.category.forEach(element => {
            listOfCheckbox.forEach(filterName => {
                if(filterName.value === element){
                    filterName.checked = true;
                };
            });
        });
    }
}

function updateFilters() {
    listOfFilters.language = '';
    listOfFilters.category.length = 0;
    listOfFilters.coverType = '';
    listOfFilters.sortType = '';

    listOfCheckbox.forEach(element => {
        if((element.checked === true)&&(element.value !== "All")) {
            listOfFilters.category.push(element.value);
        }
    });
    
    if (filterLanguageSelect.value !== "") {
        listOfFilters.language = filterLanguageSelect.value;
    }
    if (filterCoverTypeSelect.value !== "") {
        listOfFilters.coverType = filterCoverTypeSelect.value;
    }
    if(listOfFilters.category.length === 0) {
        listOfCheckboxAllInput.checked = true; //default value
    }else{
        listOfCheckboxAllInput.checked = false;
    }

    listOfFilters.sortType = sortSelector.value;

    //save in localStorage
    localStorage.setItem("listOfFiltersData", JSON.stringify(listOfFilters));
}

function getTypingTextValue(){
    searchInput.addEventListener('keyup', (event)=>{
        typedTextValue = event.target.value;
        showCards()
    })
}

function createCategoryCheckbox() {
    const arrayOfCategory = ['All', 'Classics','Science Fiction', 'Literary', 'Psychological', 'Political', 'Action & Adventure', 'Media Tie-In', 'Genetic Engineering'];

    arrayOfCategory.forEach(element => {
        let categoryCheckbox = document.createElement("li");
        categoryCheckbox.classList.add("filter-category__checkbox-wrapper");
        categoryCheckbox.innerHTML = ` 
            <input value="${element}" class="filter-category__checkbox-input" type="checkbox" name="filter" id="filter-category__checkbox-input-${element}">
            <label for="filter-category__checkbox-input-${element}" class="filter-category__checkbox-label">${element}</label>`
        filterCategoryWrapper.appendChild(categoryCheckbox)
    });
}

function showCards() {
    cardsWrapper.innerHTML = '';

    updateFilters();

    let arrayOfBooks = filterProducts(booksBase, listOfFilters);
    arrayOfBooks = sortProducts(arrayOfBooks, sortSelector.value);
    arrayOfBooks = showSearchResults(arrayOfBooks, typedTextValue);

    if(arrayOfBooks.length === 0) cardsWrapper.innerHTML='<h2 class="sorry-message">Sorry, no results were found:(</h2>';

    for (let i = 0; i < arrayOfBooks.length; i++) {
        let cardTitle = arrayOfBooks[i]["title"];
        let cardAuthor = arrayOfBooks[i]["author"];
        let cardPrice = arrayOfBooks[i]["price"];
        let coverType = arrayOfBooks[i]["coverType"];
        let language = arrayOfBooks[i]["language"];
        let img = arrayOfBooks[i]["img"];
        let cardId = arrayOfBooks[i]["id"];
        let cardClass = "";
    if(cartData !== 0) {
        if(cartData.indexOf(arrayOfBooks[i]["id"]) !== -1){
            cardClass = 'card_click-area_buy';
        }
    }

    let newCard = new BookCard(cardTitle, cardAuthor, cardPrice, coverType, language, img, cardId, cardClass);

    cardsWrapper.appendChild(newCard.createCard())
    }
};

function updateCartCounter() {
    cardsToBuyCounter.innerHTML = cartCounter;
    if(cartCounter !== 0){
        cardsToBuyCounter.classList.add('cart__counter_visible');
    }else{
        cardsToBuyCounter.classList.remove('cart__counter_visible');
    }
}
//-------------------------------------------------------------

//----------------EVENTS---------------------------------------
resetSettingsButton.addEventListener('click', () => {
    localStorage.clear();
    document.location.reload();
})

getTypingTextValue();

searchInput.addEventListener('input', (event) => {
   if(event.target.value === '') {
       typedTextValue = '';
       searchInput.value = '';
       showCards();
   }
});

clearFiltersButton.addEventListener('click', () => {
    filterLanguageSelect.selectedIndex = 0;
    filterCoverTypeSelect.selectedIndex = 0;

    listOfCheckbox.forEach(element => {
        element.checked = false;
    })
    showCards();
});

filtersWrapper.addEventListener('click', (event) => {
    if(event.target.value === 'All') {
        listOfCheckbox.forEach(element => {
            element.checked = false;
        })
    }
    if(event.target.classList.contains('filter-category__checkbox-input')){
        showCards();
    }
});

filtersWrapper.addEventListener('change',(event) => {
    if(event.target.classList.contains('select')){
        showCards();
    }
}, true);

cardsWrapper.addEventListener('click',(event) => {
    if(event.target.classList.contains('card_click-area')){
        if(cartCounter === 20) {
            event.target.classList.remove('card_click-area_buy');
        }else{
            event.target.classList.toggle('card_click-area_buy');
        }
        addProductToCart(event.target.getAttribute("data-cardId"));
    }
    updateCartCounter();
});

sortWrapper.addEventListener('change',(event) => {
    if(event.target.classList.contains('select')){
        showCards();
    }
}, true);
//-------------------------------------------------------------