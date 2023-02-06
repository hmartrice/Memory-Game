const gameContainer = document.getElementById("game");
const cards = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "grey",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "black",
  "grey"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    cards.push(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  const flipColor = event.target.getAttribute("class");
  event.target.classList.toggle("disabled")
  event.target.style.backgroundColor = flipColor;
  numClicks++;
  flippedCards.push(event.target);
}

function resetDisabled(event) {
  for (div of cards) {
    div.classList.remove("disabled");
  }
}

function clearLog() {
  numClicks = 0;
  flippedCards = [];
}

function printLog(event) {
  console.log("Clicks")
  console.log(numClicks)
  console.log("Flipped Cards")
  console.log(flippedCards)
  console.log("Cards")
  console.log(cards)
  console.log("Cards Left")
  console.log(cardsLeft)

}

function toggleBoard() {
  gameContainer.classList.toggle("disabled");
}

// when the DOM loads
createDivsForColors(shuffledColors);

let flippedCards = [];
let numClicks = 0;
let cardsLeft = COLORS.length;


gameContainer.addEventListener("click", function () {
  if (flippedCards.length === 2) {
    if (flippedCards[0].classList[0] === flippedCards[1].classList[0]) {
      toggleBoard();
      cardsLeft = cardsLeft - 2;
      for (div of flippedCards) {
        div.classList.add("paired")
      }
      resetDisabled();
      clearLog();
      setTimeout(function () {
        toggleBoard();
      }, 1000)
      if (cardsLeft === 0) {
        setTimeout(function () { alert("You Won"); }, 100)
      }
    }

    else {
      toggleBoard();
      setTimeout(function () {
        for (div of flippedCards) {
          div.style.backgroundColor = "white"
        }
        clearLog();
        resetDisabled();
      }, 1000)
      setTimeout(function () {
        toggleBoard();
      }, 1000)
    }
  }
})

