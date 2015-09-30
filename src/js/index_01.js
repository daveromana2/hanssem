/**
 *--------------------------------------------------------------------------
 * css에서 다음 부분을 주석 처리 해 주어야 한다.
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
	var $one_depth = null;
	var $two_depth = null;

	init();
	initFunction();

	function init() {
		$one_depth = $('.one-depth');
		$two_depth = $('.two-depth');
	};

	function initFunction() {
		
		// two depth menu hide
		$two_depth.hide();

		// two depth menu show (slideDown)
		$one_depth.on('mouseenter focusin', function() {
			lnbSlideDown.call(this);
		});

		// two depth menu show (slideUp)
		$one_depth.on('mouseleave focusout', function() {
			lnbSlideUp.call(this);
		});

		mainShortCutSlide();
	}

	function lnbSlideDown() {
		var $this = $(this);
		$this.addClass('view');
		$('ul', $this).stop().slideDown();
	};

	function lnbSlideUp() {
		console.log(this);
		var $this = $(this);
		$this.removeClass('view');
		$('ul', $this).stop().slideUp();
	};
	
	function mainShortCutSlide() {
		/*window.setInterval(function(){
			var $mall_images = $('.mall-images');
			$mall_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$mall_images.append($('li:first',$mall_images));
					$mall_images.css('marginLeft','0');
			});
		}, 2000);
		window.setInterval(function(){
			var $interior_images = $('.interior-images');
			$interior_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$interior_images.append($('li:first',$interior_images));
					$interior_images.css('marginLeft','0');
			});
		}, 2000);
		window.setInterval(function(){
			var $kitchen_images = $('.kitchen-images');
			$kitchen_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$kitchen_images.append($('li:first',$kitchen_images));
					$kitchen_images.css('marginLeft','0');
			});
		}, 2000);
		window.setInterval(function(){
			var $ik_images = $('.ik-images');
			$ik_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$ik_images.append($('li:first',$ik_images));
					$ik_images.css('marginLeft','0');
			});
		}, 2000);*/
window.setInterval(function(){
			var $mall_images = $('.mall-images');
			$mall_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$mall_images.append($('li:first',$mall_images));
					$mall_images.css('marginLeft','0');
			});
			var $interior_images = $('.interior-images');
			$interior_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$interior_images.append($('li:first',$interior_images));
					$interior_images.css('marginLeft','0');
			});
			var $kitchen_images = $('.kitchen-images');
			$kitchen_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$kitchen_images.append($('li:first',$kitchen_images));
					$kitchen_images.css('marginLeft','0');
			});
			var $ik_images = $('.ik-images');
			$ik_images.animate({
					'marginLeft': '-240px'
				},
				'fast',
				'linear',
				function(){
					$ik_images.append($('li:first',$ik_images));
					$ik_images.css('marginLeft','0');
			});
		}, 2000);
	};

})(window, window.jQuery);