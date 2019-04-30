
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

/* shuffle cards */

// let shuffledCards = shuffle(cards);
let shuffledCards = cards; // unshuffled cards for testing purposes

let deck = document.querySelector('.deck');


/* add cards */

// doesn't work with Template Literal: deck.insertAdjacentHTML('beforeend', '<li class="card open show"><i class="fa $shuffledCards[i]"></i></li>')
// or use append Child?
for(i = 0; i < 16; i++) {
    deck.insertAdjacentHTML('beforeend', '<li class="card"><i class="fa ' +shuffledCards[i] +'"></i></li>');
}


// add stars to the panel

let stars = document.querySelector('.stars');

for(i = 0; i <= 7; i++) {
    let newStar = document.createElement("li");
    newStar.classList.add('fa');
    newStar.classList.add('fa-star');
    stars.appendChild(newStar);
}


/*

let myInterval = window.setInterval(removeStar, 2000);
    


}

function stopInterval() {
    clearInterval(myInterval);
}
    
let myTimeOut = window.setTimeout(stopInterval, 3000);

*/




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


        // removeStar(); // called by countMoves
        
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



// increase the counter for every move. 1 Move: turning two cards
function countMoves() {
    numberOfMoves += 1; 
    if(numberOfMoves % 2 == 0) {

        moveCounter.innerHTML = '<span>' + numberOfMoves/2 + ' Moves</span>';
    }

    // decrease the star rating every x moves
    if(numberOfMoves % 6 == 0) {
       removeStar();
    }
}

// remove stars from the panel after certain number of moves (specified in numberOfMoves() )
function removeStar() {
        if(stars.firstElementChild) {
            // console.log(stars.firstElementChild);
            stars.removeChild(stars.firstElementChild);
        }

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
        
        // TODO: Momentan wird das Popup angezeigt, bevor die zweite Karte aufgedeckt wird!
        // vermutlich läuft repaint o.ä. danach. Wann läuft das? Lektionen über Performance..?
        //if (matchList == shuffledCards.length) {
       
        /*
        if (matchList == 2) { // for testing
            gameEnd(); // or better call this from clickCard??
        }
        */
    } 
}

function noMatch() {
    // console.log(openCardCounter);
    // when 3rd card is clicked, turn first two cards over again and empty arrays of cards and symbols, then set open card counter back to 1

        cardArray[0].classList.remove('open', 'show');
        cardArray[1].classList.remove('open', 'show');
        

    // TODO: duplicate, put this in an "initialize/reset" function?
        cardArray = [];
        symbolArray = [];
        openCardCounter = 1;


}

function gameEnd() {
    console.log('das spiel ist vorbei');
    let result = window.confirm('hallo, deine Punkte sind, deine Zeit war');

    /* 
    timer stoppen
    display a message (popup?) with the final score, time, stars, asking if they want to play again 
    */


    


}



/*let deck = document.querySelector('.deck');*/ // this code already exists above
deck.addEventListener('click', clickCard);


function restart() {
   
let allCards = deck.querySelectorAll('li.card'); 

    allCards.forEach(function(element) {
        element.classList.remove('open', 'show');
    })

    numberOfMoves = 0;
    moveCounter.innerHTML = '<span>' + numberOfMoves + '</span>';


    // TODO: duplicate, put this in an "initialize/reset" function?
    cardArray = [];
    symbolArray = [];
    openCardCounter = 0;
   
  
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

Diesen in eine Funktion auslagern?
NEin: Hier werden die Variablen initialisiert, später werden sie nur geleert!


Wie geht:
- Timer (setTimeout?)? --> siehe Lektion unter Performance!
- Popups anzeigen?

Do I need the click counter? use cardArray instead?

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


 