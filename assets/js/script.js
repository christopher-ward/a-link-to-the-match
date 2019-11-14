$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 9;

function initializeApp() {
  $(".card").on("click", handleCardClick);

}

function handleCardClick(event) {
  var currentCard = $(event.currentTarget);

  if (currentCard.find(".back").hasClass("hidden")) {
    return;
  }
  currentCard.find(".back").addClass("hidden");

  if (firstCardClicked === null) {
    firstCardClicked = currentCard;
  } else {
    secondCardClicked = currentCard;
  }

  if (secondCardClicked) {
    var firstClickImage = firstCardClicked.find(".front").css("background-image");
    var secondClickImage = secondCardClicked.find(".front").css("background-image");

    if (firstClickImage != secondClickImage) {
      $(".card").off("click", handleCardClick);
      setTimeout(function () { //first arg in setTimeout is anon function with the elements to be hidden
        firstCardClicked.find(".back").removeClass("hidden");
        secondCardClicked.find(".back").removeClass("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        $(".card").on("click", handleCardClick);
      }, 1500);
    } else {
      console.log("Cards match!");
      matches++;
      if (matches === maxMatches) {
        winConditionModal();
      }
      firstCardClicked = null;
      secondCardClicked = null;
    }
  }
  $("#winDiv").on("click", function () {
    hideModal();
  });

}

function winConditionModal() {
  $("#tryAgainDiv").show();
  $("#winDiv").show();
}
function hideModal() {
  $("#winDiv").hide();
  $("#tryAgainDiv").hide();
}
