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
const FILTER_LANGUAGE_CHECK = document.querySelector("#languageFilter");
const FILTER_COVER_TYPE_CHECK = document.querySelector("#coverTypeFilter");
const FILTER_BUTTON = document.querySelector(".filter-button");

function updateFilters() {
    listOfFilters.language = false;
    listOfFilters.category = false;
    listOfFilters.coverType = false;

    if (FILTER_LANGUAGE_CHECK.checked) {
        listOfFilters.language = "English";
    }
    if (FILTER_COVER_TYPE_CHECK.checked) {
        listOfFilters.coverType = "Paperback";
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
    FILTER_LANGUAGE_CHECK.checked = false;
    FILTER_COVER_TYPE_CHECK.checked = false;
    showCards();
})

document.body.addEventListener('click', function(event) {
    if (event.target.className === 'filter') {
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