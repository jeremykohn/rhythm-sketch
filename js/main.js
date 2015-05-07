/* Copyright 2015 Jeremy Kohn. All rights reserved. */

(function () {
	"use strict";

	jQuery(function($){	
		
		console.log("Document ready. It is currently " + Date.now() + ".");
	
		$('.note-graphic')
			.resizable({autoHide: true, containment: "parent", grid: [20, 0], handles: 'w, e', maxHeight: 20, minHeight: 20, minWidth: 20})
			.draggable({scroll: true, containment: "parent", grid: [20, 20]});		

		$('#add-note').click(function(){
			alert("Time to add a note.");

		});

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
