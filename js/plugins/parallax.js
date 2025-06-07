// namespace: parallax

function acceleration_updates(x, y, event) {
	$('.subtle-parallax').each(function() {

		var dampening = ($(this).attr('data-parallax-dampening')) ? $(this).attr('data-parallax-dampening') : 1;
		var type = ($(this).attr('data-parallax-type') === "abs") ? 'px' : '%' ;

		if ($(this).attr('data-parallax-dir') !== "reverse")
			$(this).css("transform", "translateX( " + ( ( x / dampening ) / 100 ) + type + " )  translateY( " + ( ( y / dampening ) / 100 ) + type +" )");
		else
			$(this).css("transform", "translateX( " + (( ( x / dampening ) / 100 ) * -1) + type +" )  translateY( " + (( ( y / dampening ) / 100 ) * -1) + type +" )");
	});


	if ($('.the-center-point').length === 1) {
		if (Modernizr.touch) {
			var compass_X = Math.ceil(event.gamma * 60);
			var compass_Y = Math.ceil(event.beta * 60);
		} else {
			var compass_X = event.pageX;
			var compass_Y = event.pageY;
		}
		var box=$('.the-center-point');
		var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];

		var angle = Math.atan2(compass_X- boxCenter[0], - (compass_Y- boxCenter[1]) )*(180/Math.PI);

		if (angle < 0) {
			angle = angle + 360;
		}

		$('.parallax-background').css({"transform": "rotate( " + angle + "deg )", "transform-origin": "50% 50%"} );
	}

}

// TODO: Rework to not muck up the window global
$(document).ready(function() {
	if (Modernizr.touch) {
		window.ondeviceorientation = function(event) {
			var accelerationX = Math.ceil(event.gamma * 10);
			var accelerationY = Math.ceil(event.beta * 10);
			var x = (accelerationX - $('#center').offset().left) + $(window).scrollLeft();
			var y = (accelerationY - $('#center').offset().top) + $(window).scrollTop();

			acceleration_updates(x, y, event);
		}
	}
	else {
		$("html").mousemove(function(event) {
			var x = (event.clientX - $('#center').offset().left) + $(window).scrollLeft();
			var y = (event.clientY - $('#center').offset().top) + $(window).scrollTop();

			acceleration_updates(x, y, event);
		});
	}
});

