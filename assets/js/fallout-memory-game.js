
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
            if(this.timeRemaining === 0)
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
            clearInterval(this.countdown);
            this.audioController.victory();
            document.getElementById('victory-text').classList.add('visible');
        }}