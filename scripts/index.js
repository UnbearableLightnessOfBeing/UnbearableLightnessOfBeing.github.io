//Or4HODj5TcB4cbOt00k6UA==53xijEHXB3z7Up8h

let category = 'happiness'

async function getQuote() {
    let data;
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': 'Or4HODj5TcB4cbOt00k6UA==53xijEHXB3z7Up8h'},
        contentType: 'application/json',
        success: function(result) {
            placeContent(result);
            
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function placeContent(data) {
    let quote = data[0].quote;
    let author = data[0].author;

    let textArea = document.querySelector('.text');
    let authorArea = document.querySelector('.author');

    textArea.innerText = 'Quote: ' + quote;
    authorArea.innerText = 'Author: ' + author;
}

getQuote();

document.querySelector('#generator').addEventListener('click', () => {
    getQuote();
});

