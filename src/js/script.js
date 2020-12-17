$(function () {
  /* Поддержка svg спрайтов в IE 11 */
  svg4everybody();

   /* Боковое меню */
  $('.pull__wrapper').on('click', function() {
    $('#mobile-nav').addClass('mobile-nav_visible');
  });
  $('#mobile-nav-close').on('click', function() {
    $('#mobile-nav').removeClass('mobile-nav_visible');
  });
  $('.mobile-nav__background').on('click', function() {
    $('#mobile-nav').removeClass('mobile-nav_visible');
  });

  // Модальное окно - каталог
  $('#catalog-btn').on('click', function (event) {
    event.preventDefault();
    if ($('#filter-btn').hasClass('active')) {
      $('#filter-btn').removeClass('active');
      $('#modal-filter').stop(true, true).fadeOut();
    }
    
    $(this).toggleClass('active');
    $('#modal-catalog').stop(true, true).fadeToggle();
  });

  // Кнопка закрытия окна - каталог
  $('#catalog-close').on('click', function (event) {
    event.preventDefault();
    $('#catalog-btn').removeClass('active');
    $('#modal-catalog').stop(true, true).fadeOut();
  })

  // Модальное окно - фильтр
  $('#filter-btn').on('click', function (event) {
    event.preventDefault();
    if ($('#catalog-btn').hasClass('active')) {
      $('#catalog-btn').removeClass('active');
      $('#modal-catalog').stop(true, true).fadeOut();
    }
  
    $(this).toggleClass('active');
    $('#modal-filter').stop(true, true).fadeToggle();
    
  // Селекты в фильтре
    $('.modal-filter__select').styler({
      selectSmartPositioning: false
    });

    $('.modal-filter__sl-currency').styler({
      selectSmartPositioning: false
    })

    // Настройка рэнджслайдера
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

  });

  // Кнопка - открыть все фильтры
  $('#all-filters').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
    $('#hiddenFilters').stop(true, true).slideToggle();
  });

   // Кнопка закрытия окна - фильтр
  $('#filter-close').on('click', function (event) {
    event.preventDefault();
    $('#filter-btn').removeClass('active');
    $('#modal-filter').stop(true, true).fadeOut();
  });

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
    
    $('.categories__category.hidden').stop(true, true).slideToggle();
  });

  // Табы
  function tabsActive (tabsNavBlock, tabsBlock) {
    $(tabsNavBlock).easytabs({
      updateHash: false,
      animate: false,
      panelContext: $(tabsBlock)
    });
  }

  tabsActive('#journal-nav', '#journal-tabs');
  tabsActive('#interview-nav', '#interview-tabs');
  tabsActive('#reviews-nav', '#reviews-tabs');

  // Попап - обратный звонок

  $('.modal').on('click', function (event) {
    event.preventDefault()

    let iDModal = $(this).attr('data-src');

    $.fancybox.open({
      src  : iDModal,
      type : 'inline',
      opts : {
        closeExisting: true,
        gutter: 0,
        keyboard: true,
        arrows: false,
        infobar: false,
        smallBtn : true,
        modal: false,
        touch: false,
        animationEffect: 'fade',
        animationDuration: 300,
        transitionEffect: 'fade',
        transitionDuration: 300,
        hideScrollbar: true,
        hash: false,
        autoFocus: false,
        baseTpl:
					'<div class="fancybox-container" role="dialog" tabindex="-1">' +
					'<div class="fancybox-bg"></div>' +
					'<div class="fancybox-inner">' +
					'<div class="fancybox-stage"></div>' +
					'</div>' +
					'</div>'
      }
    });
  });

  // Кнопки социальных сетей
  (function() {
    if (window.pluso)if (typeof window.pluso.start == "function") return;
    if (window.ifpluso==undefined) { window.ifpluso = 1;
      var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
      s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
      s.src = ('https:' == window.location.protocol ? 'https' : 'http')  + '://share.pluso.ru/pluso-like.js';
      var h=d[g]('body')[0];
      h.appendChild(s);
    }})();

// Табы в карте
   $('#map').easytabs({
    updateHash: false,
    animate: false,
    panelContext: $('#map-tabs')
  });

// Карта яндекса
  if ($('div').is('#map')) {
    ymaps.ready(init);

    function init() {
  
    // Создание карты.
    var myMap = new ymaps.Map("map-ya", {
      center: [55.75624906897797,37.65862549999994], 
      zoom: 16,
      controls: []
    }),
      // Метка на карте
      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'ул. Земляной Вал, д.35, стр.1',
        balloonContent: 'CapitalRent'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'images/pin.png',
      // Размеры метки.
      iconImageSize: [44, 52],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-22, -25]
    })
    
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors
      // Отключаем часть включенных по умолчанию поведений:
      .disable(['scrollZoom']);
    };
  
    ymaps.ready(function () {
      // Ищем панораму в переданной точке.
      ymaps.panorama.locate([55.75624906897797,37.65862549999994]).done(
        function (panoramas) {
          if (panoramas.length > 0) {
              var player = new ymaps.panorama.Player('panorama', panoramas[0], {
                controls: [],
                suppressMapOpenBlock: true
              });
              player.lookAt([55.75624906897797,37.65862549999994]);
          }
        }
      );
    })
  }
  
  // Табы в избранном
  $('#favorites-nav').easytabs({
    updateHash: false,
    animate: false,
    panelContext: $('#favorites-tabs')
  });

  // Кнопка копии
  var clipboard = new ClipboardJS('.copy__btn');

  clipboard.on('success', function(e) {
    function hideToolTip() {
      $(e.trigger).siblings('.copy__tooltip').stop(true, true).fadeOut()
    }

    $(e.trigger).siblings('.copy__tooltip').stop(true, true).fadeIn();
    $(e.trigger).mouseleave(hideToolTip());

    setTimeout(() => hideToolTip(), 3000);
    e.clearSelection();
  });

  /* Табы для сравнения объектов и карусель */
  $('#compare-nav').easytabs({
		updateHash: false,
		animate: false,
		// tabs: '.tabs__nav > li',
		panelContext: $('#compare-tabs'),
	})
  .bind('easytabs:before', function(event, $clicked, $targetPanel, settings) {
    if ($('.comparison__tab .owl-loaded').length) {
    	$('.comparison__tab .owl-loaded').trigger('destroy.owl.carousel')
    }
  })
  .bind('easytabs:after', function(event, $clicked, $targetPanel, settings) {
    carouselInit($('#' + $targetPanel[0].id).children('.comparison__tab-content'))
  });

  $('.comparison__tab.active .comparison__tab-content').each(function() {
    carouselInit($(this));
  });
  
  function carouselInit(thisObjects) {

    thisObjects.owlCarousel({
      items: 1,
      navContainer: '#tab-arrow',
      nav: true,
      slideBy: 1,
      autoplay: false,
      loop: false,
      dots: false,
      margin: -2,
      center: true,
      responsive: {
        480:{
          items: 2,
          nav: true,
          navContainer: '#tab-arrow',
        },
        600:{
          items: 2,
          nav: true,
          navContainer: '#tab-arrow',
          center: false,
        },
        768:{
          items: 2,
          nav: true,
          navContainer: '#tab-arrow',
          center: false,
        },
        990:{
          items: 3,
          nav: true,
          navContainer: '#tab-arrow',
          center: false,
        },
        1200:{
          items: 4,
          nav: true,
          navContainer: '#tab-arrow',
          center: false,
        },
        1440:{
          items: 5,
          nav: true,
          navContainer: '#tab-arrow',
          center: false,
        }
      }
    });
  }

  // Селекты в каталоге
  $('.catalog-select__select').styler({
    selectSmartPositioning: false
  });

  // Селекты в боковом фильтре
  $('.filter__select').styler({
    selectSmartPositioning: false
  });

  $('.filter__sl-currency').styler({
    selectSmartPositioning: false
  })

  // Настройка рэнджслайдера
  $('.filter__sl-strip-input').each(function () {
    var slider = $(this);
    var sliderContent = slider.closest('.filter__sl-item');
    var fromField = sliderContent.find('[data-field=from]');
    var beforeField = sliderContent.find('[data-field=before]');
    var minValue = parseInt(slider.attr('data-min'));
    var maxValue = parseInt(slider.attr('data-max'));
    var fromValue = parseInt(slider.attr('data-from'));
    var beforeValue = parseInt(slider.attr('data-before'));
    var unit = ' млн';
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
          if (fromField.attr('data-cost')) {
            fromField.attr('placeholder', data.min + unit);
            fromField.val(data.from + unit);
          } else {
            fromField.attr('placeholder', data.min);
            fromField.val(data.from);
          }
        }
  
        if (beforeField.length) {
          if (fromField.attr('data-cost')) {
            beforeField.attr('placeholder', data.max + unit);
            beforeField.val(data.to + unit);
          } else {
            beforeField.attr('placeholder', data.max);
            beforeField.val(data.to);
          }
        }
      },
      onChange: function onChange(data) {
        if (fromField.length) {
          if (fromField.attr('data-cost')) {
            fromField.val(data.from + unit);
          } else {
            fromField.val(data.from);
          }
        }
  
        if (beforeField.length) {
          if (fromField.attr('data-cost')) {
            beforeField.val(data.to + unit);
          } else {
            beforeField.val(data.to);
          }
        }
      },
      onFinish: function onFinish(data) {
        if (fromField.length) {
          if (fromField.attr('data-cost')) {
            fromField.val(data.from + unit);
          } else {
            fromField.val(data.from);
          }
        }
  
        if (beforeField.length) {
          if (fromField.attr('data-cost')) {
            beforeField.val(data.to + unit);
          } else {
            beforeField.val(data.to);
          }
        }
      },
      onUpdate: function onUpdate(data) {
        if (fromField.length) {
          if (fromField.attr('data-cost')) {
            fromField.val(data.from + unit);
          } else {
            fromField.val(data.from);
          }
        }
  
        if (beforeField.length) {
          if (fromField.attr('data-cost'))  {
            beforeField.val(data.to + unit);
          } else {
            beforeField.val(data.to);
          }
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
    var filterContent = currentField.closest('.filter__sl-item');
    var slider = filterContent.find('.filter__sl-strip-input').data('ionRangeSlider');
  
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

  // Открыть еще фильтры в боковом меню
  $('.filter__all-filters').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');

    if (!$(this).hasClass('active')) {
      $('.filter__all-filters-text').html('еще фильтры');
    } else {
      $('.filter__all-filters-text').html('скрыть фильтры');
    };

    $('.filter__block.hidden').stop(true, true).slideToggle();
  });

  // Кнопка - открыть/показать фильтр
  $('#filter-switcher').on('click', function(e) {
    e.preventDefault();
    $('.catalog__filter').stop(true, true).slideToggle();
  });

  // Валидация инпутов с радио кнопками
  $('[data-number="number"]').bind('input', function () {
    if ($(this).val().match(/[^0-9]/g)) {
      $(this).val($(this).val().replace(/[^0-9]/g, ''));
    }
  });

  // Подставить значения радио в инпут
  $('.filter__radio-input').on('change', function() {

    const parentBlock = $(this).closest('.filter__sl-item-top');
    const input = parentBlock.find('.filter__sl-input');

    input.val($(this).val());
  });
  
  // Прилипание бокового фильтра
  $(window).bind("load resize", function(){
		if(window.innerWidth > 1439) {
			$(".catalog__aside").stick_in_parent({
				offset_top: 0
			});
		} else{
			$(".catalog__aside").trigger("sticky_kit:detach");
		}
  });
  
   /* Плавный скролл */
   $(".arrow-up").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  // Табы в каталоге
    $('#options-nav').easytabs({
      updateHash: false,
      animate: false,
      panelContext: $('#options-tabs')
    });

  // Поиск по буквам и выбор станции
  $('[data-filter="filter"]').on('keyup', function () {

    const input = $(this)[0];
    const inputValue = input.value.toUpperCase();
    const dropdown = $('[data-dropdown="dropdown"]')[0];
    const dropdownItems = dropdown.getElementsByTagName('li');
    let i;

    for (i = 0; i < dropdownItems.length; i++) {
      var a = dropdownItems[i].querySelector('.metro__station');

        if (a.innerHTML.toUpperCase().indexOf(inputValue) === 0) {
          dropdownItems[i].style.display = "block";
        } else {
          dropdownItems[i].style.display = "none";
        }
    };
  });

  $('.metro-search__dropdown-item').on('click', function() {

    const input = $('[data-filter="filter"]');
    const metroBlock = $(this).find('.metro__station')

    input.val(metroBlock.text());
  });

  // Кастомный скролл в фильтре
  $('.scrollbar-inner').scrollbar();
});