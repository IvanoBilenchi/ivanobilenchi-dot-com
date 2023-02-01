// Functions

function initFilters() {

  let $filterList = $('.filter-list').isotope({
    itemSelector: '.card-container',
    layoutMode: 'fitRows',
  });

  $('.filter-buttons').each((i, group) => {
    let $group = $(group);

    $group.on('click', 'button', () => {
      let filters = $group.find('.active').map((i, button) => {
        return $(button).attr('data-filter');
      }).get();
      $filterList.isotope({filter: filters.length ? filters.join('') : '*'});
    });
  });
}

// Hooks

$(window).on("load", initFilters);
