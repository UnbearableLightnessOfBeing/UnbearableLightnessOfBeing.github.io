import * as categories from './categories.js';
import * as quote from './quote.js';
import * as favorite from './favorite.js';
import * as alertNotification from './alert-notification.js';

let category = '';

const selector = document.querySelector('#category-selector');
const generator = document.querySelector('#generator');
const addButton = document.querySelector('.add-btn');

const categorySourcePath = './../resources/ctgrs.txt';

const textArea = document.querySelector('.text');
const authorArea = document.querySelector('.author');
const categoryArea = document.querySelector('.category');

const list = document.querySelector('.list');
const quoteContainer = document.querySelector('.quote-container');

const proccessQuote = function(category = '') {

    //disable generateand add button
    generator.setAttribute('disabled', 'true');
    addButton.setAttribute('disabled', 'true');

    quote.getQuote(category)
    .then((data) => {
        placeFetchedContent(data);

        //enable generate and add button
        generator.removeAttribute('disabled');
        addButton.removeAttribute('disabled');

        // reset the notification tab
        alertNotification.removeNotification();
        clearTimeout(alertNotification.getCurrentId());
    })
    .catch(error => {
        alert('API error has occured', error);

        //enable generate button
        generator.removeAttribute('disabled');
        addButton.removeAttribute('disabled');
    });
}

function placeFetchedContent(data) {
    quote.placeContentIntoElement(textArea, '<strong>Quote:</strong> ' + data[0].quote);
    quote.placeContentIntoElement(authorArea, '<strong>Author:</strong> ' + data[0].author);
    quote.placeContentIntoElement(categoryArea, '<strong>Category:</strong> ' + (function() {
        let array = data[0].category.split('');
        let firstLetter = array.splice(0, 1)[0].toUpperCase();
        return firstLetter + array.join('');
    })());
};

window.addEventListener('load', () => {
    proccessCategories();
    proccessQuote();
    proccessGenerateButton();
    proccessMyFavoriteButton();
    favorite.addListenersToList(quoteContainer);
    //load data from the localStorage if there's any
    loadDataFromStorage();
    proccessDeleteAllButton();
    proccessAddButton();    
});

function proccessCategories() {
    categories.getCategoriesFromSource(categorySourcePath)
    .then(data => {
        categories.insertCategories(selector, data);
    });
}

function proccessGenerateButton() {
    generator.addEventListener('click', () => {
        category = categories.getCategory(selector);
        proccessQuote(category);
    });
}

function proccessMyFavoriteButton() {
    document.querySelector('.favorite-btn').addEventListener('click', () => {

        quoteContainer.style.display = 'flex';
        setTimeout(function() {
            quoteContainer.classList.toggle('shown');
        }, 50);

    });
}

function loadDataFromStorage() {
    if(!localStorage.getItem('list') == '') {
        list.innerHTML = localStorage.getItem('list');
        favorite.checkListContent(list);
    }
}

function proccessDeleteAllButton() {
    document.querySelector('.clear-list-btn').addEventListener('click', () => {
        favorite.deleteAllQuotes(list);
    });
}

function proccessAddButton() {
    addButton.addEventListener('click', function() {
        // disable the button
        this.setAttribute('disabled', 'true');

        favorite.saveQouteToList(
            list,
            categoryArea.innerText.split(': ')[1], 
            authorArea.innerText.split(': ')[1],
            textArea.innerText
        );
        favorite.checkListContent(list);

        // enable the button
        this.removeAttribute('disabled');
    });
}







