/**
 * @jest-environment jsdom
 */

import { sortProducts } from '../components/sort';
import booksBase from '../components/booksBase.json';

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
    const arrayOfProperties = [
        'title',
        'author',
        'publisher',
        'category',
        'description',
        'pages',
        'publishDate',
        'price',
        'language',
        'coverType',
        'coverType',
        'img',
        'id',
    ];
    booksBase.forEach((element) => {
        for (const value of arrayOfProperties) {
            expect(element).toHaveProperty(value);
        }
        expect(element.category.length).toBeGreaterThan(0);
        const currentYear = new Date().getFullYear();
        expect(element.publishDate).toBeLessThanOrEqual(currentYear);
        expect(element.price).not.toEqual(0);
        expect(element.img).toMatch(/\.jpg$/i);
    });
});