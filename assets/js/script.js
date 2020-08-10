$(document).ready(initializeApp);

let firstCardClicked = null;
let secondCardClicked = null;
let matches = null;
let attempts = null;
let games_played = null;
const maxMatches = 9;
const cardFaceArray = [
  "black-bokoblin", "black-bokoblin",
  "red-rupee", "red-rupee",
  "blue-chuchu", "blue-chuchu",
  "golden-bokoblin", "golden-bokoblin",
  "gold-rupee", "gold-rupee",
  "purple-rupee", "purple-rupee",
  "green-rupee", "green-rupee",
  "blue-rupee", "blue-rupee",
  "blue-maned-lynel", "blue-maned-lynel" ];

function initializeApp() {
  dynamicCardGenerator(cardFaceArray, 1);
  $(".container").on("click", ".card", handleCardClick);
  $("#startDiv").on("click", startDivClick);
  $("#winDiv").on("click", "#tryAgainDiv", () => {
    $("#winDiv").addClass("hidden");
    newGameTransition();
    $("#winDiv").removeClass("fade-in in");
  });
}

const handleCardClick = (event) => {
  let currentCard = $(event.currentTarget);
  currentCard.addClass("flipped");
  if (currentCard.find(".front").hasClass("card-selected")) {
    return;
  }
  currentCard.find(".front").addClass("card-selected");
  currentCard.addClass('no-hover');
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
      setTimeout(() => {
        firstCardClicked.removeClass("flipped no-hover");
        secondCardClicked.removeClass("flipped no-hover");
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

const startDivClick = () => {
  $(".container").off("click", ".card", handleCardClick);
  $(".card").find(".front").removeClass("matched matched-transition");
  $(".card").removeClass("hidden no-hover");
  $(".card").addClass("flipped");
  $("#startDiv").addClass("hidden");
  $(".start-shadow").removeClass("hidden");
  setTimeout(() => {
    $(".card").removeClass("flipped");
    $(".start-shadow").addClass("hidden");
  }, 1500);
  setTimeout(()=>{
    $(".container").on("click", ".card", handleCardClick);
  }, 2000);
  return;
}

const winConditionModal = () => {
  $("#winDiv").removeClass("hidden");
  // Check the stat conditions and present congratulatory message for the winner
  // Also add a Birthday message for Mom
  // Maybe create a message that will repeat every Aug 11
  // Tangent Note:
  // This makes me think of a separate project idea.
  // Build simple page that will display a daily message (The positivity calendar that Mom really likes)
  // Make white background and the message centered
  // Look to see if can find those same messages and/or find a different, but similarly styled, source
  // Maybe create a series of custom messages for her to see every day.
  // I think the custom messages really is the way to go.
  // POST MVP - Have different types of content every day.
  // Can start off with first few months and update later
  // Maybe could have different scenery for different seasons
  // Could have tranquil music play in the background
  // Can change the music
  // Maybe reach out to Andy for opinion
  // Also checkout what people are working on
  setTimeout(() => {
    $("#winDiv").addClass("fade-in in");
  }, 100)
}

const dynamicCardGenerator = (cardFaceArray, first) => {
  let cardArray = [...cardFaceArray];
  let randCardFaceIndex = null;
  let randCardFace = null;
  let currDate = new Date();
  let currMonth = currDate.getMonth()+1;
  let currDay = currDate.getDate();
  if (currMonth === 8 && currDay === 11) {
    var message = 1;
  }
  let $main = $("main.container");
  $main.html("");
  while (cardArray.length > 0) {
    let $divCardElem = $("<div>").addClass("card");
    let $frontDivElem = $("<div>");
    let $backDivElem = $("<div>").addClass("back tri-force");
    randCardFaceIndex = Math.floor(Math.random() * cardArray.length);
    randCardFace = cardArray.splice(randCardFaceIndex, 1);
    $frontDivElem.addClass("front " + randCardFace);
    $divCardElem.append($frontDivElem, $backDivElem);
    $main.append($divCardElem);
  }
  let $monkContainer = $("<div>").attr('id', 'monkContainer').addClass("monk hidden see-through");
  if (first && message) {
    let $startDiv = $("<div>").attr('id', 'startDiv').addClass("start-reveal");
    $startDiv
      .append(
        $("<p>")
          .addClass(" anim-typewriter border-right-type-none type-line")
          .text("If you see this, we are saved..."),
        $("<p>")
          .addClass(" anim-typewriter-2 border-right-type-none type-line")
          .text("For Warrior Debra is born!")
      );
    $main.append($monkContainer, $startDiv);
  }
  else if (first) {
    let $startDiv = $("<div>").attr('id', 'startDiv').addClass("start-reveal");
    $startDiv
      .append(
        $("<p>")
          .addClass(" anim-typewriter border-right-type-none type-line")
          .text("In the name of Goddess Hylia"),
        $("<p>")
          .addClass(" anim-typewriter-2 border-right-type-none type-line")
          .text("I offer you this trial.")
      );
    $main.append($monkContainer, $startDiv);
  }
  $main.append($monkContainer);
}

const newGameTransition = () => {
  const monkDiv = $("#monkContainer");
  $(".front").addClass("matched-transition matched");
  setTimeout(() => {
    monkDiv.removeClass("hidden");
    setTimeout(() => {
      monkDiv.addClass("fade-in in");
    }, 1500)
    setTimeout(() => {
      monkOut();
    }, 1)
  }, 2000);
  return;
}

const monkOut = () => {
  const monkDiv = $("#monkContainer");
  setTimeout(() => {
    monkDiv.removeClass("fade-in in see-through");
    monkDiv.addClass("matched-transition matched");
    setTimeout(() => {
      monkDiv.addClass("see-through hidden");
      monkDiv.removeClass("matched-transition matched")
      displayStats(1);
      resetShuffle();
    }, 3000);
  }, 5000);
}

const resetShuffle = async () => {
  try {
    const first = await shuffle();
    const second = await cardsFadeIn();
    const third = await cardsReveal();
    const fourth = await cardsHideAndBegin();
    const fifth = await hideShadow();
  }
  catch (err) {
    console.error("Error in resetSuffle:", err);
  }
}

const shuffle = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("first")
      dynamicCardGenerator(cardFaceArray)
      $(".card").addClass("no-hover see-through")
      $(".start-shadow").removeClass("hidden")
    }, 500);
  })
}
const cardsFadeIn = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("second")
      $(".card").addClass("fade-in in");
    }, 500);
  })
}
const cardsReveal = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("third")
      $(".card").removeClass("fade-in");
      $(".card").addClass("flipped");
    }, 3000);
  })
}
const cardsHideAndBegin = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("fourth")
      $(".card").removeClass("flipped");
    }, 2500);
  })
}
const hideShadow = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("fifth")
      $(".start-shadow").addClass("hidden");
      $(".card").removeClass("no-hover see-through");
    }, 100);
  })
}

const calculateAccuracy = () => {
  let accuracy = ((matches / (matches + attempts)) * 100);
  if (!Number.isInteger(accuracy)) {
    accuracy = accuracy.toFixed(2)
  }
  let percentAccuracy = `${accuracy}%`;
  return percentAccuracy;
}

const displayStats = (reset) => {
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
