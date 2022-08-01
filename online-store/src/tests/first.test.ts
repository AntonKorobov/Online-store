/**
 * @jest-environment jsdom
 */

import { sortProducts } from '../components/sort';
import booksBase from '../components/booksBase.json';
// import { BookCard } from '../components/cardCreator';

test('Sort by title name', () => {
    const ArrayOfProducts = [
        {
            title: 'Steppenwolf',
            author: 'Hermann Hesse',
            publisher: 'Picador USA',
            category: ['Classics', 'Literary'],
            description: 'none',
            pages: 224,
            publishDate: 2002,
            price: 17,
            language: 'German',
            coverType: 'Paperback',
            img: './assets/Steppenwolf.jpg',
            id: '4',
        },
        {
            title: 'Fahrenheit 451',
            author: 'Ray D. Bradbury',
            publisher: 'Simon & Schuster',
            category: ['Classics', 'Science Fiction', 'Media Tie-In'],
            description: 'none',
            pages: 256,
            publishDate: 2012,
            price: 16,
            language: 'English',
            coverType: 'Paperback',
            img: './assets/Fahrenheit_451.jpg',
            id: '3',
        },
        {
            title: '1984',
            author: 'George Orwell',
            publisher: 'General Press',
            category: ['Classics', 'Psychological', 'Science Fiction'],
            description: 'none',
            pages: 246,
            publishDate: 2005,
            price: 30,
            language: 'English',
            coverType: 'Hardcover',
            img: './assets/1984.jpg',
            id: '2',
        },
    ];
    
    const sortedByNameArrayOfProducts = [
        {
            title: '1984',
            author: 'George Orwell',
            publisher: 'General Press',
            category: ['Classics', 'Psychological', 'Science Fiction'],
            description: 'none',
            pages: 246,
            publishDate: 2005,
            price: 30,
            language: 'English',
            coverType: 'Hardcover',
            img: './assets/1984.jpg',
            id: '2',
        },
        {
            title: 'Fahrenheit 451',
            author: 'Ray D. Bradbury',
            publisher: 'Simon & Schuster',
            category: ['Classics', 'Science Fiction', 'Media Tie-In'],
            description: 'none',
            pages: 256,
            publishDate: 2012,
            price: 16,
            language: 'English',
            coverType: 'Paperback',
            img: './assets/Fahrenheit_451.jpg',
            id: '3',
        },
        {
            title: 'Steppenwolf',
            author: 'Hermann Hesse',
            publisher: 'Picador USA',
            category: ['Classics', 'Literary'],
            description: 'none',
            pages: 224,
            publishDate: 2002,
            price: 17,
            language: 'German',
            coverType: 'Paperback',
            img: './assets/Steppenwolf.jpg',
            id: '4',
        },
    ];
    expect(sortProducts(ArrayOfProducts, 'Name-a-z')).toStrictEqual(sortedByNameArrayOfProducts);
});

test('Books base is correct', () => {
    const arrayOfProperties = ["title", "author", "publisher", "category", "description", "pages", "publishDate", "price", "language", "coverType", "coverType", "img", "id"];
    booksBase.forEach((element) => {
        for (let value of arrayOfProperties) {
            expect(element).toHaveProperty(value);
        }
        expect(element.category.length).toBeGreaterThan(0);
        const currentYear = new Date().getFullYear();
        expect(element.publishDate).toBeLessThanOrEqual(currentYear);
        expect(element.price).not.toEqual(0);
        expect(element.img).toMatch(/\.jpg$/i);
    })
});

// test('Create good card', () => {
//     const demoBooksBase = [
//         {
//             "title": "Steppenwolf",
//             "author": "Hermann Hesse",
//             "publisher": "Picador USA",
//             "category": [
//                 "Classics",
//                 "Literary"
//             ],
//             "description": "none",
//             "pages": 224,
//             "publishDate": 2002,
//             "price": 17,
//             "language": "German",
//             "coverType": "Paperback",
//             "img": "./assets/Steppenwolf.jpg",
//             "id": "4"
//         }
//     ]

//     const cardTitle = demoBooksBase[0]['title'];
//     const cardAuthor = demoBooksBase[0]['author'];
//     const cardPrice = demoBooksBase[0]['price'];
//     const coverType = demoBooksBase[0]['coverType'];
//     const language = demoBooksBase[0]['language'];
//     const img = demoBooksBase[0]['img'];
//     const cardId = demoBooksBase[0]['id'];
//     let cardClass = '';

//     const testCard = new BookCard(cardTitle, cardAuthor, cardPrice, coverType, language, img, cardId, cardClass);
//     expect(BookCard).toBe('<h2 class="card_title">Steppenwolf</h2><img class="card_img" src="./assets/Steppenwolf.jpg" alt=""><div class="card_description"><p class="card_author"><b>Author:</b> Hermann Hesse</p><p class="card_price"><b>Price:</b> 17</p><p class="card_cover-type"><b>Cover type:</b> Paperback</p><p class="card_language"><b>Language:</b> German</p><div class="card_click-area " data-cardId="4"></div></div>');
// });


