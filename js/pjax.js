$(document).ready(function() {
	if (typeof $.fn.pjax === "function") {
		$(document).pjax('a.ajax', '#main', {
			maxCacheLength: 0,
			timeout: 4000
		});
	}
});

$(document).on('pjax:send', function() {
	animate_loader(40);
	scrollTo( 0, 500 );

	$('.dropdown-menu').removeClass('nav-opened');

	if ($('.hamburger').hasClass('active')) {
		$('.hamburger').click();
	}

	if ($('.search').hasClass('active')) {
		$('.search').click();
	}
});

$(document).on('pjax:complete', function() {
	ga('send', 'pageview');

	$('meta[replace]', 'head').remove();
	$('meta', '#main').each(function() {
		$(this).detach().appendTo('head');
	});

	$('link[replace]', 'head').remove();
	$('link', '#main').each(function() {
		$(this).detach().appendTo('head');
	});
});

$(document).on('pjax:success', function () {
	animate_loader(70);
});

$(document).on('pjax:end', function() {

	window.rebind_caf();
	window.rebind_responsive_background_images();
	window.rebind_scrollto();

	animate_loader(100);
})

$(document).on('pjax:click', function(event) {
	animate_loader(10);

	$(event.target).addClass('loading')
});

$(document).on('pjax:timeout', function(event) {
	event.preventDefault();
});

var animate_loader = function(percent) {
	$('#loader-bar').css( { 'width': percent + 'vw' } )
	if (percent === 100) {
		setTimeout(function() {
			$('#loader-bar').delay(750).fadeOut(250, function() {
				animate_loader(0)
			});
		}, 250)
	} else {
		$('#loader-bar').fadeIn(0);
	}
}

