import './global.css';

import { showSearchResults } from './components/search'

import { cartCounter } from './components/cart.js'
import { cartData } from './components/cart.js'
// let cartData = JSON.parse(localStorage.getItem("data")) || [];
    // console.log(cartData);


let typedTextValue = '';
// let cardsIcons = document.querySelectorAll('.card__click-area');

import{ sortProducts } from './components/sort.js'

import { listOfFilters } from './components/filter.js'
import { filterProducts } from './components/filter.js'

import { addProductToCart } from './components/cart.js'

import { booksBase } from './components/booksBase.ts'

// import booksBase from './components/booksBase.json' assert { type: 'json' };
// import booksBase from './components/booksBase.json'
// const booksBase = require('./components/booksBase.json');

// const responce = await fetch('./components/booksBase.json');
// const booksBase = await responce.json();

const cardsToBuyCounter = document.querySelector(".cart__counter");

const cardsWrapper = document.querySelector(".cards-wrapper");
const clearFiltersButton = document.querySelector(".clear-filters-button");
const resetSettingsButton = document.querySelector(".reset-settings-button");

const searchInput = document.querySelector('.search-section__search-input');
searchInput.select();
// document.querySelector('.search-input-form').onsubmit = "return false";

const filtersWrapper = document.querySelector(".filters-wrapper");
const sortWrapper = document.querySelector(".sort-wrapper");
const filterLanguageSelect = document.querySelector(".filter_language");
const filterCoverTypeSelect = document.querySelector(".filter_coverType");
const listOfCheckbox = document.querySelectorAll('.filter_category__checkbox_input');

const listOfCheckboxAllInput = document.querySelector('#filter_category__checkbox_input_All');

const sortSelector = document.querySelector(".sort_selector");

function updateFilters() {
    listOfFilters.language = false;
    listOfFilters.category.length = 0;
    listOfFilters.coverType = false;

    listOfCheckbox.forEach(element => {
        if((element.checked === true)&&(element.value !== "All")){
            listOfFilters.category.push(element.value);
        }
    });
    
    if (filterLanguageSelect.value !== "") {
        listOfFilters.language = filterLanguageSelect.value;
    }
    if (filterCoverTypeSelect.value !== "") {
        listOfFilters.coverType = filterCoverTypeSelect.value;
    }
    if(listOfFilters.category.length === 0){
        listOfCheckboxAllInput.checked = true; //default value
    }else{
        listOfCheckboxAllInput.checked = false;
    }
    // console.log(listOfFilters);
}

function getTypingTextValue(){
    searchInput.addEventListener('keyup', (event)=>{
        typedTextValue = event.target.value;
        showCards()
    })
}

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
                <p class="card_author"><b>Author:</b> ${this.author}</p>
                <p class="card_price"><b>Price:</b> ${this.price}</p>
                <p class="card_cover-type"><b>Cover type:</b> ${this.coverType}</p>
                <p class="card_language"><b>Language:</b> ${this.language}</p>
                <div class="card__click-area ${this.cardClass}" cardId="${this.cardId}"></div>`;
        return card
    }
}
//-------------------------------------------------------------

showCards();
updateCartCounter();

//----------------EVENTS---------------------------------------
resetSettingsButton.addEventListener('click', () => {
    localStorage.clear();
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
    if(event.target.classList.contains('filter_category__checkbox_input')){
        showCards();
    }
});

filtersWrapper.addEventListener('change',(event) => {
    if(event.target.classList.contains('select')){
        showCards();
    }
}, true);

cardsWrapper.addEventListener('click',(event) => {
    if(event.target.classList.contains('card__click-area')){
        event.target.classList.toggle('buy-card');
        addProductToCart(event.target.getAttribute("cardId"));
    }
    console.log(cartCounter);
    updateCartCounter();
});

sortWrapper.addEventListener('change',(event) => {
    if(event.target.classList.contains('select')){
        showCards();
    }
}, true);
//-------------------------------------------------------------

//-------------------------------------------------------------
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
        console.log(cartData.indexOf(arrayOfBooks[i]["id"]));
        if(cartData.indexOf(arrayOfBooks[i]["id"]) !== -1){
            cardClass = 'buy-card';
        }
    }

    let newCard = new BookCard(cardTitle, cardAuthor, cardPrice, coverType, language, img, cardId, cardClass);

    cardsWrapper.appendChild(newCard.createCard())
    }
};

function updateCartCounter() {
    cardsToBuyCounter.innerHTML = cartCounter;
        if(cartCounter !== 0){
            cardsToBuyCounter.classList.add('show-element');
        }else{
            cardsToBuyCounter.classList.remove('show-element');
        }
}
