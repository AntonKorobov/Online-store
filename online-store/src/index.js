import './global.css';

import { listOfFilters } from './components/filter.js'
import { filterProducts } from './components/filter.js'

import { booksBase } from './components/booksBase.ts'

// import booksBase from './components/booksBase.json' assert { type: 'json' };
// import booksBase from './components/booksBase.json'
// const booksBase = require('./components/booksBase.json');

// const responce = await fetch('./components/booksBase.json');
// const booksBase = await responce.json();

const CARDS_WRAPPER = document.querySelector(".cards-wrapper");
const FILTER_BUTTON = document.querySelector(".filters-section-button");

const filterLanguageSelect = document.querySelector(".filter_language");
const filterCoverTypeSelect = document.querySelector(".filter_coverType");
const listOfCheckbox = document.querySelectorAll('.filter_category__checkbox_input');
const listOfCheckboxAllInput = document.querySelector('#filter_category__checkbox_input_All');

function updateFilters() {
    listOfFilters.language = false;
    // listOfFilters.category = [];//is possible?
    // listOfFilters.category =listOfFilters.category.splice(0,listOfFilters.category.length)//delete all elements from array
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
    console.log(listOfFilters);
}

//-------------------------------------------------------------
class BookCard {
    constructor(title, author, price, coverType, language, img) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.coverType = coverType;
        this.language = language;
        this.img = img;
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
                <p class="card_language"><b>Language:</b> ${this.language}</p>`;
        return card
    }
}
//-------------------------------------------------------------

showCards();

//-------------------------------------------------------------
FILTER_BUTTON.addEventListener('click', () => {
    filterLanguageSelect.selectedIndex = 0;
    filterCoverTypeSelect.selectedIndex = 0;

    listOfCheckbox.forEach(element => {
        if(element.value === 'All') element.checked = true;//!!!
        else(element.checked = false);
    })

    showCards();
})

document.body.addEventListener('click', function(event) {
    if (event.target.className === 'filter_category__checkbox_input' || 'select') {
        showCards();
    }
});
//-------------------------------------------------------------

//-------------------------------------------------------------
function showCards() {
    CARDS_WRAPPER.innerHTML = '';
    updateFilters();
    const arrayOfBooks = filterProducts(booksBase, listOfFilters);

    for (let i = 0; i < arrayOfBooks.length; i++) {
        let cardTitle = arrayOfBooks[i]["title"];
        let cardAuthor = arrayOfBooks[i]["author"];
        let cardPrice = arrayOfBooks[i]["price"];
        let coverType = arrayOfBooks[i]["coverType"];
        let language = arrayOfBooks[i]["language"];
        let img = arrayOfBooks[i]["img"];

        let newCard = new BookCard(cardTitle, cardAuthor, cardPrice, coverType, language, img);

        CARDS_WRAPPER.appendChild(newCard.createCard())
    }
};
//-------------------------------------------------------------