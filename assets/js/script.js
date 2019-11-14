$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;



function initializeApp() {
  $(".card").on("click", handleCardClick);
}

function handleCardClick(event) {
  var currentCard = $(event.currentTarget);

  currentCard.find(".back").addClass("hidden");

  if (firstCardClicked === null) {
    firstCardClicked = currentCard;
  } else {
    secondCardClicked = currentCard;
  }

  if (secondCardClicked) {
    var firstClickImage = firstCardClicked.find(".front").css("background-image");
    var secondClickImage = secondCardClicked.find(".front").css("background-image");

    if (firstClickImage === secondClickImage) {
      console.log("Cards match!");
      matches++;
    } else {
      setTimeout(function(){ //first arg in setTimeout is anon function with the elements to be hidden
        firstCardClicked.find(".back").removeClass("hidden");
        secondCardClicked.find(".back").removeClass("hidden");
      }, 1500);
    }
  }
}
