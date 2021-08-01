// 'this' is used to represent the variables in a more object orientated way
// By using the class it creates a structure for the variables 

class AtomicMemory {
  
  // totalTime, cards are parameteres for the constructor
  
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining')
    this.ticker = document.getElementById('moves');
  }
 
   // This function starts the game 
  // calls on the variables that initiate the timer and the moves counter
 
  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;

    // By setting a Timeout it creates a breathing space for all that needs to be loaded

    setTimeout(() => {
      this.shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 500)
    // Once a new game is started it resets 
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }
  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0)
        this.gameOver();
    }, 1000);
  }
  gameOver() {
    // When the game Over happens it shows the Game over overlay
    // Resets the counter 
    clearInterval(this.countdown);
    document.getElementById('game-over-text').classList.add('visible');
  }
  victory() {
    // victory function added for when the user is wins the game
    //Clears the countdown timer and shows victory text 
    clearInterval(this.countdown);
    document.getElementById('victory-text').classList.add('visible');
  }
  hideCards() {
    this.cardsArray.forEach(card => {
      card.classList.remove('visible');
    });
  }

  //This function enables the user to flip the cards,
  // Together with CSS, classList.add('visible'), that allows the card to turn 180 degrees
  // And therefore show the other face of the card

  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add('visible');

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }
  // Function checks for a card to match by matching two values

  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else
      this.cardMismatch(card, this.cardToCheck);

    this.cardToCheck = null;
  } // This function checks to see if all cards in the array are matched 
  // It calls the victory function which then displays the victory Text
  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    if (this.matchedCards.length === this.cardsArray.length)
      this.victory();
  }
    // This function compares the cards and if no match is found 
    // It returns them to their back faces
    // With setTimeOut it allows the user to have time to see the cards before flipping back around
    // By adding busy = true it means that two cards are turned
    // After setTimeout it's used busy = false to return that 2 new cards can now be clicked
    
  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove('visible');
      card2.classList.remove('visible');
      this.busy = false;
    }, 1000);
  }
  shuffleCards(cardsArray) {

    // Fisher-Yates Shuffle Algorithm is used here for the shuffling method

    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[randIndex].style.order = i;
      cardsArray[i].style.order = randIndex;
    }
  }
  // Returns the HTML value for the front of the card
  getCardType(card) {
    return card.getElementsByClassName('card-value')[0].src;
  }

  // Doesn't allow more than 2 cards to be clicked at once
  // Or when the an image is playing

  canFlipCard(card) {
    return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
  }
}
// Waits for the content to finish loading before executing

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

// Event though overlay is not an Array, by using the Array.from it 
//creates an array of the overlays in the HTML page

function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  let cards = Array.from(document.getElementsByClassName('card'));
  let game = new AtomicMemory(100, cards);

  // Used a forEach to be able to click on the overlays
  // and using a classList.Remove and EventListener to be able to make it visible and clickable by the user

  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      game.startGame();
    });
  });

  // forEach used to target the card

  cards.forEach(card => {
    card.addEventListener('click', () => {
      game.flipCard(card);
    });
  });
}