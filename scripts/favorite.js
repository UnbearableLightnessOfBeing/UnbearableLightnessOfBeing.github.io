import * as alertNotification from './alert-notification.js';

// elements to manipulate
let quoteItem = null;
let visible = null;
let paragraph = null;
let clickable = null;
let visibleItem1 = null;
let visibleItem2 = null;
let deleteButton = null;

export function addListenersToList(favoriteList) {
    let list = favoriteList.firstElementChild.lastElementChild;
    
    addClosingEvenetListener(favoriteList);
    addListListeners(list);
}

function addClosingEvenetListener(favoriteList) {

    document.querySelector('.close-btn').addEventListener('click', () => {
        setTimeout(() => {
            favoriteList.style.display = 'none';
        }, 500);
        favoriteList.classList.toggle('shown');
    });
    
    favoriteList.addEventListener('click', function(e) {
        if(e.target.matches('.quote-container')) {
            favoriteList.classList.toggle('shown');
            setTimeout(() => {
                favoriteList.style.display = 'none';
            }, 500);
        }
    });
}

function addListListeners(list) {
    //add an event listener to unfold and collapse the content of a quote
    list.addEventListener('click', function(e) {
        if(e.target.matches('.clickable')) {
            e.target.parentElement.nextElementSibling.classList.toggle('unfolded');
        }

        //add an event listener to delete a quote from the list
        if(e.target.matches('.delete-target')) {
            deleteQuote(list, e.target.parentElement.parentElement);
        }
    });
}

function deleteQuote(list, targetQuote) {
    
    if(confirm('Do you really want to delete this quote?')) {
        
        targetQuote.closest('.quote-item').remove();

        // save data in in the localStorage after deletion
        localStorage.setItem('list', list.innerHTML);
        checkListContent(list);
    }
}

function createMyElement(tag, className = '', text = '', html = '') {
    let element = document.createElement(tag);

    if(Array.isArray(className)) {
        className.forEach((name) => {
            element.classList.add(name);
        });
    }else if(className) {
        element.classList.add(className);
    }

    if(text) {
        element.innerText = text;
    }else if(html) {
        element.innerHTML = html;
    }
    return element;
}

function appendChildrenToElement(element, ...children) {

    Object.values(arguments)
        .filter((argument, index) => index !== 0)
        .forEach(child => {
        element.appendChild(child);
    });
};

export function saveQouteToList(list, category, author, text) {    

    if(qouteIsInList(list, text)) {
        alert('This quote is already in your list!');
        return;
    }

    createQuoteElements(category, author, text);
        
    appendEverything(list);

    // store saved quotes in the locasStorage
    localStorage.setItem('list', list.innerHTML);

    // lunch alert notification
    alertNotification.launchNotificaiton(4000);
};

function createQuoteElements(category, author, text) {
    quoteItem = createMyElement('li', 'quote-item');
    visible = createMyElement('div', 'visible');
    paragraph = createMyElement('p', 'text', text);
    clickable = createMyElement('div', 'clickable');
    visibleItem1 = createMyElement('h3', 'category', category);
    visibleItem2 = createMyElement('h3', '', author);
    deleteButton = createMyElement(
        'div', ['delete', 'delete-target'],
        '', '<i class="fa-solid fa-trash delete-target"></i>'
        );
}

function appendEverything(list) {
    appendChildrenToElement(quoteItem, visible, paragraph);
    appendChildrenToElement(visible, clickable, visibleItem1, visibleItem2, deleteButton);
    list.appendChild(quoteItem);
};

function qouteIsInList(list, text) {

    if(listIsEmpty(list)) {
        return false;
    }

    for(let item of Array.from(list.children)) {
        if(!item.classList.contains('empty-caption') 
        && item.lastElementChild.innerText == text) {
            return true;
        }
    }
    return false;
}

export function checkListContent(list) {

    let caption = document.querySelector('.empty-caption');

    if(listIsEmpty(list)) {
        caption.style.display = 'block';
    }else {
        caption.style.display = 'none';
    }
}

function listIsEmpty(list) {
    return (list.children.length == 1) ? true : false;
}

export function deleteAllQuotes(list) {

    if(list.children.length === 1) {
        alert('Your list is already empty!');
    }else {
        if(confirm('Do you really want to delete the whole list?')) {
            while(list.children.length > 1) {
                list.lastElementChild.remove();
            }
            checkListContent(list);
            localStorage.removeItem('list');
        }
    }
}
