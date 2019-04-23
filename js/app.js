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


// let shuffledCards = shuffle(cards);
let shuffledCards = cards; // unshuffled cards for testing purposes

let deck = document.querySelector('.deck');

    
// doesn't work: deck.insertAdjacentHTML('beforeend', '<li class="card open show"><i class="fa $shuffledCards[i]"></i></li>')
for(i = 0; i < 16; i++) {
    deck.insertAdjacentHTML('beforeend', '<li class="card"><i class="fa ' +shuffledCards[i] +'"></i></li>')
}

/* card syntax: 
            <li class="card">
                <i class="fa fa-diamond"></i>
            </li>
*/


// toggle the clicked li-element's "open" and "show" classes ("turn" the card)
// in case card is already matched, do nothing

let openCardCounter = 0;

function clickCard(event) {
    // it's not possible to click an already matched or open card
    if (event.target.nodeName === 'LI'&& !(event.target.classList.contains('match')) && !(event.target.classList.contains('open')) ) {

        openCardCounter += 1;
        // console.log(openCardCounter);
        turnCard(event);
        compareCard(event);

    }
}

// "turn" the card
function turnCard(event) {
    let card = event.target;
    card.classList.toggle('open');
    card.classList.toggle('show');
}

let cardArray = [];
let symbolArray = [];


function compareCard(event) {
    // würde eigentlich in die äußere Funktion gehören...? 
    // when 3rd card is clicked, turn first two cards over again and empty arrays of cards and symbols, then set counter back to 1
    if(openCardCounter == 3) {
        cardArray[0].classList.remove('open');
        cardArray[0].classList.remove('show');
        cardArray[1].classList.remove('open');
        cardArray[1].classList.remove('show');
        cardArray = [];
        symbolArray = [];
        openCardCounter = 1;
    }

    cardArray.push(event.target); // holds the element
    symbolArray.push(event.target.firstElementChild.classList[1])  // holds the name of the symbol class
 
    // check for matching symbols
    if (openCardCounter == 2) {  
        if (symbolArray[0] == symbolArray[1]) {
            // console.log('match!');
            cardArray[0].classList.add('match');
            cardArray[1].classList.add('match');
        } 
    }
}


/*let deck = document.querySelector('.deck');*/ // code already exists above
deck.addEventListener('click', clickCard);


function restart() {

    console.log('restart!');

    /*
    Alle Karten werden wieder umgedreht
    Alle Arrays leeren
    ClckCounter auf Null

    Movecounter auf Null
    Timer auf Null
    Sterne auf Null


    */
}

const restartButton = document.querySelector('.restart');
console.log(restartButton);
restartButton.addEventListener('click', restart);

/* Spielende: 
*   Counter stoppt
* Popup mit Punkten
*
*
*/



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * 
 * 
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 