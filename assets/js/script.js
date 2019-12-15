$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var maxMatches = 9;
var attempts = null;
var games_played = null;

function initializeApp() {
  dynamicCardGenerator(); //dynamically generates cards and applies their faces
  $(".container").on("click", ".card", handleCardClick);
  $("#startDiv").on("click", startDivClick); //a starting modal that is clicked to begin
}

function dynamicCardGenerator(reset) {
  //need to first create array of the different possible faces(fronts) of the cards
  var cardFaceArray = [
    "black-bokoblin", "black-bokoblin",
    "red-rupee", "red-rupee",
    "blue-chuchu", "blue-chuchu",
    "golden-bokoblin", "golden-bokoblin",
    "gold-rupee", "gold-rupee",
    "purple-rupee", "purple-rupee",
    "green-rupee", "green-rupee",
    "blue-rupee", "blue-rupee",
    "blue-maned-lynel", "blue-maned-lynel"];
  // var rupee
  var randCardFaceIndex = null;
  var randCardFace = null;
  if (reset) { //reset param is true than the container holding the cards is emptied
    $(".container").html("");
    displayStats(1);
  }
  //loops through the array and create cards with the faces in the array, as long as their are values remaining
  while (cardFaceArray.length > 0) {
    var divCardElem = $("<div>").addClass("card");
    var frontDivElem = $("<div>");
    var backDivElem = $("<div>").addClass("back tri-force"); //the back is the same for all the cards
    randCardFaceIndex = Math.floor(Math.random() * cardFaceArray.length);
    randCardFace = cardFaceArray.splice(randCardFaceIndex, 1); //splicing gets the face value and also decrements the loop
    frontDivElem.addClass("front " + randCardFace); //the class of front and the face value are added
    divCardElem.append(frontDivElem);
    divCardElem.append(backDivElem);
    $("div .container").append(divCardElem); //append newly generated card element to the container
  } //continue to loop until the cardFaceArray is empty
}

function handleCardClick(event) {
  var currentCard = $(event.currentTarget); //gets and stores current card click event target
  currentCard.addClass("flipped");
  if (currentCard.find(".front").hasClass("card-selected")) {
    return; //if the card has already been clicked than the function exits
  }
  currentCard.find(".front").addClass("card-selected");
  if (firstCardClicked === null) { //checks to see which event target is the first and which is second
    firstCardClicked = currentCard;
  } else {
    secondCardClicked = currentCard;
  }
  if (secondCardClicked) {
    var firstCardFront = firstCardClicked.find(".front");
    var secondCardFront = secondCardClicked.find(".front");
    var firstClickImage = firstCardFront.css("background-image");
    var secondClickImage = secondCardFront.css("background-image");
    if (firstClickImage != secondClickImage) {
      attempts++; //if background images of the cards don't match, then increment attempts and reset clicked cards
      $(".container").off("click", ".card", handleCardClick);
      setTimeout(function () { //first arg in setTimeout is anon function with the elements to be hidden
        firstCardClicked.removeClass("flipped");
        secondCardClicked.removeClass("flipped");
        firstCardFront.removeClass("card-selected");
        secondCardFront.removeClass("card-selected");
        firstCardClicked = null;
        secondCardClicked = null;
        $(".container").on("click", ".card", handleCardClick);
      }, 1000);
    } else {
      matches++; //if selections match, matches increments and the cards fade out and current selections reset
      matchCardTransitionOut(firstCardFront, secondCardFront);
      firstCardClicked = null;
      secondCardClicked = null;
      if (matches === maxMatches) {
        games_played++;
        winConditionModal(); //display win condition
      }
    }
    displayStats(); //refresh stats after selections have been made and processed
  }
  //clicking anywhere on the win modal will hide it
  $("#winDiv").on("click", function () {
    hideModal();
    $(".card").addClass("hidden");
    afterTryAgainClick(1);
  });
  //clicking on the try again div will reset the stats, cards, and start a new game
  $("#winDiv").on("click", "#tryAgainDiv", function () {
    $(".card").addClass("hidden");
    displayStats(1);
    dynamicCardGenerator(1);
    afterTryAgainClick();
  });
  $("button.monk-child").on("click", monkChildClick);
}

//fades out matched cards
function matchCardTransitionOut(firstCardFront, secondCardFront) {
  firstCardFront.addClass("matched-transition matched");
  secondCardFront.addClass("matched-transition matched");
  return;
}

//calculates the accuracy stat
function calculateAccuracy() {
  var accuracy = ((matches / (matches + attempts)) * 100);
  if (!Number.isInteger(accuracy)) {
    accuracy = accuracy.toFixed(2)
  }
  var percentAccuracy = accuracy + "%";
  return percentAccuracy;
}

//responsible for displaying the stats each pair and after game reset
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
  return;
}

function afterTryAgainClick(unhideChild) {
  var monkDiv = $("#afterTryAgainClick");
  var monkChildDiv = $("#monkChild");
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

//starts the game
function startDivClick() {
  dynamicCardGenerator(1);
  $(".card").find(".front").removeClass("matched matched-transition");
  $(".card").removeClass("hidden");
  $("#startDiv").addClass("hidden");
  $(".card").addClass("flipped");
  $(".start-shadow").addClass("hidden");
  setTimeout(function() {
    $(".card").removeClass("flipped");
  }, 1500);
}

//responsible for win condition response
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
