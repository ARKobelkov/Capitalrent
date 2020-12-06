"use strict";

$(function () {
  /* Поддержка svg спрайтов в IE 11 */
  svg4everybody();
  /* Боковое меню */

  $('.pull__wrapper').on('click', function () {
    $('#mobile-nav').addClass('mobile-nav_visible');
  });
  $('#mobile-nav-close').on('click', function () {
    $('#mobile-nav').removeClass('mobile-nav_visible');
  });
  $('.mobile-nav__background').on('click', function () {
    $('#mobile-nav').removeClass('mobile-nav_visible');
  }); // Модальное окно - каталог

  $('#catalog-btn').on('click', function (event) {
    event.preventDefault();

    if ($('#filter-btn').hasClass('active')) {
      $('#filter-btn').removeClass('active');
      $('#modal-filter').fadeOut();
    }

    $(this).toggleClass('active');
    $('#modal-catalog').fadeToggle();
  }); // Кнопка закрытия окна - каталог

  $('#catalog-close').on('click', function (event) {
    event.preventDefault();
    $('#catalog-btn').removeClass('active');
    $('#modal-catalog').fadeOut();
  }); // Модальное окно - фильтр

  $('#filter-btn').on('click', function (event) {
    event.preventDefault();

    if ($('#catalog-btn').hasClass('active')) {
      $('#catalog-btn').removeClass('active');
      $('#modal-catalog').fadeOut();
    }

    $(this).toggleClass('active');
    $('#modal-filter').fadeToggle(); // Селекты в фильтре

    $('.modal-filter__select').styler({
      selectSmartPositioning: false
    });
    $('.modal-filter__sl-currency').styler({
      selectSmartPositioning: false
    }); // Настройка рэнджслайдера

    $('.modal-filter__sl-strip-input').each(function () {
      var slider = $(this);
      var sliderContent = slider.closest('.modal-filter__sl-item');
      var fromField = sliderContent.find('[data-field=from]');
      var beforeField = sliderContent.find('[data-field=before]');
      var minValue = parseInt(slider.attr('data-min'));
      var maxValue = parseInt(slider.attr('data-max'));
      var fromValue = parseInt(slider.attr('data-from'));
      var beforeValue = parseInt(slider.attr('data-before'));
      slider.ionRangeSlider({
        type: 'double',
        min: minValue,
        max: maxValue,
        from: fromValue,
        to: beforeValue,
        grid: false,
        hide_min_max: false,
        hide_from_to: true,
        onStart: function onStart(data) {
          if (fromField.length) {
            fromField.attr('placeholder', data.min);
            fromField.val(data.from);
          }

          if (beforeField.length) {
            beforeField.attr('placeholder', data.max);
            beforeField.val(data.to);
          }
        },
        onChange: function onChange(data) {
          if (fromField.length) {
            fromField.val(data.from);
          }

          if (beforeField.length) {
            beforeField.val(data.to);
          }
        },
        onFinish: function onFinish(data) {
          if (fromField.length) {
            fromField.val(data.from);
          }

          if (beforeField.length) {
            beforeField.val(data.to);
          }
        },
        onUpdate: function onUpdate(data) {
          if (fromField.length) {
            fromField.val(data.from);
          }

          if (beforeField.length) {
            beforeField.val(data.to);
          }
        }
      });
    });
    $('[data-field=from], [data-field=before]').bind('input', function () {
      if ($(this).val().match(/[^0-9]/g)) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
      }
    });
    $('[data-field=from], [data-field=before]').on('blur', function () {
      var currentField = $(this);
      var valueField = parseInt(currentField.val());
      var filterContent = currentField.closest('.modal-filter__sl-item');
      var slider = filterContent.find('.modal-filter__sl-strip-input').data('ionRangeSlider');

      if (currentField.attr('data-field') === 'from') {
        slider.update({
          from: valueField
        });
      } else if (currentField.attr('data-field') === 'before') {
        slider.update({
          to: valueField
        });
      }
    });
  }); // Кнопка - открыть все фильтры

  $('#all-filters').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('#hiddenFilters').slideToggle();
  }); // Кнопка закрытия окна - фильтр

  $('#filter-close').on('click', function (event) {
    event.preventDefault();
    $('#filter-btn').removeClass('active');
    $('#modal-filter').fadeOut();
  }); // Кнопка поиска

  $('#search-btn').on('click', function (event) {
    event.preventDefault();
    $('#search-field').toggleClass('active');
    $('.categories__btn-icon').toggleClass('hidden');
  }); // Кнопка "Открыть все категории"

  $('#all-categories').on('click', function (event) {
    event.preventDefault();
    $('.category__all-categories').toggleClass('active');

    if (!$('.category__all-categories').hasClass('active')) {
      $('.category__all-categories').html('показать все <br> категории');
    } else {
      $('.category__all-categories').html('скрыть <br> категории');
    }

    ;
    $('.categories__category.hidden').slideToggle();
  }); // Табы

  function tabsActive(tabsNavBlock, tabsBlock) {
    $(tabsNavBlock).easytabs({
      updateHash: false,
      animate: true,
      panelContext: $(tabsBlock)
    });
  }

  tabsActive('#journal-nav', '#journal-tabs');
  tabsActive('#interview-nav', '#interview-tabs');
  tabsActive('#reviews-nav', '#reviews-tabs'); // Табы - блок "Журнал"
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
  // Попап - обратный звонок

  $('.modal').on('click', function (event) {
    event.preventDefault();
    var iDModal = $(this).attr('data-src');
    $.fancybox.open({
      src: iDModal,
      type: 'inline',
      opts: {
        closeExisting: true,
        gutter: 0,
        keyboard: true,
        arrows: false,
        infobar: false,
        smallBtn: true,
        modal: false,
        touch: false,
        animationEffect: 'fade',
        animationDuration: 300,
        transitionEffect: 'fade',
        transitionDuration: 300,
        hideScrollbar: true,
        hash: false,
        autoFocus: false,
        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-stage"></div>' + '</div>' + '</div>'
      }
    });
  }); // Кнопки социальных сетей

  if (window.pluso) if (typeof window.pluso.start == "function") return;

  if (window.ifpluso == undefined) {
    window.ifpluso = 1;
    var d = document,
        s = d.createElement('script'),
        g = 'getElementsByTagName';
    s.type = 'text/javascript';
    s.charset = 'UTF-8';
    s.async = true;
    s.src = ('https:' == window.location.protocol ? 'https' : 'http') + '://share.pluso.ru/pluso-like.js';
    var h = d[g]('body')[0];
    h.appendChild(s);
  }

  ;
});