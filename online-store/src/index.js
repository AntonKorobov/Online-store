import './global.css';

import { showModule } from './components/filter'

import booksBase from './components/pets_base.json' assert { type: 'json' };

showModule();

const CARDS_WRAPPER = document.querySelector(".cards-wrapper");
const FILTER_LANGUAGE_CHECK = document.querySelector("#languageFilter");
const FILTER_COVER_TYPE_CHECK = document.querySelector("#coverTypeFilter");
const FILTER_BUTTON = document.querySelector(".filter-button");

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
function filterBaseOfBooks(booksBase) {
    let filteredBase = [...booksBase];

    if (FILTER_LANGUAGE_CHECK.checked) {
        filteredBase = filterByLanguage(filteredBase, "English");
    }
    if (FILTER_COVER_TYPE_CHECK.checked) {
        filteredBase = filterByCoverType(filteredBase, "Paperback");
    }

    return filteredBase
}
//-------------------------------------------------------------

//-------------------------------------------------------------
function filterByLanguage(array, language) {
    return array.filter(element => element['language'] === language)
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}
//-------------------------------------------------------------

//-------------------------------------------------------------
function showCards() {
    CARDS_WRAPPER.innerHTML = '';
    const arrayOfBooks = filterBaseOfBooks(booksBase);

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