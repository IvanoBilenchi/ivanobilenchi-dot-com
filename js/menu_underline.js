// Adapted from: https://codepen.io/digistate/pen/OXXjXM

// Functions

function moveLine(jqItem) {
  clearTimeout($("#navigation").data("timeout"));
  var slideLine = $("#slide-line");

  if (jqItem.length !== 0) {
    slideLine.css({
      "width": jqItem.width(),
      "left": jqItem.position().left
    });
  } else {
    slideLine.width(0);
  }
}

function refreshLine() {
  moveLine($("#navigation li.active"));
}

function refreshLineWithDelay() {
  $("#navigation").data("timeout", setTimeout(refreshLine, 200));
}

// Hooks

jQuery(() => {
  refreshLineWithDelay();

  $(window).on("resize", refreshLineWithDelay);

  $("#navigation li")
    .on("mouseenter", function () { moveLine($(this)); })
    .on("mouseleave", refreshLineWithDelay);
});
