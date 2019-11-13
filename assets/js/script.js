$(document).ready(initializeApp);

{/* <div class="card">
  <div class="front lfz-card"></div>
  <div class="back js-logo"></div>
</div> */}

function initializeApp() {
  $(".card").on("click", handleCardClick);
}

function handleCardClick(event) {
  var currentTarget = $(event.currentTarget);
  currentTarget.find(".front").addClass("hidden");
  currentTarget.find(".back").removeClass("hidden");
}
