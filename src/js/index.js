/**
 *--------------------------------------------------------------------------
 * css에서 다음 부분의 주석을 제거해 주어야 한다.
	.lnb .two-depth {
		display: none;
	}
	.lnb > li.view .two-depth {
		display: block;
		animation-name: example;
		animation-duration: 1s;
	}
 *--------------------------------------------------------------------------
 */
;(function(global, $, undefined){
	'use strict';

	// lnb menu
	var $lnb_menu = null;
	var $one_depth = null;
	var $menu_target = null;
	var $menu_list = null;

	// family site list
	var $family_site_list = null;

	init();
	initFunction();

	function init() {
		$lnb_menu = $('ul.lnb');
		$one_depth = $('.one-depth');
		$menu_list = $('a', $one_depth);

		$family_site_list = $('.family-site li');
	};

	function initFunction() {
		// lnb menu view mouse event
		$one_depth.on('mouseenter', function() {
			lnbMenu.call(this, 'mouseenter');
		});
		// lnb menu hiden mouse event
		$lnb_menu.on('mouseleave', function() {
			lnbMenu('hiden');
		});
		// lnb menu view keyboard event
		$menu_list.on('focus', function() {
			lnbMenu.call(this, 'focus');
		});
		// lnb menu view keyboard event
		$family_site_list.first().on('focusin', function() {
			lnbMenu('hiden');
		});
	};

	// lnb menu action
	function lnbMenu(action) {
		menuTargetEmpty();
		if (action === 'hiden') {
			$menu_target = null;
			return false;
		} 
		if (action === 'mouseenter') {
			$menu_target = $(this);
		} else if (action === 'focus') {
			$menu_target = $(this).parents('li.one-depth');
		}
		$menu_target.addClass('view');
	};

	// menu target empty
	function menuTargetEmpty() {
		if($menu_target !== null) {
			$menu_target.removeClass('view');
		}
	};
})(window, window.jQuery);

;(function(global, $, undefined){
	'use strict';

	// language
	var $language = null;
	var $language_target = null;

	init();
	initFunction();

	function init() {
		$language = $('.language');
	};

	function initFunction() {
		// language target setting
		$language_target = $('.on', $language);

		// language change event
		$('a',$language).on('click', function() {
			languageChangeEvent.call(this,event);
		});

		// language change event
		function languageChangeEvent(event) {
			event.preventDefault();
			if($language_target !== null) {
				$language_target.removeClass('on');
			}
			$language_target = $(this);
			$language_target.addClass('on');
		};
	};
})(window, window.jQuery);

;(function(global, $, undefined){
	'use strict';

	// gallery slide
	var $gallery_contents = null;
	var $gallery_contents_list = null;
	var $gallery_images = null;
	var gallery_images_width = 0;
	var margin_left = 0;

	// button
	var $stop_start_btn = null;
	var $prev_btn = null;
	var $next_btn = null;

	var auto_slide = null;
	var slide_index = 0; // 0: slide auto play start   1: slide auto play stop

	var play_state = false; // true: animate 동작 되고 있는 중, false: animate 동작 멈춰 있는 중

	init();
	initFunction();

	function init() {
		$gallery_contents = $('.gallery-contents');
		$gallery_images = $('img', $gallery_contents);
		gallery_images_width = $gallery_images.css('width');

		$stop_start_btn = $('.stop-and-start');
		$prev_btn = $('.prev');
		$next_btn = $('.next');
		
	};

	function initFunction() {
		// gallery slide init
		gallerySlideInit();

		// gallery slide auto play
		gallerySlideAutoPlay();

		// gallery slide stop and start event
		$stop_start_btn.on('click', function(event) {
			event.preventDefault();
			gallerySlideAutoPlay();
		});

		// gallery slide prev event
		$prev_btn.on('click', function(event) {
			event.preventDefault();
			if(!play_state) {
				galleryPrevEvent();
			}
		});

		// gallery slide next event
		$next_btn.on('click', function(event) {
			event.preventDefault();
			if(!play_state) {
				galleryNextEvent();
			}
		});
	};

	// gallery slide init
	function gallerySlideInit() {
		$gallery_contents.prepend($('li:last', $gallery_contents));
		$gallery_contents.css('margin-left', '-'+gallery_images_width);
	};

	// gallery slide auto play
	function gallerySlideAutoPlay() {
		$stop_start_btn.toggleClass('stop');
		var class_list = $stop_start_btn.attr('class').split(' ');
		class_list.forEach(function(index) {
			if(index === 'stop') {
				slide_index = 1;
				return false;
			} else {
				slide_index = 0;
			}
		});
		if(slide_index === 0) {
			auto_slide = setInterval(function() {
				galleryNextEvent();
			}, 2500);
		} else {
			clearInterval(auto_slide);
		}
	};

	// gallery slide prev event
	function galleryPrevEvent() {
		play_state = true;
		$gallery_contents.stop().animate(
			{'margin-left':0}, 
			function(){
				$gallery_contents.prepend($('li:last', $gallery_contents));
				$gallery_contents.css('margin-left', '-'+gallery_images_width);
				play_state= false;
			}
		)
	};

	// gallery slide next event
	function galleryNextEvent() {
		play_state = true;
		margin_left = parseInt(gallery_images_width)*2+'px';
		$gallery_contents.stop().animate(
			{'margin-left':'-'+margin_left}, 
			function() {
				$gallery_contents.append($('li:first', $gallery_contents));
				$gallery_contents.css('margin-left', '-'+gallery_images_width);
				play_state= false;
			}
		)
	};

})(window, window.jQuery);

;(function(global, $, undefined){
	'use strict';

	// main short cut slide
	var $images = null;
	var margin_left = 0;

	init();
	initFunction();

	function init() {
		$images = $('ul', '.image-view');
		margin_left = $('li', $images).css('width');
	};

	function initFunction() {
		slideAutoPlay();
	};

	// image slide 갯수 만큼 function 실행.
	// 인자값으로 각각의 image slide 영역의 ul을 전달.
	function slideAutoPlay() {
		for(var i = $images.length-1; i >= 0 ; i--) {
			slidePlay($images.eq(i));
		}
	};

	function slidePlay($images) {
		setInterval(function(){
			$images.animate(
				{'margin-left': '-'+margin_left},
				function(){
					$images.append($('li:first', $images));
					$images.css('margin-left','0');
				}
			)
		}, 2000)
	};
})(window, window.jQuery);

;(function(global, $, undefined){
	'use strict';

	var $news_title = null;

	init();
	initFunction();

	function init() {
		$news_title = $('.news li>a');
	};

	function initFunction() {
		titleLengthCheck();
	};

	function titleLengthCheck() {
		$news_title.each(function(key,value){
			if($(value).html().length >33) {
				$(value).html($(value).html().slice(0, 33)+'...');
			} 
		});
	};
})(window, window.jQuery);