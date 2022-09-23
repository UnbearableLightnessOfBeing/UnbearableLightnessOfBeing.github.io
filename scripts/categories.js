//adding categories as options(<option>) for selector (<select>)

export function getCategoriesFromSource(source) {
    return new Promise((resolve, reject) => {
        fetch(source)
        .then(response => response.text())
        .then(data => resolve(JSON.parse(data)))
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
