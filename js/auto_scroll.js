// Configuration

const AS_THRESHOLD = 250.0
const AS_SPEED = .03

// Functions

function autoScrollStart(element) {
	autoScrollStop(element)

	const leftToRight = element.autoScrollLeftToRight

	const scrollStart = 0
	const scrollEnd = element.scrollWidth - element.clientWidth

	const newPosition = leftToRight ? scrollEnd : scrollStart
	const duration = Math.abs(newPosition - element.scrollLeft) / AS_SPEED

	$(element).animate({ scrollLeft: newPosition },
	{
		duration: duration,
		complete: function() {
			element.autoScrollLeftToRight = !leftToRight
			autoScrollStart(element)
		}
	});
}

function autoScrollStop(element) {
	$(element).stop()
}

function autoScrollInit(element) {
	element.autoScrollLeftToRight = true
	$(element).hover(
		function() { autoScrollStop(element) },
		function() { autoScrollStart(element) }
	)
	autoScrollStart(element)
}

function autoScrollDeinit(element) {
	$(element).hover(null, null)
	autoScrollStop(element)
}

function autoScrollInitAll() {
	$(".auto-scroll").each(function() {
		if (this.scrollWidth - this.clientWidth > AS_THRESHOLD) {
			autoScrollInit(this)
		} else {
			autoScrollDeinit(this)
		}
	})
}

// Hooks

$(document).ready(autoScrollInitAll)
$(window).on("resize", autoScrollInitAll)
