
//adding categories to the DOM tree

export function getCategoriesFromSource(source) {
    return new Promise((resolve, reject) => {
        fetch(source)
        .then(response => response.text())
        .then(text => {
            resolve(text.split('\r\n'));
        })
        .catch(error => reject(error));
    })
}


export function getCategory(selector) {
    return selector.value;
};


export function insertCategories(selector, categories) {
    
    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.innerText = category;
        selector.appendChild(option);
    });
};

// export default {getCategoriesFromSource, getCategory, insertCategories};