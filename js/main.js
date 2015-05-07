/* Copyright 2015 Jeremy Kohn. All rights reserved. */

(function () {
	"use strict";


	// Find some way to move script to head of HTML, I think.


	// jQuery document.ready shorthand
	// Plus, don't take chances with the global $ alias	
	jQuery(function($){	
		
		console.log("Document ready. It is currently " + Date.now() + ".");
		
		// init note graphic?		
		$('.note-graphic')
			.resizable({autoHide: true, containment: "parent", grid: [20, 0], handles: 'w, e', maxHeight: 20, minHeight: 20, minWidth: 20})
			.draggable({scroll: true, containment: "parent", grid: [20, 20]});			
		// Does that need to be done for each new note graphic? I think probably yes.

		// Create new DOM element --
		// https://api.jquery.com/jQuery/


		

		$('#add-note').click(function(){
			alert("Time to add a note.");
			
			// Create div element, insert as child of parent element '#grid'
			
			// Preferably the user will specify where. Dropdown menu for now? Or numeric input with range?
			// Oh, also save the note data to .data(key, value) or better yet .data(object), where object = {pitch: "", start_time: , end_time: }
			
			// And probably add resizable and draggable to it.
		});
		
		
		// No, this is when I add keyboard input. 
		// (I think.)
		
		// Default add position --
		// 1/4 (or 1/8?) after most recently added note. 
		
		
		// Default note size -- Right now it's 1/8.
		// Allow smaller?
		
		
		

		$('#remove-note').click(function(){
			alert("Click note to remove.");
			$('.note-graphic').click(function() {
				// Remove div, 
				// and also remove click handler from all other note graphics.
				$('.note-graphic').click(function(){}); // Though would that interfere with draggable/resizable?
			});
		});



	});
	
	
}());




// Saw somewhere why it clicks prematurely --
// I think on SO somewhere.
// Which browser?

// Oh -- it's because 'alert' should be wrapped in a function first.