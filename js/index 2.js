(function($) {


$( () => {
	
	//On Scroll Functionality
	$(window).scroll( () => {
		var windowTop = $(window).scrollTop();
		windowTop > 150 ? $('header').addClass('fixed') : $('header').removeClass('fixed');
		// windowTop > 200 ? $('body').addClass('fixed') : $('body').removeClass('fixed');
	
	});



});



// http://jsfiddle.net/4nuzM/1/

$(document).ready(function() {

    function checkWidth() {
        var windowSize = $(window).width();

       
        if (windowSize < 600) { // if window is less than 600 use the below. with 200px buffer - Mobile Version
            console.log("screen width is less than 600");
      
      	
      	//Smooth Scrolling Using Navigation Menu Start
			$('a[href*="#"]').on('click', function(e){
				$('html,body').animate({
					scrollTop: $($(this).attr('href')).offset().top - 200
				},500);
				e.preventDefault();
			});
		// Smooth Scroll END

        }
        
        else { // if window is more than 600 use the below. with 120 buffer - Desktop Version 
   

	


            console.log("screen width is greater than or equal to 960");
        }
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});



