$(function () {
  /* Поддержка svg спрайтов в IE 11 */
  svg4everybody();

  // Модальное окно - каталог
  $('#catalog-btn').on('click', function (event) {
    event.preventDefault();
    if ($('#filter-btn').hasClass('active')) {
      $('#filter-btn').removeClass('active');
      $('#modal-filter').fadeOut();
    }
    
    $(this).toggleClass('active');
    $('#modal-catalog').fadeToggle();
  });

  // Кнопка закрытия окна - каталог
  $('#catalog-close').on('click', function (event) {
    event.preventDefault();
    $('#catalog-btn').removeClass('active');
    $('#modal-catalog').fadeOut();
  })

  // Модальное окно - фильтр
  $('#filter-btn').on('click', function (event) {
    event.preventDefault();
    if ($('#catalog-btn').hasClass('active')) {
      $('#catalog-btn').removeClass('active');
      $('#modal-catalog').fadeOut();
    }
  
    $(this).toggleClass('active');
    $('#modal-filter').fadeToggle();
    
  // Селекты в фильтре
    $('.modal-filter__select').styler({
      selectSmartPositioning: false
    });

    $('.modal-filter__sl-currency').styler({
      selectSmartPositioning: false
    })

    $('.modal-filter__sl-strip-input').ionRangeSlider();

  });

  // Кнопка - открыть все фильтры
  $('#all-filters').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('#hiddenFilters').slideToggle();
  });

   // Кнопка закрытия окна - фильтр
  $('#filter-close').on('click', function (event) {
    event.preventDefault();
    $('#filter-btn').removeClass('active');
    $('#modal-filter').fadeOut();
  });

  // Кнопка поиска
  $('#search-btn').on('click', function (event) {
    event.preventDefault();
    $('#search-field').toggleClass('active');
    $('.categories__btn-icon').toggleClass('hidden');
  });

  // Отмена ссылки в категориях
  $('.category__name').on('click', function (event) {
    event.preventDefault();
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

  // Табы
  function tabsActive (tabsNavBlock, tabsBlock) {
    $(tabsNavBlock).easytabs({
      updateHash: false,
      animate: true,
      panelContext: $(tabsBlock)
    });
  }

  tabsActive('#journal-nav', '#journal-tabs');
  tabsActive('#interview-nav', '#interview-tabs');
  tabsActive('#reviews-nav', '#reviews-tabs');

  // Табы - блок "Журнал"
  // $('#journal-nav').easytabs({
  //   updateHash: false,
  //   animate: true,
  //   panelContext: $('#journal-tabs')
  // });

  // Табы - блок "Интервью"
  // $('#interview-nav').easytabs({
  //   updateHash: false,
  //   animate: true,
  //   panelContext: $('#interview-tabs')
  // });

  // Табы - блок "Обзоры"
  // $('#reviews-nav').easytabs({
  //   updateHash: false,
  //   animate: true,
  //   panelContext: $('#reviews-tabs')
  // });
});