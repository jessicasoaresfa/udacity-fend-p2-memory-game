
# Memory Game Project
Memory Game project for Udacity's  Front-End Web Developer Nanodegree program.

## Table of contents
 - [Game Logic](#game-logic)
	 - [deck of cards](#deck-of-cards-set-deck-cards-and-number-of-pairs)
	 - [timer](#timer-when-the-player-starts-a-game-a-timer-starts)
	 - [move counter](#move-counter)
	 - [rating] (#rating-the-game-displays-a-star-rating-that-reflects-the-players-performance)
	 - [shuffle cards] (#shuffle-cards-a-new-deck-is-set-when-a-new-game-begins)
 - [Gameplay](#gameplay)
	 - [start game] (#start-game-starts-the-clock-and-displays-the-time-when-a-card-is-clicked)
	 - [end game] (#end-game-the-game-is-over-when-all-matched-cards-are-shown)

### GAME LOGIC

#### DECK OF CARDS: set deck, cards and number of pairs
- there are 16 cards in the deck
- when the game starts, there are no matched cards
- there are a total of 8 pairs to be matched


#### TIMER: when the player starts a game, a timer starts.
- there is a clock set to zero at deck setup
- once the player wins the game, the timer stops
- timer is set to zero when the board is refreshed


#### MOVE COUNTER
- the game displays the current number of moves a user has made

#### RATING: the game displays a star rating that reflects the player's performance.
- at the beginning of a game it displays 5 stars.
- after 14 moves it shows 4 stars; after 17 moves, 3 stars; 24 moves, 2 stars; and it's down to 1 after 28 moves


#### SHUFFLE CARDS: a new deck is set when a new game begins
- display the cards on the page
- shuffle the list of cards using the provided "shuffle" method below
- loop through each card and create its HTML
- add each card's HTML to the page

### GAMEPLAY

#### START GAME: starts the clock and displays the time when a card is clicked
- when clicked, the card shows an image
- if two images match, they stay open
- when the cards don't match, they are turned

#### END GAME: the game is over when all matched cards are shown
- when a user wins the game, a modal pop-up appears to congratulate the player and ask if they want to play again.
- it also tells the user how much time it took to win the game, and what the star rating was.
