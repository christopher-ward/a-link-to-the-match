$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 9;
var attempts = null;
var games_played = null;

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
      attempts++;
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
        games_played++;
        winConditionModal();
      }
      firstCardClicked = null;
      secondCardClicked = null;
    }
    displayStats();
  }
  $("#winDiv").on("click", function () {
    hideModal();
  });
}

function calculateAccuracy() {
  var accuracy = ((matches / (matches + attempts)) * 100);
  if (!Number.isInteger(accuracy)) {
    accuracy = accuracy.toFixed(2)
  }
  var percentAccuracy = accuracy + "%";
  return percentAccuracy;
}

function displayStats() {
  var aside = $("aside");
  var gamesPlayedElem = aside.find(".games span");
  var attemptsMadeElem = aside.find(".attempts span");
  var accuracyElem = aside.find(".accuracy span");
  var calcAccuracy = calculateAccuracy(); //use to update the text in the accuracy element

  if (games_played > 0) {
    gamesPlayedElem.text(games_played);
  }
  if (attempts > 0) {
    attemptsMadeElem.text(attempts);
  }
  accuracyElem.text(calcAccuracy);
}

function winConditionModal() {
  $("#tryAgainDiv").show();
  $("#winDiv").show();
}
function hideModal() {
  $("#winDiv").hide();
  $("#tryAgainDiv").hide();
}
