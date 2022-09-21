//Or4HODj5TcB4cbOt00k6UA==53xijEHXB3z7Up8h

import * as categories from './categories.js';
import * as quote from './quote.js';
import * as favorite from './favorite.js';

//adding categories to the DOM tree

let category = '';

const selector = document.querySelector('#category-selector');

const categorySourcePath = '/../resources/categories.txt';

const textArea = document.querySelector('.text');
const authorArea = document.querySelector('.author');
const categoryArea = document.querySelector('.category');

const proccessQuote = function(category = '') {
    quote.getQuote(category)
    .then((data) => {
        quote.placeContentIntoElement(textArea, data[0].quote);
        quote.placeContentIntoElement(authorArea, data[0].author);
        quote.placeContentIntoElement(categoryArea, data[0].category);
    })
    .catch(error => {
        console.log(error);
        alert(error);
    });
}

window.addEventListener('load', () => {

    categories.getCategoriesFromSource(categorySourcePath)
    .then(data => {
        categories.insertCategories(selector, data);
    });

    proccessQuote();

    document.querySelector('#generator').addEventListener('click', () => {
        category = categories.getCategory(selector);
        proccessQuote(category);
    });

    let favoriteList = document.querySelector('.quote-container');

    document.querySelector('.favorite-btn').addEventListener('click', () => {

        favoriteList.style.display = 'flex';
    });

    favorite.addListenersToList(favoriteList);

    document.querySelector('.add-btn').addEventListener('click', () => {

        let list = document.querySelector('.list');

        favorite.saveQouteToList(
            list,
            categoryArea.innerText, 
            authorArea.innerText,
            textArea.innerText
        );
        favorite.chekListContent(list);
    });

});







