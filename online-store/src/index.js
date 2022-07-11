// import './global.css';

const response = await fetch('./components/pets_base.json');
const booksBase = await response.json();

const CARDS_WRAPPER = document.querySelector(".cards-wrapper");
const FILTER_LANGUAGE_CHECK = document.querySelector("#languageFilter");
const FILTER_COVER_TYPE_CHECK = document.querySelector("#coverTypeFilter");
const FILTER_BUTTON = document.querySelector(".filter-button");

class BookCard {

    constructor(title, author, price, coverType, language) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.coverType = coverType;
        this.language = language;
    }

    createCard() {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                <h2 class="card_title">${this.title}</h2>
                <img alt="">
                <p class="card_author"><b>Author:</b> ${this.author}</p>
                <p class="card_price"><b>Price:</b> ${this.price}</p>
                <p class="card_cover-type"><b>Cover type:</b> ${this.coverType}</p>
                <p class="card_language"><b>Language:</b> ${this.language}</p>`;
        return card
    }
}

FILTER_BUTTON.addEventListener('click', () => {
    showCards();
})

function filterBaseOfBooks(booksBase) {
    let filteredBase = [...booksBase];

    if (FILTER_LANGUAGE_CHECK.checked) {
        filteredBase = filterByLanguage(filteredBase, "Eng");
    }
    if (FILTER_COVER_TYPE_CHECK.checked) {
        filteredBase = filterByCoverType(filteredBase, "Paperback");
    }

    return filteredBase
}

function filterByLanguage(array, language) {
    return array.filter(element => element['language'] === language)
}

function filterByCoverType(array, coverType) {
    return array.filter(element => element['coverType'] === coverType)
}

function showCards() {
    CARDS_WRAPPER.innerHTML = '';
    const arrayOfBooks = filterBaseOfBooks(booksBase);

    for (let i = 0; i < arrayOfBooks.length; i++) {
        let cardTitle = arrayOfBooks[i]["title"];
        let cardAuthor = arrayOfBooks[i]["author"];
        let cardPrice = arrayOfBooks[i]["price"];
        let coverType = arrayOfBooks[i]["coverType"];
        let language = arrayOfBooks[i]["language"];

        let newCard = new BookCard(cardTitle, cardAuthor, cardPrice, coverType, language);

        CARDS_WRAPPER.appendChild(newCard.createCard())
    }
};