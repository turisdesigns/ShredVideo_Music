(function ($) {
	$(function () {
		setTimeout(function() {
			$('.ca-tweet').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				if (detector.os === "iOS") {
					if ($(this).hasClass('mention')) {
						$('body').append('<iframe class="twitter-detect" src="twitter://post?message=' + $(this).attr('data-tweet-content') + '" />');
					} else if ($(this).hasClass('profile')) {
						$('body').append('<iframe class="twitter-detect" src="twitter://user?screen_name=' + $(this).attr('data-tweet-username') + '" />');
					}
				} else {
					window.open($(this).attr('href'), '_blank');
				}
			});

			$('.ca-facebook').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				window.open($(this).attr('href'), '_blank');
			});
		}, 10);
	});
})(jQuery);
