


/*
Put a function "startGame" here, that
- shuffles and lays out cards
- sets counter and stars to Zero 
?

This could also be called when "restart" is hit

*/ 

/* 
* Deck of cards
*/

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


/* 
* Score panel
*/



// add stars to the panel

let stars = document.querySelector('.stars');
let numberOfStars = 3;

for(i = 0; i < numberOfStars; i++) {
    let newStar = document.createElement("li");
    newStar.classList.add('fa');
    newStar.classList.add('fa-star');
    stars.appendChild(newStar);
}

// increase the counter for every move. 1 Move: turning two cards
function countMoves() {
    numberOfMoves += 1; 
    if(numberOfMoves % 2 == 0) {
        moveCounter.innerHTML = '<span>' + numberOfMoves/2 + ' Moves</span>';
    }

    // decrease the star rating every x moves
    if(numberOfMoves % 2 == 0) {
       removeStar();
    }
}

// remove stars from the panel after certain number of moves (specified in numberOfMoves-function)
// only remove a star if stars has at least two child nodes (stars) left 
function removeStar() {
    // numberOfStars = stars.childNodes.length;
    if (numberOfStars >= 2) { 
    //   console.log('noch genug kinder da');
        numberOfStars -=1;    
        stars.removeChild(stars.firstElementChild);
         
        
    }
}

// Timer

let timer = document.querySelector('.timer');
let timePassed = 0; // time in seconds
let myInterval = window.setInterval(increaseTimer, 1000);


function increaseTimer() {
    timePassed += 1; 
        let min = Math.floor(timePassed/60);
        let sec = timePassed - min*60;

        if(sec<10) {
            timer.innerHTML = min +":0" + sec;
        } else {
            timer.innerHTML = min +":" + sec;
        }
}


// for testing
timer.addEventListener('click', stopTimer);

function stopTimer() {
    clearInterval(myInterval);
}


/*
* Game play
*/ 


let cardArray = [];
let symbolArray = [];

let openCardCounter = 0;

let numberOfMoves = 0;
let moveCounter = document.querySelector('.moves');
// let starNumber = 0;

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
        

        // TODO: Momentan wird das Popup angezeigt, bevor die zweite Karte aufgedeckt wird!
        // vermutlich läuft repaint o.ä. danach. Wann läuft das? Lektionen über Performance..?
              

        if (matchList == 4) { // for testing //if(matchList == cards.length)
            gameEnd(); 
        }


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

        console.log(matchList);
        

        
    } 
}

// when 3rd card is clicked, turn first two cards over again and empty arrays of cards and symbols
// then set open card counter back to 1
function noMatch() {
        cardArray[0].classList.remove('open', 'show');
        cardArray[1].classList.remove('open', 'show');
        
    // TODO: duplicate, put this in an "initialize/reset" function?
        cardArray = [];
        symbolArray = [];
        openCardCounter = 1;
}



/************* 
   Game end
**************/



function gameEnd() {
    // console.log('das spiel ist vorbei');
    let result = window.confirm('Moves: '+ numberOfMoves/2 + ", Star Rating: " + numberOfStars);

    /* 
    timer stoppen
    display a message (popup?) with the final score, time, stars, asking if they want to play again 
    //--> prevent default vom OK button? 
    */

    


}


/*let deck = document.querySelector('.deck');*/ // this code already exists above
deck.addEventListener('click', clickCard);



/* 
* Restart
*/

function restart() {
   
let allCards = deck.querySelectorAll('li.card'); 

    allCards.forEach(function(element) {
        element.classList.remove('open', 'show');
    })

    // shuffle cards!! 

    numberOfMoves = 0;
    moveCounter.innerHTML = '<span>' + numberOfMoves/2 + ' Moves</span>' // duplicate... 


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
 * star rating decreases
 */


 