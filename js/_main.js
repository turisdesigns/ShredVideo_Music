/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to wp/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

 (function($) {

	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.
	var GM = {
		// All pages
		common: {
			init: function() {

				if ($('[data-section="' + window.location.hash + '"]').length === 1) {
					var scrolling_animation = setTimeout(function() { scrollTo($('[data-section="' + window.location.hash + '"]').offset().top, 1500); }, 2000);
				}

				// TODO: rework without detector.js
				if (detector.os === "Windows") {
					$('html').addClass('windows');

					if (detector.browser === "Microsoft Internet Explorer") {
						var real_version = detector.browserVersion.split('.');
						$('html').addClass('ie' + real_version[0]);
					}
				} else if (detector.os === "Mac OS X") {
					$('html').addClass('macosx');
				}

				if (detector.browser === "Safari") {
					$('html').addClass('safari');
				}

				window.rebind_scrollto();
				window.rebind_caf();
				window.rebind_responsive_background_images();

				$(window).on('scroll', function() {
					var header_height = $(window).scrollTop() * 1.125;
					header_height = (header_height <= 0) ? 0 : header_height;
					header_height = (header_height >= 45) ? 45 : header_height;
					header_height = 120 - header_height

					$('header.banner').css( { 'height': header_height } );
					$('.dropdown-menu', 'header.banner').css( { 'margin-top': ((header_height / 2) - 32) * -1 } );

					if ($(window).scrollTop() <= 45) {
						$('header.banner').removeClass('mini')
					} else {
						$('header.banner').addClass('mini')
					}
				})

				// Uncomment this if you need to make dropdown togglable

				// $('.dropdown-toggle').on('click', function(e) {
				// 	e.preventDefault();
				// 	$(this).toggleClass('opened');

				// 	if ($(this).hasClass('opened')) {
				// 		$(this).parent().parent().addClass('submenu-opened');
				// 	} else {
				// 		$(this).parent().parent().removeClass('submenu-opened');
				// 	}
				// });
			}
		}
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function(func, funcname, args) {
			var namespace = GM;
			funcname = (funcname === undefined) ? 'init' : funcname;
			if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function() {
			UTIL.fire('common');

			$.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
				UTIL.fire(classnm);
			});
		}
	};

	$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
