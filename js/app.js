/*
 * Create a list that holds all of your cards
 */


let cards = [
    "fa-diamond", 
    "fa-diamond", 
    "fa-paper-plane-o", 
    "fa-paper-plane-o", 
    "fa-anchor", 
    "fa-anchor", 
    "fa-bolt", 
    "fa-bolt", 
    "fa-cube", 
    "fa-cube", 
    "fa-leaf", 
    "fa-leaf", 
    "fa-bicycle", 
    "fa-bicycle", 
    "fa-bomb", 
    "fa-bomb", 
]



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let shuffledCards = shuffle(cards);
// console.log(shuffledCards);

let deck = document.querySelector('.deck');

/* 
why doesn't this work: 
deck.insertAdjacentHTML('beforeend', '<li class="card open show"><i class="fa $shuffledCards[i]"></i></li>')  
OR: add li element, then add i element (appendChild?) ?
" *   - loop through each card and create its HTML
 *   - add each card's HTML to the page" ...
*/
    
for(i = 0; i < 16; i++) {
    deck.insertAdjacentHTML('beforeend', '<li class="card open show"><i class="fa ' +shuffledCards[i] +'"></i></li>')
}

/* card syntax: 
            <li class="card">
                <i class="fa fa-diamond"></i>
            </li>
*/


// toggle the clicked li-element's "open" and "show" classes ("turn" the card)
// in case card is already matched, do nothing
// TODO: es soll auch nichts passieren, wenn man auf die gleiche Karte 2x klickt...

function turnCard(event) {
    if (event.target.nodeName === 'LI' && !(event.target.classList.contains('match'))) {  
        
        
        let card1 = event.target;

        // oder aus dieser funktion heraus jetzt 1) die Umdrehoptik und 2. das Matchen aufrufen?
        
        card1.classList.toggle('open');
        card1.classList.toggle('show');

    }
}

// TODO: schauen, ob bereits eine Karte angeklickt wurde
// Moment mal, die Cards SIND doch open, wieso wird der Code ausgeführt... ?

//let cards = []; 
let cardArray = [];

function compareCard(event) {
    if (event.target.nodeName === 'LI' && !(event.target.classList.contains('match')) && !(event.target.classList.contains('open'))  ) {

        console.log(cardArray.length);

        if (cardArray.length < 2) {
            let card = event.target;
            let cardSymbol = card.firstElementChild.classList[1];
    
            cardArray.push(cardSymbol);
            console.log(cardArray);
            }

       console.log(cardArray.length);
        }

       
        if (cardArray.length == 2) {  
            if (cardArray[0] == cardArray[1]) {
                console.log('match!');
                }
            }
            

}



/*let deck = document.querySelector('.deck');*/ // code already exists above
deck.addEventListener('click', turnCard);

deck.addEventListener('click', compareCard);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 * 
 * 
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
