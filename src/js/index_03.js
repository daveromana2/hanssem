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
			lnbMenuMouseenter.call(this);
		});
		// lnb menu hiden mouse event
		$lnb_menu.on('mouseleave', function() {
			lnbMenuHiden();
		});
		// lnb menu view keyboard event
		$menu_list.on('focus', function() {
			lnbMenuFocus.call(this);
		});
		// lnb menu view keyboard event
		// 마지막 a태그에서 blur 될 경우 lnbMenuHiden 함수를 실행시키도록 하였는데, 그럴 경우 이상하게 동작.
		// 그래서 family_site_list 에 포커스가 갈 경우 menu list는 접히도록 구현.
		$family_site_list.first().on('focusin', function() {
			lnbMenuHiden();
		});
	};

	// lnb menu hiden event
	function lnbMenuHiden() {
		menuTargetEmpty();
		$menu_target = null;
	};
	// lnb menu view mouse event
	function lnbMenuMouseenter() {
		menuTargetEmpty();
		$menu_target = $(this);
		$menu_target.addClass('view');
	};
	// lnb menu view keyboard event
	function lnbMenuFocus() {
		menuTargetEmpty();
		$menu_target = $(this).parents('li.one-depth');
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
		$stop_start_btn.on('click', function() {
			gallerySlideAutoPlay(event);
		});

		// gallery slide prev event
		$prev_btn.on('click', function() {
			galleryPrevEvent(event);
		});

		// gallery slide next event
		$next_btn.on('click', function() {
			galleryNextEvent(event);
		});
	};

	// gallery slide init
	function gallerySlideInit() {
		$gallery_contents.prepend($('li:last', $gallery_contents));
		$gallery_contents.css('margin-left', '-'+gallery_images_width);
	};

	// gallery slide auto play
	function gallerySlideAutoPlay(event) {
		if (event != null) {
			event.preventDefault();
		}
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
	function galleryPrevEvent(event) {
		event.preventDefault();
		$gallery_contents.animate(
			{'margin-left':0}, 
			function(){
				$gallery_contents.prepend($('li:last', $gallery_contents));
				$gallery_contents.css('margin-left', '-'+gallery_images_width);
			}
		)
	};

	// gallery slide next event
	function galleryNextEvent(event) {
		if (event != null) {
			event.preventDefault();
		}
		margin_left = parseInt(gallery_images_width)*2+'px';
		$gallery_contents.animate(
			{'margin-left':'-'+margin_left}, 
			function(){
				$gallery_contents.append($('li:first', $gallery_contents));
				$gallery_contents.css('margin-left', '-'+gallery_images_width);
			}
		)
	};
})(window, window.jQuery);

;(function(global, $, undefined){
	'use strict';

	// main short cut slide
	var $mall_images = null;
	var $interior_images = null;
	var $kitchen_images = null;
	var $ik_images = null;

	var margin_left = 0;

	init();
	initFunction();

	function init() {
		$mall_images = $('.mall-images');
		$interior_images = $('.interior-images');
		$kitchen_images = $('.kitchen-images');
		$ik_images = $('.ik-images');

		margin_left = $('li', $mall_images).css('width');
	};

	function initFunction() {
		slideAutoPlay($mall_images);
		slideAutoPlay($interior_images);
		slideAutoPlay($kitchen_images);
		slideAutoPlay($ik_images);
	};

	function slideAutoPlay($images) {
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