function escape_reg_exp(string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replace_all(string, find, replace) {
	return string.replace(new RegExp(escape_reg_exp(find), 'g'), replace);
}

Math.clip = function(number, min, max) {
	return Math.max(min, Math.min(number, max));
}

window.rebind_caf = function() {
	$('.caf').each(function() {
		if (typeof $._data($(this)[0], "events") === "undefined") {
			$(this).on('click', function(e) {
				e.preventDefault();
				window[$(this).attr('data-func')](this);
			});
		}
	});
}

window.rebind_magnific = function() {
	if (typeof $.fn.magnificPopup !== "undefined") {
		$('.popup-vimeo').magnificPopup({
			type:'iframe'
		});
	}
}

/* TODO: Rework to use jquery scrollto with custom easing */
window.rebind_scrollto = function() {
	$('.scrollto').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		/* Remove the active mobile menu, no matter what */
		$('body, html').removeClass('nav-open search-open');
		$('.hamburger, .search').removeClass('active');

		if ($('[data-section="' + $(this).attr('data-scrollto') + '"]').length === 1) {
			scrollTo( $('[data-section="' + $(this).attr('data-scrollto') + '"]').offset().top - ($('header').innerHeight() + $('.page-navigation').innerHeight() - 2) , 700);
		}
	});
}

/* TODO: edit to fire only at certain sizes (>651, 651-1000, 1000+) */
window.rebind_responsive_background_images = function() {
	$( '[data-bgimg]' ).each(function() {
		/* make the data usable */
		var source_set = atob($( this ).attr( 'data-bgimg' )),
			source_set = replace_all( source_set,'\'', '"' ),
			initial_element = this;

		var items = JSON.parse( source_set );

		window.reasses_background_images(items, initial_element);

		$(window).off('resize.reasses_background_images');

		$(window).on('resize.reasses_background_images', function() {
			window.reasses_background_images(items, initial_element);
		});
	});
}

/* This function is dependant on the rebind_responsive_background_images function, it will swap images out on load */
window.reasses_background_images = function(items, initial_element) {
	var bg_img = items['default'];

	/***
	 * This each will go test the first entry all the way to the last entry for matches, with each match
	 * overriding the bg_img variable.
	 **/
	$.each( items, function(media_query, image_uri) {
		/* feel free to clone this if you'd like to add new hardcoded names, this one checks for "mobile" */
		media_query = ( media_query === "mobile" ) ? '(max-width: 640px)' : media_query;

		if (Modernizr.mq(media_query)) {
			bg_img = image_uri;
		}
	});

	/* TODO: Cache these images so we don't request them on resize. */
	$(initial_element).css('background-image', 'url("' + bg_img + '")');
}

window.prevent_widows = function() {
	$('h1, h2, h3, h4, h5, h6, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, p', '.kitchensink').each(function() {
		if ( ( ! $(this).hasClass('widowed') ) && ( ! $(this).parent().hasClass('widowed'))) {
			var wordArray = $(this).html().split(" ");
			if (wordArray.length > 1) {
				wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
				wordArray.pop();
				$(this).html(wordArray.join(" "));
				$(this).addClass('widowed', true);
			}
		}
	});
}

window.adjust_figcaptions = function() {
	if ($(window).innerWidth() >= 1200) {
		$('figcaption').each(function() {
			$(this).css('margin-top', '-'+$(this).innerHeight()+'px');
		});
	} else {
		$('figcaption').each(function() {
			if (typeof $(this).attr('style') !== "undefined")
			$(this).removeAttr('style');
		});
	}
};

window.rebind_figcaptions = function() {
	window.adjust_figcaptions();

	$(window).off('resize.adjust_figcaptions');

	$(window).on('resize.adjust_figcaptions', function() {
		window.adjust_figcaptions();
	});
};

window.add_zooming_icon = function() {
	$('img[data-action="zoom"]').wrap( "<div class='zoomable-image'></div>" );

	$('[data-action="zoom"]').each(function() {
		if (this.width >= ($(window).width() - 80)) {
			$(this).parent().addClass('🎉');
			rebind_3dtouch_image_zoom(this.parentElement);
		} else {
			$(this).parent().removeClass('🎉');
			unbind_3dtouch_image_zoom(this.parentElement);
		}
	});

	$(window).off('resize.zooming_icon');

	$(window).on('resize.zooming_icon', function() {
		$('[data-action="zoom"]').each(function() {
			if (this.width >= ($(window).width() - 80)) {
				$(this).parent().addClass('🎉');
				rebind_3dtouch_image_zoom(this.parentElement);
			} else {
				$(this).parent().removeClass('🎉');
				unbind_3dtouch_image_zoom(this.parentElement);
			}
		});
	});
}

window.rebind_article_progress = function() {
	setTimeout(function() {
		if ($('body').hasClass('single-blog')) {
			var winHeight = $(window).height(),
				docHeight = $('article').height(),
				progressBar = $('progress'),
				max, value;

			/* Set the max scrollable area */
			max = docHeight - winHeight * 0.5;
			progressBar.attr('max', max);

			$(document).on('scroll.rebind_article_progress', function(){
				value = $(window).scrollTop();
				progressBar.attr('value', value);

				if (value >= max) {
					progressBar.addClass('done');
				} else {
					progressBar.removeClass('done');
				}
			});
		} else {
			$(document).off('scroll.rebind_article_progress');
		}
	}, 1000);
}

window.check_for_progressive_images = function(){
	$('.progressive_image.js-not_loaded').each(function() {
		if ($(this).offset().top <= $(window).scrollTop() + ( $(window).innerHeight() - ( $(window).innerHeight() / 24 ) ) ) {
			$(window).off('scroll.load_progressive_images');
			$(this).removeClass('js-not_loaded');

			var has_zoom = ($(this).hasClass('has_zoom')) ? 'data-action="zoom"' : '';

			var picture_array = JSON.parse(atob($('.js-swap-for-picture').attr('data-image_info')));

			var largest_image, source = '';

			$.each(picture_array, function(key, val) {
				source += '<source srcset="' + val + '" media="' + key + '" />';
				largest_image = val;
			});

			var picture_tag = '<picture src="' + largest_image + '" ">';
			picture_tag += source;

			picture_tag += '<img srcset="' + largest_image + '" alt="…" ' + has_zoom + ' />';
			picture_tag += '</picture>';

			$('.js-swap-for-picture', this).replaceWith(picture_tag);

			rebind_progressive_images();
		}
	});
};

window.rebind_progressive_images = function() {
	check_for_progressive_images();

	$(window).on('scroll.load_progressive_images', function() {
		check_for_progressive_images();
	});
};

// The Actual ScrollTo Function
function scrollTo(e,d) {
	var page = $("html, body");

	page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() {
		page.stop();
	});

	page.animate({ scrollTop: e }, d, function() {
		page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
	});

	return false;
}
