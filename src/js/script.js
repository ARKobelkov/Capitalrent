$(function () {
  /* Поддержка svg спрайтов в IE 11 */
  svg4everybody();

  // Модальное окно - каталог
  $('#catalog-btn').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('#modal-catalog').fadeToggle();
  });

  $('#catalog-close').on('click', function (event) {
    event.preventDefault();
    $('#catalog-btn').removeClass('active');
    $('#modal-catalog').fadeOut();
  })

  // Кнопка поиска
  $('#search-btn').on('click', function (event) {
    event.preventDefault();
    $('#search-field').toggleClass('active');
    $('.categories__btn-icon').toggleClass('hidden');
  });

  // Кнопка "Открыть все категории"
  $('#all-categories').on('click', function(event) {
    event.preventDefault();
    $('.category__all-categories').toggleClass('active');

    if (!$('.category__all-categories').hasClass('active')) {
      $('.category__all-categories').html('показать все <br> категории');
    } else {
      $('.category__all-categories').html('скрыть <br> категории');
    };
    
    $('.categories__category.hidden').slideToggle();
  });

  // Табы - блок "Журнал"
  $('#journal-nav').easytabs({
    updateHash: false,
    animate: true,
    panelContext: $('#journal-tabs')
  });
});