//https://codepen.io/prvnbist/pen/GQMPZq
$( () => {
	
	//On Scroll Functionality
	$(window).scroll( () => {
		var windowTop = $(window).scrollTop();
		windowTop > 300 ? $('header').addClass('fixed') : $('header').removeClass('fixed');
	});
	
	//Click Logo To Scroll To Top
	$('#logo').on('click', () => {
		$('html,body').animate({
			scrollTop: 0
		},500);
	});
	

	
	
});






// http://jsfiddle.net/4nuzM/1/

$(document).ready(function() {

    function checkWidth() {
        var windowSize = $(window).width();

       
        if (windowSize < 900) { // if window is less than 600 use the below. with 200px buffer - Mobile Version
            console.log("screen width is less than 900");
      
      		//Smooth Scrolling Using Navigation Menu
	$('a[href*="#"]').on('click', function(e){
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 200
		},300);
		e.preventDefault();
	});
      	

        }
        
        else { // if window is more than 600 use the below. with 120 buffer - Desktop Version 
   
	//Smooth Scrolling Using Navigation Menu
	$('a[href*="#"]').on('click', function(e){
		$('html,body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 120
		},500);
		e.preventDefault();
	});
	


            console.log("screen width is greater than or equal to 960");
        }
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});
