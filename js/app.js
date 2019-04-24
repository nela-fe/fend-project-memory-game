
let cards = [
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb",
    "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"    
]


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

    
// doesn't work with Template Literal: deck.insertAdjacentHTML('beforeend', '<li class="card open show"><i class="fa $shuffledCards[i]"></i></li>')
// or use append Child?
for(i = 0; i < 16; i++) {
    deck.insertAdjacentHTML('beforeend', '<li class="card"><i class="fa ' +shuffledCards[i] +'"></i></li>')
}

let cardArray = [];
let symbolArray = [];

let openCardCounter = 0;

let numberOfMoves = 0;
let moveCounter = document.querySelector('.moves');

let matchList = 0;

function clickCard(event) {
    // discard click it it's on an already matched or open card
    if (event.target.nodeName === 'LI'
    && !(event.target.classList.contains('match')) 
    && !(event.target.classList.contains('open')) ) {

        openCardCounter += 1;

        countMoves();  // increase visible counter on page
        
        turnCard(event); 

        if(openCardCounter == 3) {
            noMatch();
        }

        cardArray.push(event.target); // holds the element
        // console.log(cardArray);
        symbolArray.push(event.target.firstElementChild.classList[1])  // holds the name of the symbol class
        // console.log(symbolArray);
        
        if (openCardCounter == 2) {
            compareCards(event);
        }

    }
}

// increase the counter
function countMoves() {
    numberOfMoves += 1; 
    moveCounter.innerHTML = '<span>' + numberOfMoves + '</span>';
}

// "turn" the card
function turnCard(event) {
    let card = event.target;
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// check for matching symbols
function compareCards(event) {
        if (symbolArray[0] == symbolArray[1]) {
            cardArray[0].classList.add('match');
            cardArray[1].classList.add('match');

            matchList += 2;

            // console.log(cardArray);
            
            
            console.log(matchList);
            console.log(shuffledCards.length);

            
            //if (matchList == shuffledCards.length) {
                if (matchList == 2) { // for testing

                gameEnd();

            }
            
        } 
}

function noMatch() {
    // console.log(openCardCounter);
    // when 3rd card is clicked, turn first two cards over again and empty arrays of cards and symbols, then set open card counter back to 1
        cardArray[0].classList.remove('open', 'show');
        cardArray[1].classList.remove('open', 'show');
        cardArray = [];
        symbolArray = [];
        openCardCounter = 1;
}

function gameEnd() {
    console.log('das spiel ist vorbei');


// timer stoppen

    /*
    * if all cards have matched, display a message with the final score
    * Popup that displays time, stars, asking if they want to play again 
    * */


}



/*let deck = document.querySelector('.deck');*/ // this code already exists above
deck.addEventListener('click', clickCard);


function restart() {
   
let allCards = deck.querySelectorAll('li.card'); 

    allCards.forEach(function(element) {
        element.classList.remove('open', 'show');
    })

    // duplicate, put this in an "initialize" function?
    cardArray = [];
    symbolArray = [];
    openCardCounter = 0;
    numberOfMoves = 0;
    moveCounter.innerHTML = '<span>' + numberOfMoves + '</span>';
  
    /*
    Timer auf Null
    Sterne auf Null
    */
}

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restart);


/* Ideas

Sterne: 
Append Child, set inner HTML
nach einigen Zügen: remove child

Es gibt einigen Initialisierungscode, der doppelt vorkommt, einmal am Spielanfang, und dann bei Restart: 

let cardArray = [];
let symbolArray = [];

let openCardCounter = 0;

let numberOfMoves = 0;
let moveCounter = document.querySelector('.moves');

let matchList = 0;

Zeit auf Null, Sterne auf Null 

Diesen in eine Funktion auslagern 


Wie geht:
- Timer (setTimeout?)?
- Popups anzeigen?

*/


/* TODO: 

 * if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 * Popup that displays time, stars, asking if they want to play again 
 * timer
 * star rating decreases

 */




/* DONE: 

 * Create a list that holds all of your cards
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * 
 *  toggle the clicked li-element's "open" and "show" classes ("turn" the card)
 *  in case card is already matched, do nothing
 * 
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *   
 */


 