
//////////////////// UDACITY FEND PROJECT : Memory Game ///////////////////////

////////////////////////
///// GAME SET UP /////
//////////////////////

/**
 * @description: DECK OF CARDS: set deck, cards and number of pairs
 * there are 16 cards in the deck
 * there are a total of 8 pairs to be matched
 */

const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.deck li');

/**
 * @description: Create a list that holds all of your cards
 */

var cardIcons = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa fa-bolt",
  "fa fa fa-cube",
  "fa fa fa-anchor",
  "fa fa fa-leaf",
  "fa fa fa-bicycle",
  "fa fa fa-diamond",
  "fa fa fa-bomb",
  "fa fa fa-leaf",
  "fa fa fa-bomb",
  "fa fa fa-bolt",
  "fa fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube",
];

let matchedCards = 0;
const TOTAL_matchedCards = 8;
let turnedCards = [];

/**
 * @description: TIMER: when the player starts a game, a timer starts.
 * there is a clock set to zero at deck setup
 * once the player wins the game, the timer stops
 * timer is set to zero when the board is refreshed
 */

let clock;
let minutes = 0;
let seconds = 0;
let timerOff = true;


/**
 * @description: MOVE COUNTER: the game displays the current number of moves a user has made.
 */

let moves = 0;
const movesCounter = document.querySelector('.moves');


/**
 * @description: RATING: the game displays a star rating that reflects the player's performance.
 * at the beginning of a game it displays 5 stars
 * after 14 moves it shows 4 stars; after 17 moves, 3 stars; 24 moves, 2 stars;
 * rating is down to 1 after 28 moves
 */

let starCount = 5;
const allStars = document.querySelectorAll('.stars li');

 /**
  * @description: SHUFFLE CARDS: a new deck is set when a new game begins
  * Display the cards on the page
  * shuffle the list of cards using the provided "shuffle" method below
  * loop through each card and create its HTML
  * add each card's HTML to the page
  * General Shuffle function from http://stackoverflow.com/a/2450976
  * Shuffle cards function converts NodeList into an Array,
  * a solution inspired by Matthew Cranford approach
  */

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

shuffleCards();

function shuffleCards() {
  const oldCards = Array.from(document.querySelectorAll('.deck li'));

  const newCards = shuffle(oldCards);
  for (card of newCards) {
    card.classList.remove('open');
    card.classList.remove('show');
    card.classList.remove('match');
    card.classList.remove('unMatched');
    deck.appendChild(card);
  }
}

shuffleCards();

///////////////////////
///// START GAME /////

/**
 * @description: Clock is ticking function: starts the clock and displays the time when a card is clicked
 */
function clockIsTicking() {
  clock = setInterval(function() {
  seconds++;

  if (seconds >= 60) {
  seconds = 0;
  minutes++;
}
  countTime();
}, 1000);
}

function countTime () {
  const timerText = document.querySelector('.timer');
  if (seconds < 10) {
  timerText.innerHTML = `${minutes}:0${seconds}`;
  } else {
  timerText.innerHTML = `${minutes}:${seconds}`;
  }
}

/**
 * @description: a card is clicked: set up the event listener
 * the cards are pushed into Array
 * the clock is turned on
 */

deck.addEventListener('click', function(event) {
  const clickedObject = event.target;

  if (clickedObject.classList.contains('card') &&
    !clickedObject.classList.contains('match') &&
    turnedCards.length < 2 &&
    !turnedCards.includes(clickedObject)) {

    turnCard(clickedObject);
    addTurnedCard(clickedObject);

    if (timerOff) {
      clockIsTicking();
      timerOff = false;
    }
  }

  /**
   * @description: if two cards are turned
   * moves are incremented by one,
   * stars rating is checked
   * match is checked
   */

  if (turnedCards.length === 2) {
    countMoves();
    starsRating();
    checkForMatch();
  }
});

/**
 * @description: turncard function adds classes to the cards
 */

function turnCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

function addTurnedCard(clickedObject) {
  turnedCards.push(clickedObject);
}

/**
 * @description: check for match function:
 * if the list already has another card, check to see if the two cards match
 * if they match, add the class list match to the cards
 * increment count of matched cards
 * the game ends when the total of matched cards is equal to the number of pairs of cards
 */

function checkForMatch() {
  if (
    turnedCards[0].innerHTML === turnedCards[1].innerHTML
  ) {
    console.log('deu match!');

    turnedCards[0].classList.add('match');
    turnedCards[1].classList.add('match');

    turnedCards = [];
    matchedCards++;

    if (matchedCards === TOTAL_matchedCards) {
      endGame();
    }

    /**
     * @description: if the cards do not match, add unMatched class to the cards
     * remove the cards classes, remove them from the array and set timeout for them to turn
     * when they turn back to original position, remove unMatched class
     */
  } else {
    turnedCards[0].classList.add('unMatched');
    turnedCards[1].classList.add('unMatched');
    console.log('deu ruim!');

    setTimeout( function() {

      if (turnedCards.length === 2) {
        turnedCards[0].classList.remove('unMatched');
        turnedCards[1].classList.remove('unMatched');

        turnCard(turnedCards[0]);
        turnCard(turnedCards[1]);

        turnedCards = [];
      }
    }, 600);
  }
}

/**
 * @description: increment the move counter and display move counter on the page
 */

function countMoves() {
  moves++;
  if (moves === 1) {
    movesCounter.innerHTML = `1 movimento`;
  } else {
    movesCounter.innerHTML = `${moves} movimentos`;
  }
}

/**
 * @description: keep count of star rating
 */

function starsRating() {
  if (moves === 14 || moves === 17 || moves === 24 || moves === 28) {
    hideStar();
  }
}

/**
 * @description: function hide star first lists active stars
 * disable last active star
 * updates star count
 */
function hideStar() {
  const allStars = document.querySelectorAll('.stars li:not(.starOut)');
  allStars[allStars.length - 1].classList.add('starOut');
  starCount = allStars.length - 1;
}

/////////////////////////////////////////////////////
///// RESET GAME: prepare board for a new game /////

/**
 * @description: reset game setup
 * pop-up is hidden
 * cards are shuffled
 * matched cards set to zero
 * moves reset to zero
 * time is reset to zero
 * star rating is reset
 */

function showPopUp() {
  const popUp = document.querySelector('.popup_bg');
  popUp.classList.remove('hide');
}

function hidePopUp() {
  const popUp = document.querySelector('.popup_bg');
  popUp.classList.add('hide');
}

shuffleCards();
matchedCards = 0;

function resetCards() {
  for (let card of cards) {
    card.className = 'card';
  }
}

function resetTime() {
  stopClock();
  timerOff = true;
  seconds = 0;
  minutes = 0;
  countTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  const allStars = document.querySelectorAll('.stars li.starOut');
  for (star of allStars) {
    star.classList.remove('starOut');
  }
}

/**
 * @description: refresh game function
 * matched cards set to zero
 * moves reset to zero
 * time is reset to zero
 * cards are shuffled
 * star rating is reset
 */

function refreshGame() {
  matchedCards = 0;
  moves = 0;

  resetTime();
  resetMoves();
  shuffleCards();
  resetCards();
  resetStars();
}

refreshGame();

/**
 * @description: replay game function set matched cards to zero
 * moves are set to zero
 * game is refreshed
 * pop up is closed
 */
function replayGame() {
  matchedCards = 0;
  moves = 0;

  refreshGame();
  hidePopUp();
}

/////////////////////
///// END GAME /////

/**
 * @description: END GAME: the game is over when all matched cards are shown
 * the clock is stoped
 * when a user wins the game, a modal pop-up appears to congratulate the player and ask if they want to play again.
 * it also tells the user how much time it took to win the game, and what the star rating was.
 */

function stopClock() {
  clearInterval(clock);
}

function endGame() {
  stopClock();
  gameResults();
  showPopUp();
}

function getStars() {
  return document.querySelectorAll('.stars li:not(.starOut)').length;
}

function gameResults() {
  const time = document.querySelector('.popup_time');
  const timer = document.querySelector('.timer').innerHTML;
  time.innerHTML = `tempo: ${timer}`;

  const moveCount = document.querySelector('.popup_moves');
  moveCount.innerHTML = `movimentos: ${moves}`;

  const rate = document.querySelector('.popup_score');
  rate.innerHTML = `pontuação: ${starCount} de 5`;
}

/**
 * @description: pop up modal buttons setup
 */

document.querySelector('.restart').addEventListener('click', function(){refreshGame();});
document.querySelector('.popup_new').addEventListener('click', function(){replayGame();});
document.querySelector('.popup_close').addEventListener('click', function(){hidePopUp();});

//////////////////// the end
