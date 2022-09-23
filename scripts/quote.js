
// fetching a quote

export function getQuote(category = '') {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/quotes?category=' + (category == 'none' ? '' : category),
            headers: { 'X-Api-Key': 'Or4HODj5TcB4cbOt00k6UA==53xijEHXB3z7Up8h'},
            contentType: 'application/json',
            success: function(result) {
                resolve(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
                reject(jqXHR);
            }
        });
    });  
}

export function placeContentIntoElement(element, content) {
    element.innerHTML = content;
}