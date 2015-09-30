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

	// gallery
	var $images = null;
	var images_width = null;
	var $gallery_contents = null;
	var $stop_and_start_btn = null;
	var $prev_btn = null;
	var $next_btn = null;
	var margin_left = 0;
	var event_state = null;
	var stop_state = 0;

	init();
	initFunction();

	function init() {
		$one_depth = $('.one-depth');
		$two_depth = $('.two-depth');

		$images = $('.gallery-contents img');
		images_width = $images.css('width');
		$gallery_contents = $('.gallery-contents');
		$stop_and_start_btn = $('.stop-and-start');
		$prev_btn = $('.prev');
		$next_btn = $('.next');
	};
	function initFunction() {
		// two depth menu hied
		$two_depth.hide();
		
		// two depth menu show
		$one_depth.on('mouseenter', function(){
			twoDepthMenuShow.call(this);
		});
		// two depth menu hide
		$one_depth.on('mouseleave', function(){
			twoDepthMenuHide.call(this);
		});

		// gallery slide init event
		gallerySlideInit();

		// gallery auto paly
		gallerySlideAuto();

		// gallery button event
		$stop_and_start_btn.on('click', function() {
			galleryStartAndStopEvent.call(this,event);
		});
		$prev_btn.on('click', function() {
			galleryPrevEvent(event);
		});
		$next_btn.on('click', function() {
			galleryNextEvent(event);
		});

		// short cut image auto play
		mainShortCutSlide();
	
	};

	// two depth menu show
	function twoDepthMenuShow() {
		var $this = $(this);
		// console.log(this);
		$this.addClass('view');
		$this.children('.two-depth').stop().slideDown();
	};
	// two depth menu hide
	function twoDepthMenuHide() {
		var $this = $(this);
		$this.removeClass('view');
		$this.children('.two-depth').stop().slideUp();
	}

	// gallery slide init event 
	function gallerySlideInit() {
		margin_left = '-'+images_width;
		$gallery_contents.prepend($('li:last', $gallery_contents));
		$gallery_contents.css("margin-left","-960px");
	}

	// gallery auto paly
	function gallerySlideAuto() {
		$stop_and_start_btn.removeClass('stop');
		event_state = setInterval(function(){
			galleryNextEvent();
		}, 2000)
	}

	// gallery button event (auto play stop or start event)
	function galleryStartAndStopEvent(event){
		event.preventDefault();
		var $this = $(this);
		var classList = null;
		
		$this.toggleClass('stop');
		classList = $this.attr('class').split(' ');
		// console.log(classList);
		classList.forEach(function(index){
			console.log(index);
			if (index === 'stop') {
				stop_state =1 ; // stop
				return false
			} else {
				stop_state = 0;
			}
		});
		if(stop_state===0) {
			event_state = setInterval(function(){
				galleryNextEvent();
			}, 2000);
		} else {
			clearInterval(event_state);
		}
	};

	// gallery button event (prev button event)
	function galleryPrevEvent(event) {
		event.preventDefault();
		margin_left = images_width;
		// console.log(margin_left);
		$gallery_contents.animate(
			{'margin-left': 0},
			600,'easeOutCubic',
			function () {
				$gallery_contents.prepend($('li:last', $gallery_contents));
				$gallery_contents.css("margin-left", '-'+margin_left);
			}
		);
	};

	// gallery button event (next button event)
	function galleryNextEvent(event) {
		if (event !== undefined) {
			event.preventDefault();
		}
		margin_left = '-'+parseInt(images_width)*2+'px';
		// console.log(margin_left);
		$gallery_contents.animate(
			{'margin-left': margin_left},
			600,'easeOutCubic',
			function () {
				$gallery_contents.append($('li:first', $gallery_contents));
				$gallery_contents.css("margin-left", '-'+images_width);
			}
		);
	};

	// short cut image auto play
	function mainShortCutSlide() {
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
		}, 2000);
	};
})(window, window.jQuery);