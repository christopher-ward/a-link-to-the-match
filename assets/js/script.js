$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 9;
var attempts = null;
var games_played = null;

function initializeApp() {
  dynamicCardGenerator();
  $(".container").on("click", ".card", handleCardClick);
  $("#startDiv").on("click", startDivClick);
}

function dynamicCardGenerator(reset) {
  //need to first create array of the different possible faces(fronts) of the cards
  var cardFaceArray = ["js-logo", "js-logo", "gitHub-logo", "gitHub-logo", "html-logo", "html-logo", "mysql-logo", "mysql-logo", "php-logo", "php-logo", "react-logo", "react-logo", "green-rupee", "green-rupee", "blue-rupee", "blue-rupee", "css-logo", "css-logo"];
  var randCardFaceIndex = null;
  var randCardFace = null;
  if (reset) {
    $(".container").html("");
  }
  while (cardFaceArray.length > 0) {
    var divCardElem = $("<div>").addClass("card");
    var frontDivElem = $("<div>");
    var backDivElem = $("<div>").addClass("back tri-force");
    randCardFaceIndex = Math.floor(Math.random() * cardFaceArray.length);
    randCardFace = cardFaceArray.splice(randCardFaceIndex, 1);
    frontDivElem.addClass("front " + randCardFace);
    divCardElem.append(frontDivElem);
    divCardElem.append(backDivElem);
    $("div .container").append(divCardElem);
  }
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
      $(".container").off("click", ".card", handleCardClick);
      setTimeout(function () { //first arg in setTimeout is anon function with the elements to be hidden
        firstCardClicked.find(".back").removeClass("hidden");
        secondCardClicked.find(".back").removeClass("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        $(".container").on("click", ".card", handleCardClick);
      }, 500);
    } else {
      matches++;
      transitionCardOut(firstCardClicked, secondCardClicked);
      firstCardClicked = null;
      secondCardClicked = null;
      if (matches === maxMatches) {
        games_played++;
        winConditionModal();
      }
    }
    displayStats();
  }
  $("#winDiv").on("click", function () {
    hideModal();
  });
  $("#winDiv").on("click", "#tryAgainDiv", function () {
    displayStats(1);
    // $(".card .back").removeClass("hidden");
    dynamicCardGenerator(1);
    startDivClick();
  });
}

function transitionCardOut(firstCardClicked, secondCardClicked) {
  firstCardClicked.addClass("matched matched-transition");
  secondCardClicked.addClass("matched matched-transition");
  return;
}

function calculateAccuracy() {
  var accuracy = ((matches / (matches + attempts)) * 100);
  if (!Number.isInteger(accuracy)) {
    accuracy = accuracy.toFixed(2)
  }
  var percentAccuracy = accuracy + "%";
  return percentAccuracy;
}

function displayStats(reset) {
  var aside = $("aside");
  var gamesPlayedElem = aside.find(".games span");
  var attemptsMadeElem = aside.find(".attempts span");
  var accuracyElem = aside.find(".accuracy span");
  var calcAccuracy = calculateAccuracy(); //use to update the text in the accuracy element
  if (reset) {
    matches = 0;
    attempts = 0;
    accuracyElem.text(0+"%");
    attemptsMadeElem.text(attempts);
    return;
  }
  if (games_played > 0) {
    gamesPlayedElem.text(games_played);
  }
  if (attempts > 0) {
    attemptsMadeElem.text(attempts);
  }
  accuracyElem.text(calcAccuracy);
}

function startDivClick() {
  $("#startDiv").addClass("hidden");
  $(".back").addClass("hidden");
  $(".start-shadow").addClass("hidden");
  setTimeout(function() {
    $(".back").removeClass("hidden");
  }, 1000);
}
function winConditionModal() {
  $("#tryAgainDiv").show();
  $("#winDiv").show();
}
function hideModal() {
  $("#winDiv").hide();
  $("#tryAgainDiv").hide();
}
