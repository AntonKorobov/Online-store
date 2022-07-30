const cardsWrapper = document.querySelector(".cards-wrapper");

import booksBase from './booksBase.json'

import { showSearchResults } from './search'
import { typedTextValue } from './search'

import { cartCounter, cartData, addProductToCart, updateCartCounter } from './cart'

import {listOfFilters, filterProducts, updateFilters} from './filter'

import{ sortProducts } from './sort'

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

export function showCards() {
    cardsWrapper.innerHTML = '';
    
    updateFilters();

    let arrayOfBooks = filterProducts(booksBase, listOfFilters);
    arrayOfBooks = sortProducts(arrayOfBooks);
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
export function eventClickCard() {
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
}