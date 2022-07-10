// import './global.css';

const response = await fetch('./components/pets_base.json');
const bocksBase = await response.json();

const CARDS_WRAPPER = document.querySelector(".cards-wrapper");

class BookCard {

    constructor(title, author, price){
        this.title = title;
        this.auhor = author;
        this.price = price;
    }

    createCard() {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                <h2 class="card_title">${this.title}</h2>
                <img alt="">
                <p class="card_author">${this.auhor}</p>
                <p class="card_price">${this.price}</p>`;
        return card
    }
}

showCards();

function showCards() {
    for (let i = 0; i < bocksBase.length; i++) {
        let cardTitle = bocksBase[i]["title"];
        let cardAuthor = bocksBase[i]["author"];
        let cardPrice = bocksBase[i]["price"];

        let newCard = new BookCard(cardTitle, cardAuthor, cardPrice);

        CARDS_WRAPPER.appendChild(newCard.createCard())
    }
};

function sortByPrice() {

}