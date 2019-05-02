//////////////////////////
//    Deck of cards     //
//////////////////////////

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



const deck = document.querySelector('.deck');


deck.addEventListener('click', clickCard);


function initializeCards() {

   // TODO: add cards to document fragment instead of directly to the DOM

    // shuffle cards //
    let shuffledCards = shuffle(cards);
    // let shuffledCards = cards; // unshuffled cards for testing purposes

    // add cards to deck // // TODO: better use append Child?
     for(i = 0; i < 16; i++) {
    // deck.insertAdjacentHTML('beforeend', '<li class="card"><i class="fa ' +shuffledCards[i] +'"></i></li>');
    
    // for testing use this line, also change lines in "thirdCard()", "turnCard()" and "restart()"
    deck.insertAdjacentHTML('beforeend', '<li class="card show"><i class="fa ' +shuffledCards[i] +'"></i></li>'); 
    }
}

initializeCards()




///////////////////////
//    Score panel    //
///////////////////////


// Stars //

const stars = document.querySelector('.stars');
const maxNumberOfStars = 5;

let remainingStars

function initializeStars() {
    remainingStars = maxNumberOfStars;
    
    // if there already are stars (if function is called by restart) remove them
    while (stars.firstChild) {
        stars.removeChild(stars.firstChild);
    }

    // add stars to the panel
    for(i = 0; i < maxNumberOfStars; i++) {
        let newStar = document.createElement('li');
        newStar.classList.add('fa');
        newStar.classList.add('fa-star');
        stars.appendChild(newStar);
    }
}

initializeStars();


// remove stars from the panel after certain number of moves
// only remove a star if stars has at least two child nodes (stars) left 
function removeStar() {
    if (remainingStars >= 2) { 
        remainingStars -=1;  
        stars.removeChild(stars.firstElementChild);
    }
}



// Move Counter //

const moveCounter = document.querySelector('.moves');

let clickCounter; // counts valid clicks on cards
let numberOfMoves // counts moves (one move = two clicks, turning over two cards)

function initializeMoveCounter() {
    clickCounter = 0;
    numberOfMoves = 0;
    countMoves();
}

initializeMoveCounter()

// increase the counter for every move
function countMoves() {
    numberOfMoves = clickCounter/2;
    moveCounter.innerHTML = '<span>' + numberOfMoves + ' Moves</span>';
}



// Timer //

const timer = document.querySelector('.timer');

let timePassed; // time in seconds
let timePassedMinSec; // time in format mm:ss 

let myInterval = window.setInterval;

function initializeTimer() {
    timePassed = 0;
    timePassedMinSec = '0:00';
    timer.innerHTML = timePassedMinSec;
}

initializeTimer()


function startTimer() {
    myInterval = window.setInterval(increaseTimer, 1000);
}

function stopTimer() {
    clearInterval(myInterval);
}

let min;
let sec; 

function increaseTimer() {
    timePassed += 1; 
    min = Math.floor(timePassed/60);
    sec = timePassed - min*60;         

    if(sec<10) {
        timePassedMinSec = min +':0' + sec; // leading zero for seconds 0 - 9
    } else {
        timePassedMinSec = min +':' + sec; // no leading zero for seconds 10 - 59
    }

    timer.innerHTML = timePassedMinSec;
}
// for testing
timer.addEventListener('click', stopTimer);




///////////////////////
//      Restart      //
///////////////////////


function restart() {
   
    // Cards

    // TODO: only add it if it doesn't already exist
    deck.removeEventListener('click', clickCard); 
    deck.addEventListener('click', clickCard); 


    cardArray = []; 
    symbolArray = []; 
    openCardCounter = 0; 
    matchList = 0; 

    // remove existing cards 
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    // shuffle and lay out cards
    initializeCards()
    
    // Move Counter 
    initializeMoveCounter()

    // Stars
    initializeStars();

    // Timer
    stopTimer()
    initializeTimer();

}


const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restart);





///////////////////////////
//      GAME PLAY        //
///////////////////////////


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

        //increase moveCounter every second click (one move = turning two cards)
        if(clickCounter % 2 == 0) {
           countMoves(); 

            // remove stars after 12 moves and then again very two moves
            // if(numberOfMoves > 0) { // for testing
            if(numberOfMoves >= 12 && numberOfMoves % 2 == 0) {
                removeStar();
            }
        }


        turnCard(event); // show the hidden side of the card

        openCardCounter += 1; // that many cards are turned over right now


        // if this is the 3rd card that has been clicked, turn first two cards over again and set openCardCounter to one
        if(openCardCounter == 3) {
            thirdCard();
            openCardCounter = 1;

        }

        // if it is the 1st or 2nd card that has been clicked, push the event targets and symbols in arrays
        // (if it had been the 3rd card, it will now be the 1st, as the arrays and counter have been reset 
        cardArray.push(event.target); 
        symbolArray.push(event.target.firstElementChild.classList[1])  

        // if two cards are open, compare them 
        if (openCardCounter == 2) {
            compareCards(event);
        }       
        
        // if all cards have been matched, end the game
        // if (matchList == 4) { // for testing 
        if(matchList == cards.length) {
            gameEnd(); 
        }
        // console.log(openCardCounter); // wo wird der denn bei nem Match wieder auf Null gesetzt???

    }
}


// "turn" the card
function turnCard(event) {
    let card = event.target;
    card.classList.toggle("open");
    // card.classList.toggle("show"); // comment out for testing 
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
// (TODO: This should only happen if first two cards were not a match)
function thirdCard() {
    cardArray[0].classList.remove('open'); // for testing
    cardArray[1].classList.remove('open'); // for testing
    // cardArray[0].classList.remove('open', 'show');
    // cardArray[1].classList.remove('open', 'show');

    cardArray = [];
    symbolArray = [];
    // openCardCounter = 1;
}


// deck.addEventListener('click', clickCard);



/////////////////////////
//      Game end       //
/////////////////////////

function gameEnd() {
    stopTimer();

    // TODO: only remove when "Cancel" is clicked!
    // deck.removeEventListener('click', clickCard);   
   
    // without the Timeout function the window appears before the card is turned. 
    //TODO: write this nicer and shorter
    setTimeout(function showResultWindow() {
        let result = window.confirm('Moves: '+ numberOfMoves + ', Star Rating: ' 
        + remainingStars + ' Time: ' + timePassedMinSec + ' - Do you want to play again?');
        if (result == true) {
            // deck.addEventListener('click', clickCard); 
            restart();
        } else {
            deck.removeEventListener('click', clickCard); 
        }

    }, 200);
   
}

const gameEndButton = document.querySelector('.gameEndTest'); // for testing. 
gameEndButton.addEventListener('click', gameEnd);




/*
TODO: add cards to document fragment instead of directly to the DOM
TODO: use function expressions where code is only needed once
------
TODO: nicer popup
TODO: make site more responsive
TODO: add animations
 */
