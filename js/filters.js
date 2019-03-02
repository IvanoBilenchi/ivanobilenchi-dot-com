// Functions

function initFilters() {

	let $filterList = $('.filter-list').isotope({
		itemSelector: '.card-container',
		layoutMode: 'fitRows',
	});

	$('.filter-buttons').each(function(i, group) {
		var $group = $(group);

		$group.on('click', 'button', function() {

			// Set active
			$group.find('.active').removeClass('active');
			$(this).addClass('active');

			// Apply filter
			let filterValue = $(this).attr('data-filter');
			$filterList.isotope({filter: filterValue})
		});
	});
}

// Hooks

$(document).ready(initFilters)
