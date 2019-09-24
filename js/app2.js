
////////////////////* UDACITY FEND PROJECT : Memory Game *///////////////////////

////////////////////////
///// GAME SET UP /////

// DECK OF CARDS: set deck, cards and number of pairs
// there are 16 cards in the deck
// when the game starts, there are no matched cards
// there are a total of 8 pairs to be matched

const deck = document.querySelector ('.deck');
const cards = document.querySelectorAll ('.deck li');

/* Create a list that holds all of your cards */
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

///// TIMER: when the player starts a game, a timer starts.
// there is a clock set to zero at deck setup
// once the player wins the game, the timer stops
// timer is set to zero when the board is refreshed

let clock;
let time = 0;
let timerOff = true;

///// MOVE COUNTER: the game displays the current number of moves a user has made.

let moves = 0;
const movesCounter = document.querySelector('.moves');

///// RATING: the game displays a star rating that reflects the player's performance.
// at the beginning of a game it displays 5 stars.
// after 14 moves it shows 4 stars; after 17 moves, 3 stars; 24 moves, 2 stars; and it's down to 1 after 28 moves

let starCount = 5;
const allStars = document.querySelectorAll('.stars li');

///// END GAME: the game is over when all matched cards are shown
// when a user wins the game, a modal pop-up appears to congratulate the player and ask if they want to play again.
// it also tells the user how much time it took to win the game, and what the star rating was.


///// SHUFFLE CARDS: a new deck is set when a new game begins
// Display the cards on the page
// shuffle the list of cards using the provided "shuffle" method below
// loop through each card and create its HTML
// add each card's HTML to the page

/* Shuffle function from http://stackoverflow.com/a/2450976 */

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
// convert NodeList to an Array
// solution inspired
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

// starts the clock and displays the time when a card is clicked

function clockIsTicking() {
  clock = setInterval (() => {
    time++;
    countTime();
  }, 1000);
}

function countTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timerText = document.querySelector('.timer');
    timerText.innerHTML = time;

        if (seconds < 10) {
            timerText.innerHTML = `${minutes}:0${seconds}`;
            } else {
            timerText.innerHTML = `${minutes}:${seconds}`;
            }
      }

// a card is clicked: set up the event listener

deck.addEventListener ('click', event => {
    const clickedObject = event.target;

          if (clickedObject.classList.contains('card')&&
          !clickedObject.classList.contains('match')&&
          turnedCards.length < 2 &&
          !turnedCards.includes(clickedObject)) {

            // push cards into Array
            turnCard(clickedObject);
            addTurnedCard(clickedObject);

            // start clock
              if (timerOff) {
              clockIsTicking();
              timerOff = false;
            }
        }
              if (turnedCards.length === 2) {
                countMoves();
                checkForMatch();
                starsRating()
                }
});

// add classes to the active cards

function turnCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addTurnedCard(clickedObject) {
  turnedCards.push(clickedObject);
  console.log(turnedCards);
}

// if the list already has another card, check to see if the two cards match

function checkForMatch () {

  // if they match, add the class list match to the cards
  if (
    turnedCards[0].innerHTML === turnedCards[1].innerHTML
  ) {
    console.log('deu match!');

    turnedCards[0].classList.add('match');
    turnedCards[1].classList.add('match');

    turnedCards = [];

  // increment count
    matchedCards++;

  // the game ends when the total of matched cards is equal to the number of pairs of cards
    if (matchedCards === TOTAL_matchedCards) {

      endGame();

    }

    // if the cards do not match, add unMatched class to the cards

    } else {
      turnedCards[0].classList.add('unMatched');
      turnedCards[1].classList.add('unMatched');

      console.log('deu ruim!');

    // remove the cards classes, remove them from the array and set timeout

    setTimeout (() => {
      turnedCards[0].classList.remove('unMatched');
      turnedCards[1].classList.remove('unMatched');

      turnCard(turnedCards[0]);
      turnCard(turnedCards[1]);

      turnedCards = [];

    }, 600);
  }
}

// increment the move counter and display move counter on the page
function countMoves() {
  moves++;
  if (moves === 1) {
    movesCounter.innerHTML = `1 movimento`;
  } else {
    movesCounter.innerHTML = `${moves} movimentos`;
  }
}
// keep count of star rating

function starsRating() {
  if (moves === 14 || moves === 17 || moves === 24 || moves === 28
  ) {     hideStar();
    }
}

function hideStar() {
  const allStars = document.querySelectorAll('.stars li');
  for (star of allStars) {
    star[0].classList.add('starOut');
    star[1].classList.add('starOut');
    star[2].classList.add('starOut');
    star[3].classList.add('starOut');
    }
}
// if all cards have matched, end game

/////////////////////////////////////////////////////
///// RESET GAME: prepare board for a new game /////

// reset pop-up
function togglePopUp() {
  const popUp = document.querySelector('.popup_bg');
  popUp.classList.toggle('hide');
}

shuffleCards();

matchedCards = 0;
moves = 0;

// reset clock and time
function resetTime () {
stopClock();
timerOff = true;
time = 0;
countTime();
}

// reset moves
function resetMoves() {
moves = 0;
document.querySelector('.moves').innerHTML = moves;
}

// reset stars rating
function resetStars() {
  const allStars = document.querySelectorAll('.stars li');
  for (star of allStars) {
    star.classList.remove('starOut');
    }
}

// reset cards
function resetCards () {
for (let card of cards) {
  card.className = 'card';
}
}

function refreshGame () {
      matchedCards = 0;
      moves = 0;

      resetTime();
      resetMoves();
      shuffleCards();
      resetCards();
}

refreshGame();

/* buttons set up */
document.querySelector('.restart').addEventListener('click', () => {refreshGame()});

// REPLAY GAME //
function replayGame () {
  matchedCards = 0;
  moves = 0;

  refreshGame();
  togglePopUp();
}

/* buttons set up */
document.querySelector('.popup_novo').addEventListener('click', () => {replayGame()});

/////////////////////
///// END GAME /////

// end-game: stop clock

function stopClock() {
      clearInterval(clock);
      }

function endGame() {
         stopClock();
         gameResults();
         togglePopUp();
      }

// POP UP: display a message with the final score

/* content for the modal */

function getStars() {
  const allStars = document.querySelectorAll('.stars li');
  starCount = 5;
  for (star of stars) {
    if (star.classList.innerHTML ="starOut") {
      starCount--;
    }
  }
}

function gameResults () {
  const time = document.querySelector('.popup_tempo');
  const timer = document.querySelector('.timer').innerHTML;
  const moveCount = document.querySelector('.popup_movimentos');
  const rate = document.querySelector('.popup_pontos');

  time.innerHTML = `tempo: ${timer}`;
  moveCount.innerHTML = `movimentos: ${moves}`;
  rate.innerHTML = `pontuação: ${starCount} de 5`;
}

/* buttons set up */
document.querySelector('.popup_fechar').addEventListener('click', () => {togglePopUp()});

//////////////////// the end
