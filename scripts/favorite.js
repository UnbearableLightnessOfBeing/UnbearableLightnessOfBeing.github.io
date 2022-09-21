

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

    list.addEventListener('click', function(e) {
        if(e.target.matches('.visible')) {
            let text = e.target.nextElementSibling;
            if(text.style.height == 'fit-content') {
                text.style.height = '0';
            }else {
                text.style.height = 'fit-content';
            }
        }
    });

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

    quoteItem.appendChild(visible);
    quoteItem.appendChild(paragraph);

    let visibleItem1 = document.createElement('h3');
    visibleItem1.innerText = category;
    let visibleItem2 = document.createElement('h3');
    visibleItem2.innerText = author;

    visible.appendChild(visibleItem1);
    visible.appendChild(visibleItem2);

    list.appendChild(quoteItem);
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

export function chekListContent(list) {

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
