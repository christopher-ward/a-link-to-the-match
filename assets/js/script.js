$(document).ready(initializeApp);

let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;
const maxMatches = 9;
let attempts = null;
let games_played = null;

function initializeApp() {
  dynamicCardGenerator();
  $(".container").on("click", ".card", handleCardClick);
  $("#startDiv").on("click", startDivClick);
}

function dynamicCardGenerator(reset) {
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
  let randCardFaceIndex = null;
  let randCardFace = null;
  if (reset) {
    $(".container").html("");
    displayStats(1);
  }
  while (cardFaceArray.length > 0) {
    let divCardElem = $("<div>").addClass("card");
    let frontDivElem = $("<div>");
    let backDivElem = $("<div>").addClass("back tri-force");
    randCardFaceIndex = Math.floor(Math.random() * cardFaceArray.length);
    randCardFace = cardFaceArray.splice(randCardFaceIndex, 1);
    frontDivElem.addClass("front " + randCardFace);
    divCardElem.append(frontDivElem);
    divCardElem.append(backDivElem);
    $("div .container").append(divCardElem);
  }
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
      matchCardTransitionOut(firstCardFront, secondCardFront);
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
    $(".card").addClass("hidden");
    afterTryAgainClick(1);
  });
  $("#winDiv").on("click", "#tryAgainDiv", function () {
    $(".card").addClass("hidden");
    displayStats(1);
    dynamicCardGenerator(1);
    afterTryAgainClick();
  });
  $("button.monk-child").on("click", monkChildClick);
}

function matchCardTransitionOut(firstCardFront, secondCardFront) {
  firstCardFront.parent().addClass("no-hover");
  secondCardFront.parent().addClass("no-hover");
  firstCardFront.addClass("matched-transition matched");
  secondCardFront.addClass("matched-transition matched");
  return;
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
  return;
}

function afterTryAgainClick(unhideChild) {
  const monkDiv = $("#afterTryAgainClick");
  const monkChildDiv = $("#monkChild");
  if (unhideChild) {
    monkDiv.removeClass("hidden");
    monkChildDiv.removeClass("hidden");
    return;
  }
    monkDiv.removeClass("hidden");
    monkChildDiv.addClass("hidden");
    setTimeout(function(){
      monkDiv.addClass("hidden");
      startDivClick();
    },3000);
    return;
}

function monkChildClick() {
  $("#afterTryAgainClick").addClass("hidden");
  $(".monk-child").addClass("hidden");
  setTimeout(function(){
    startDivClick();
  }, 2000);
}

function startDivClick() {
  dynamicCardGenerator(1);
  $(".card").find(".front").removeClass("matched matched-transition");
  $(".card").removeClass("hidden no-hover");
  $("#startDiv").addClass("hidden");
  $(".card").addClass("flipped");
  $(".start-shadow").addClass("hidden");
  setTimeout(function() {
    $(".card").removeClass("flipped");
  }, 1500);
}

function winConditionModal() {
  setTimeout(function() {
    $("#tryAgainDiv").show();
    $("#winDiv").show();
  }, 3000);
}

function hideModal() {
  $("#winDiv").hide();
  $("#tryAgainDiv").hide();
}
