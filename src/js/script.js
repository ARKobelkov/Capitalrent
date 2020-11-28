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

});