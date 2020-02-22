$(document).ready(initializeApp);

let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;
const maxMatches = 9;
let attempts = null;
let games_played = null;
const cardFaceArray = [
  "black-bokoblin", "black-bokoblin",
  "red-rupee", "red-rupee",
  "blue-chuchu", "blue-chuchu",
  "golden-bokoblin", "golden-bokoblin",
  "gold-rupee", "gold-rupee",
  "purple-rupee", "purple-rupee",
  "green-rupee", "green-rupee",
  "blue-rupee", "blue-rupee",
  "blue-maned-lynel", "blue-maned-lynel"];

function initializeApp() {
  dynamicCardGenerator(cardFaceArray);
  $(".container").on("click", ".card", handleCardClick);
  $("#startDiv").on("click", startDivClick);
  $("#winDiv").on("click", "#tryAgainDiv", function () {
    hideModal();
    newGameTransition();
    $("#winDiv").removeClass("fade-in in");
  });
}

function handleCardClick(event) {
  let currentCard = $(event.currentTarget);
  currentCard.addClass("flipped");
  if (currentCard.find(".front").hasClass("card-selected")) {
    return;
  }
  currentCard.find(".front").addClass("card-selected");
  if (firstCardClicked === null) {
    firstCardClicked = currentCard;
  } else {
    secondCardClicked = currentCard;
  }
  if (secondCardClicked) {
    let firstCardFront = firstCardClicked.find(".front");
    let secondCardFront = secondCardClicked.find(".front");
    let firstClickImage = firstCardFront.css("background-image");
    let secondClickImage = secondCardFront.css("background-image");
    if (firstClickImage != secondClickImage) {
      attempts++;
      $(".container").off("click", ".card", handleCardClick);
      setTimeout(function () {
        firstCardClicked.removeClass("flipped");
        secondCardClicked.removeClass("flipped");
        firstCardFront.removeClass("card-selected");
        secondCardFront.removeClass("card-selected");
        firstCardClicked = null;
        secondCardClicked = null;
        $(".container").on("click", ".card", handleCardClick);
      }, 1000);
    } else {
      matches++;
      firstCardFront.removeClass("card-selected");
      secondCardFront.removeClass("card-selected");
      firstCardFront.parent().addClass("no-hover");
      secondCardFront.parent().addClass("no-hover");
      firstCardClicked = null;
      secondCardClicked = null;
      if (matches === maxMatches) {
        games_played++;
        winConditionModal();
      }
    }
    displayStats();
  }
}

function startDivClick() {
  $(".container").off("click", ".card", handleCardClick);
  $(".card").removeClass("hidden no-hover");
  $(".card").addClass("flipped");
  $("#startDiv").addClass("hidden");
  $(".start-shadow").removeClass("hidden");
  setTimeout(function () {
    $(".card").removeClass("flipped");
    $(".start-shadow").addClass("hidden");
  }, 1500);
  setTimeout(()=>{
    $(".container").on("click", ".card", handleCardClick);
  }, 2000);
}

function dynamicCardGenerator(cardFaceArray) {
  let randCardFaceIndex = null;
  let randCardFace = null;
  $("main.container").html("");
  while (cardFaceArray.length > 0) {
    let divCardElem = $("<div>").addClass("card");
    let frontDivElem = $("<div>");
    let backDivElem = $("<div>").addClass("back tri-force");
    randCardFaceIndex = Math.floor(Math.random() * cardFaceArray.length);
    randCardFace = cardFaceArray.splice(randCardFaceIndex, 1);
    frontDivElem.addClass("front " + randCardFace);
    divCardElem.append(frontDivElem, backDivElem);
    $("main.container").append(divCardElem);
  }
}

function newGameTransition() {
  const monkDiv = $("#monkContainer");
  $(".front").addClass("matched-transition matched");
  setTimeout(() => {
    monkDiv.removeClass("hidden");
    setTimeout(() => {
      monkDiv.addClass("fade-in in");
    }, 1500)
    monkOut();
  }, 3000);
  return;
}

function winConditionModal() {
  $("#winDiv").removeClass("hidden");
  setTimeout(() => {
    $("#winDiv").addClass("fade-in in");
  }, 1500)
}

function hideModal() {
  $("#winDiv").hide();
  $("#tryAgainDiv").hide();
}

const monkOut = () => {
  const monkDiv = $("#monkContainer");
  setTimeout(function () {
    monkDiv.addClass("matched-transition matched");
    setTimeout(() => {
      monkDiv.addClass("hidden");
      displayStats(1);
      dynamicCardGenerator(cardFaceArray);
      startDivClick();
    }, 3000);
  }, 5000);
}

function calculateAccuracy() {
  let accuracy = ((matches / (matches + attempts)) * 100);
  if (!Number.isInteger(accuracy)) {
    accuracy = accuracy.toFixed(2)
  }
  let percentAccuracy = `${accuracy}%`;
  return percentAccuracy;
}

function displayStats(reset) {
  let aside = $("aside");
  let gamesPlayedElem = aside.find(".games span");
  let attemptsMadeElem = aside.find(".attempts span");
  let accuracyElem = aside.find(".accuracy span");
  let calcAccuracy = calculateAccuracy();
  if (reset) {
    matches = 0;
    attempts = 0;
    accuracyElem.text(`0%`);
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
  return;
}
