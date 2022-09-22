

export function addListenersToList(favoriteList) {

    let list = favoriteList.firstElementChild.lastElementChild;
    
    addCloseEvenetListener(favoriteList);
    addListListeners(list);

    //testing
    // saveQouteToList(list, 'caetsdf', 'Bruce Lee', 'It doesn\'t matter how slowly you go, it matters that you don\'t stop');

}

function addCloseEvenetListener(favoriteList) {

    document.querySelector('.close-btn').addEventListener('click', () => {
        favoriteList.style.display = 'none';

    });
    
    favoriteList.addEventListener('click', function(e) {
        if(e.target.matches('.quote-container')) {
            favoriteList.style.display = 'none';
        }
    });
}

function addListListeners(list) {


    //add an event listener to unfold and collapse content of a quote
    list.addEventListener('click', function(e) {
        if(e.target.matches('.clickable')) {
            toggleContent(e.target.parentElement.nextElementSibling);
        }

        //add an event listener to delete a quote from the list
        if(e.target.matches('.delete')) {
            deleteQuote(list, e.target.parentElement.parentElement);
        }
    });

}

function toggleContent(text) {
    if(text.style.height == 'fit-content') {
        text.style.height = '0';
    }else {
        text.style.height = 'fit-content';
    }
}

function deleteQuote(list, targetQuote) {
    
    if(confirm('Do you really want to delete this quote?')) {
        targetQuote.remove();
        // save data in in the localStorage after deletion
        localStorage.setItem('list', list.innerHTML);
        checkListContent(list);
    }
}

export function saveQouteToList(list, category, author, text) {    

    if(qouteIsInList(list, text)) {
        alert('This quote is already in your list!');
        return;
    }

    let quoteItem = document.createElement('li');
    quoteItem.classList.add('quote-item');

    let visible = document.createElement('div');
    visible.classList.add('visible');

    let paragraph = document.createElement('p');
    paragraph.classList.add('text');
    paragraph.innerText = text;

    let clickable = document.createElement('div');
    clickable.classList.add('clickable');
    
    
    quoteItem.appendChild(visible);
    quoteItem.appendChild(paragraph);

    let visibleItem1 = document.createElement('h3');
    visibleItem1.innerText = category;
    let visibleItem2 = document.createElement('h3');
    visibleItem2.innerText = author;
    let deleteButton = document.createElement('div');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete');

    visible.appendChild(clickable);
    visible.appendChild(visibleItem1);
    visible.appendChild(visibleItem2);
    visible.appendChild(deleteButton);

    list.appendChild(quoteItem);

    // store saved quotes in the locasStorage
    localStorage.setItem('list', list.innerHTML);
};

function qouteIsInList(list, text) {

    if(listIsEmpty(list)) {
        return false;
    }
    
    let children = list.children;
    
    children = Array.from(children);

    for(let item of children) {
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
    return (list.children.length === 1) ? true : false;
}

export function deleteAllQuotes(list) {

    if(list.children.length == 1) {
        
        alert('Your list is already empty!');

    }else {
        if(confirm('Do you really want to delete the whole list?')) {
            // list.innerHTML = '<h1 class="empty-caption">List is empty!</h1>';
    
            while(list.children.length > 1) {
                list.lastElementChild.remove();
            }
    
            checkListContent(list);
    
            localStorage.removeItem('list');
        }
    }
}
