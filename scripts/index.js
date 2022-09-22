//Or4HODj5TcB4cbOt00k6UA==53xijEHXB3z7Up8h

import * as categories from './categories.js';
import * as quote from './quote.js';
import * as favorite from './favorite.js';

//adding categories to the DOM tree

let category = '';

const selector = document.querySelector('#category-selector');
const generator = document.querySelector('#generator');

const categorySourcePath = '/../resources/categories.txt';

const textArea = document.querySelector('.text');
const authorArea = document.querySelector('.author');
const categoryArea = document.querySelector('.category');

const proccessQuote = function(category = '') {

    //disable generate button
    generator.setAttribute('disabled', 'true');

    quote.getQuote(category)
    .then((data) => {
        quote.placeContentIntoElement(textArea, '<strong>Quote:</strong> ' + data[0].quote);
        quote.placeContentIntoElement(authorArea, '<strong>Author:</strong> ' + data[0].author);
        quote.placeContentIntoElement(categoryArea, '<strong>Category:</strong> ' + (function() {
            
            let array = data[0].category.split('');
            let firstLetter = array.slice(0, 1);
            firstLetter[0] = firstLetter[0].toUpperCase();
            array.splice(0, 1);

            return firstLetter.concat(array).join('');
        })());
        
        //enable generate button
        generator.removeAttribute('disabled');;
    })
    .catch(error => {
        console.log(error);
        alert('API error has occured', error);
        //enable generate button
        generator.removeAttribute('disabled');;
    });
}

window.addEventListener('load', () => {


    categories.getCategoriesFromSource(categorySourcePath)
    .then(data => {
        categories.insertCategories(selector, data);
    });

    proccessQuote();

    generator.addEventListener('click', () => {
        category = categories.getCategory(selector);
        proccessQuote(category);
    });

    let favoriteList = document.querySelector('.quote-container');

    document.querySelector('.favorite-btn').addEventListener('click', () => {

        favoriteList.style.display = 'flex';
        setTimeout(function() {
            favoriteList.classList.toggle('shown');
        }, 50);

    });

    favorite.addListenersToList(favoriteList);
    
    let list = document.querySelector('.list');

    //load data from the localStorage if there's any
    if(!localStorage.getItem('list') == '') {
        // console.log(localStorage.getItem('list'));
        list.innerHTML = localStorage.getItem('list');
        favorite.checkListContent(list);
    }

    document.querySelector('.clear-list-btn').addEventListener('click', () => {
        favorite.deleteAllQuotes(list);
    });


    document.querySelector('.add-btn').addEventListener('click', () => {


        favorite.saveQouteToList(
            list,
            categoryArea.innerText.split(': ')[1], 
            authorArea.innerText.split(': ')[1],
            textArea.innerText
        );
        favorite.checkListContent(list);
    });

});







