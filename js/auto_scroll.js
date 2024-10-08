// Configuration

const AS_SCROLL_END_TIMEOUT = 500;
const AS_THRESHOLD = 250.0;
const AS_SPEED = .05;

// Functions

function autoScrollStart(element) {
  if (element.isAutoScrolling) return;

  element.isAutoScrolling = true;
  const leftToRight = element.autoScrollLeftToRight;

  const scrollStart = 0;
  const scrollEnd = element.scrollWidth - element.clientWidth;

  const newPosition = leftToRight ? scrollEnd : scrollStart;
  const duration = Math.abs(newPosition - element.scrollLeft) / AS_SPEED;

  $(element).animate({ scrollLeft: newPosition },
    {
      duration: duration,
      complete: () => {
        element.autoScrollLeftToRight = !leftToRight;
        element.isAutoScrolling = false;
        autoScrollStart(element);
      }
    });
}

function autoScrollStop(element) {
  if (!element.isAutoScrolling) return;

  element.isAutoScrolling = false;
  $(element).stop();
}

function autoScrollInit(element) {
  element.isAutoScrolling = false;
  element.autoScrollLeftToRight = true;

  $(element)
    .on("mouseenter touchstart touchmove", () => { autoScrollStop(element); })
    .on("mouseleave", () => { autoScrollStart(element); });

  $(element).on("touchend", () => {
    $(element).on("scrollEnded", () => {
      $(element).off("scrollEnded");
      autoScrollStart(element);
    });
  });

  $(element).on("scroll", () => {
    if (element.timer) clearTimeout(element.timer);

    element.timer = setTimeout(() => {
      $(element).trigger("scrollEnded");
    }, AS_SCROLL_END_TIMEOUT);
  });

  autoScrollStart(element);
}

function autoScrollDeinit(element) {
  $(element).off("mouseenter mouseleave touchend touchstart touchmove scroll");
  autoScrollStop(element);
}

function autoScrollDeinitAll() {
  $(".auto-scroll").each(function () {
    autoScrollDeinit(this);
  });
}

function autoScrollInitAll() {
  $(".auto-scroll").each(function () {
    if (this.scrollWidth - this.clientWidth > AS_THRESHOLD) {
      autoScrollInit(this);
    } else {
      autoScrollDeinit(this);
    }
  });
}

// Hooks

$(window).on("load", autoScrollInitAll);

$(window).on("resize", () => {
  autoScrollDeinitAll();
  autoScrollInitAll();
});
