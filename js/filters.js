// Functions

function initFilters() {

  let $filterList = $('.filter-list').isotope({
    itemSelector: '.card-container',
    layoutMode: 'fitRows',
  });

  $('.filter-buttons').each((i, group) => {
    let $group = $(group);

    $group.on('click', 'input', () => {
      let filters = $group.find(':checked').map((i, button) => {
        return '.' + $(button).attr('id');
      }).get();
      $filterList.isotope({filter: filters.length ? filters.join('') : '*'});
    });
  });
}

// Hooks

$(window).on("load", initFilters);
