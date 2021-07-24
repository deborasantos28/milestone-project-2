// Fallout Pre-Loader Boot System

//var loader = document.querySelector(".pre-loading-screen");

//window.addEventListener("load", vanish);

//function vanish() {
 // pre-loading-screen.classList.add("disappear");};


 class AtomicMemory {
  constructor(totalTime, cards) {
      this.cardsArray = cards;
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById('time-remaining')
      this.ticker = document.getElementById('flips');
  }
  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
        this.shuffleCards(this.cardsArray);
        this.countdown = this.startCountdown();
        this.busy = false;
    }, 500)
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
}

}