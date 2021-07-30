// Fallout Pre-Loader Boot System

//var loader = document.querySelector(".pre-loading-screen");

//window.addEventListener("load", vanish);

//function vanish() {
 // pre-loading-screen.classList.add("disappear");};


 // Made a list of all the .perk-card elements
 // Archived that by using a constant and querySelector to store all "cards"
 //
const cards = document.querySelectorAll('.perk-card');


// Declared variables to be able to distinguish wich is the card is the the first one and the second one
// It's necessary to distinguish to be able to pair the two matching cards
// the hasFlippedCard is false because it is the first card the player has clicked, therefore no matching is made.

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Using a combination of CSS to flip the card 180degrees
// Used the function flipCard, stated on the eventListener
// 


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  // first click
  // in this If statement, because it's the first click the user has made, no match is able to be made until, 
  // the secondCard is clicked

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
// second click
// secondCard has the value of this. this, in such scenerio represents each card
  secondCard = this;
  checkForMatch();
}


// Using the combination of HTML and Javascript we can use the data attibute to be able to checkForMatch
// A dataset has been added to each card.

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
} 

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

//Looped through the list of cards, by attaching an Event Listener to each card
//It will listen for a click command and execute the flipCard function

cards.forEach(card => card.addEventListener('click', flipCard));


// Game Timer / Countdown 

var timeLeft = 60;
    var elem = document.getElementById('timer');
    
    var timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);

      } else {
        elem.innerHTML = timeLeft + ' seconds';
        timeLeft--;
      }
    }

    // Game Counter 
    
    var score = 0;
    function points(){
      let card1 = firstCard;
      let card2 = secondCard;

    if (card1 === card2) {
      score++
    } else {
      ++score
    }
 document.getElementById("flips").innerHTML = score;
}
