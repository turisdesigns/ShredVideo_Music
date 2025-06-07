/*	-------------------------------------
	:: Fake Scripts
	---------------------------------- */
	/*
	* These are fake scripts used to demonstrate the video flag and encoding functionality.
	*/

$( document ).ready(function() {

 	/* Common Variables */
	var videoInfo = $('.video-info'),
		fullOverlay = $('.full-overlay'),
		playButton = $('.vjs-big-play-button'),
		uploadStatus = $('.upload-status'),
		uploadFlagged = $('.upload-flagged'),
		uploadProccessing = $('.upload-processing');



	/* Display the Flagged Video Message */
	$('.flag-video a').on("click", function(fl) {
		fl.preventDefault();

		/* If video-info has been hidden (only possible via playing video) */
		if ( videoInfo.hasClass('hide') ) {
			videoInfo.removeClass('hide'); /* Show it */
			fullOverlay.addClass('show'); /* Show it */
			videojs("UNIQUE-VIDEO-ID").pause();
		}

		/* Enable the overlays and show the message */
		playButton.addClass('hide');
		uploadStatus.addClass('show');
		fullOverlay.addClass('show');
		uploadFlagged.addClass('show');
	});



	/* Display the Encoding Message*/
	$('.encode-trigger').click(function(et) {
		et.preventDefault();

		/* Undo the Flagged Message, then show Encoding */
		uploadFlagged.removeClass('show');
		uploadProccessing.addClass('show');
	});
});

