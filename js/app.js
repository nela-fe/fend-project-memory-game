
let clickCounter = 0; // this is for counting moves (one move = turning over two cards)

/* 
* Deck of cards
*/

let cards = [
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
    'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'    
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
let shuffledCards = shuffle(cards);
// let shuffledCards = cards; // unshuffled cards for testing purposes

let deck = document.querySelector('.deck');


/* add cards */

// doesn't work with Template Literal, why? 
// or use append Child?
for(i = 0; i < 16; i++) {
    deck.insertAdjacentHTML('beforeend', '<li class="card show"><i class="fa ' +shuffledCards[i] +'"></i></li>');
    // deck.insertAdjacentHTML('beforeend', '<li class="card open show"><i class="fa $shuffledCards[i]"></i></li>');
}


/* 
* Score panel
*/


// Counter //

let moveCounter = document.querySelector('.moves');

let numberOfMoves = 0;

// increase the counter for every move. 1 Move: turning two cards
function countMoves() {
    moveCounter.innerHTML = '<span>' + numberOfMoves + ' Moves</span>';
}


// Stars //

let stars = document.querySelector('.stars');
const numberOfStars = 5;
let remainingStars = numberOfStars;

let starRatingChange = 3;

// add stars to the panel --> TODO: put this in a function to be called by restart
for(i = 0; i < numberOfStars; i++) {
    let newStar = document.createElement('li');
    newStar.classList.add('fa');
    newStar.classList.add('fa-star');
    stars.appendChild(newStar);
}

// remove stars from the panel after certain number of moves (specified in starRatingChange)
// only remove a star if stars has at least two child nodes (stars) left 
function removeStar() {
    console.log(remainingStars);
    if (remainingStars >= 2) { 
        remainingStars -=1;  
        console.log(remainingStars);  
        stars.removeChild(stars.firstElementChild);
    }
}


// Timer //

let timer = document.querySelector('.timer');

let timePassed = 0; // time in seconds
let timePassedMinSec = 0;

let myInterval = window.setInterval;

function startTimer() {
    myInterval = window.setInterval(increaseTimer, 1000);
}

function stopTimer() {
    clearInterval(myInterval);
}

function increaseTimer() {
    timePassed += 1; 
        let min = Math.floor(timePassed/60);
        let sec = timePassed - min*60;         

        if(sec<10) {
            timePassedMinSec = min +':0' + sec;
        } else {
            timePassedMinSec = min +':' + sec;
        }

        timer.innerHTML = timePassedMinSec;
}
// for testing
timer.addEventListener('click', stopTimer);



/************************
*      Game play
*************************/ 

let cardArray = []; // holds the elements that were clicked
let symbolArray = []; // holds the names of the symbol classes of clicked cards for comparing two cards
let openCardCounter = 0; // number of cards that are currently open
let matchList = 0; // number of cards that have already been matched


function clickCard(event) {
    // discard clicks on already matched or open cards
    if (event.target.nodeName === 'LI'
    && !(event.target.classList.contains("match")) 
    && !(event.target.classList.contains("open")) ) {

        clickCounter += 1; 

        if(clickCounter == 1) {
            startTimer();
        }


        //increase numberOfMoves every second click (one move = turning two cards=)
        if(clickCounter % 2 == 0) {
           numberOfMoves = clickCounter/2;
           countMoves();  // increase visible counter on page

            //TODO: think about other values, maybe first decrese after player has seen 16 cards
            // decrease the star rating every x moves
            /*
            if(numberOfMoves > 0 && numberOfMoves % starRatingChange == 0) {
                removeStar();
            }
            */
           if(numberOfMoves > 12 && numberOfMoves % 2 == 0) {
            removeStar();
            }

        }

        openCardCounter += 1; // that many cards are turned over right now
        //  turnCard(event); // hier?

        // if this is the 3rd card that would be turned over (which is only possible if the first two were not a match):  
        // turn first two cards over again
        if(openCardCounter == 3) {
            noMatch();
        }

        turnCard(event); // show the hidden side of the card

        // if it's the 1st or 2nd card that has been clicked, push the event targets and symbols in arrays
        // (if it had been the 3rd card, it will now be the 1st, as the arrays and counter have been reset 
        // by function "noMatch"!)
        cardArray.push(event.target); 
        symbolArray.push(event.target.firstElementChild.classList[1])  

        // if two cards are open, compare them 
        if (openCardCounter == 2) {
            compareCards(event);
        }       
        
        // if (matchList == 4) { // for testing 
        if(matchList == cards.length) {
            gameEnd(); 
        }
        
    }
}


// "turn" the card
function turnCard(event) {
    let card = event.target;
    card.classList.toggle("open");
    // card.classList.toggle("show");
}

// check for matching symbols
function compareCards(event) {
    if (symbolArray[0] == symbolArray[1]) {
        cardArray[0].classList.add('match');
        cardArray[1].classList.add('match');

        matchList += 2;
        // console.log(matchList);
    } 
}

// when 3rd card is clicked, turn first two cards over again and empty arrays of cards and symbols
// then set open card counter back to 1
function noMatch() {
    cardArray[0].classList.remove('open'); // for testing
    cardArray[1].classList.remove('open'); // for testing

    // cardArray[0].classList.remove('open', 'show');
    // cardArray[1].classList.remove('open', 'show');
    
// TODO: duplicate, put this in an "initialize/reset" function?
    cardArray = [];
    symbolArray = [];
    openCardCounter = 1;
}


deck.addEventListener('click', clickCard);



/*******************
*     Game end     *
********************/

function gameEnd() {
    stopTimer();

    // only do this when "Cancel" is clicked!
    deck.removeEventListener('click', clickCard);   
   
    // without the Timeout function the window appears before the card is turned. 
    //TODO: write this nicer and shorter
    setTimeout(function showResultWindow() {
        let result = window.confirm('Moves: '+ numberOfMoves/2 + ', Star Rating: ' 
        + numberOfStars + ' Time: ' + timePassedMinSec + ' - Do you want to play again?');
        if (result == true) {
            deck.addEventListener('click', clickCard); 
            restart();
        }

    }, 200);
   
}


//TODO: Invoke when all cards are matched

const gameEndButton = document.querySelector('.gameEndTest'); // for testing. 
gameEndButton.addEventListener('click', gameEnd);




/*******************
*     Restart      *
********************/

// a lot of this is duplicate and could go into an initialize function

function restart() {
    // Cards
    console.log('game has been restarted');

    // remove existing cards 
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    // shuffle and lay out new cards (duplicate)
    shuffledCards = shuffle(cards);
    for(i = 0; i < 16; i++) {
        deck.insertAdjacentHTML('beforeend', '<li class="card show"><i class="fa ' +shuffledCards[i] +'"></i></li>');
    }
    
    cardArray = []; 
    symbolArray = []; 
    openCardCounter = 0; 
    matchList = 0; 

    // Counter 
    clickCounter = 0;
    numberOfMoves = 0;
    moveCounter.innerHTML = '<span>' + numberOfMoves + ' Moves</span>' //duplicate


    // Stars
    
    // remove old stars
    while (stars.firstChild) {
        stars.removeChild(stars.firstChild);
    }

    // add new stars
    for(i = 0; i < numberOfStars; i++) {
        let newStar = document.createElement('li');
        newStar.classList.add('fa');
        newStar.classList.add('fa-star');
        stars.appendChild(newStar);
    }

    // Timer
    stopTimer()
    // console.log('stop timer');
    timePassed = 0; // time in seconds
    timePassedMinSec = 0;
    timer.innerHTML = '0:00';
}


const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restart);



/* TODO: 

Make code nicer
- put all initializing code in a function (that is invoked without a trigger), so I can re-use it for restart
- declare ALL Variables at the beginning instead of where they are used the first time..? 
- use function expressions where code is only needed once
------
- add animations
- make site more responsive
- nicer popup
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
 * display a message (popup?) with the final score, time, stars, asking if they want to play again
 * - if button "play again?" ok --> Restart
 * - winning condition - wenn alle Karten gematcht sind --> Spielende (if all cards have matched, display a message 
    with the final score (put this functionality in another function that you call from this one))
    - warum wird das Fenster gezeigt, bevor die letzte Karte umgedreht wird? Repaint..? Ok with timer
    ((Do I need the click counter? use cardArray instead?)) - needed for counting moves
 * 
 */


 