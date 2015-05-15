/* Copyright 2015 Jeremy Kohn. All rights reserved. */

(function () {
	"use strict";
	
	// jQuery document.ready shorthand
	// Plus, don't take chances with the global $ alias	

	jQuery(function ($) {
		
		console.log("Document ready. It is currently " + Date.now() + ".");

		var $grid = $('.scrolling-grid');

		function resetClickHandlers() {
			// Remove all click handlers for page elements.
			$('.note-graphic').off('click');
			$grid.off('click');
		}

		function activateResizableAndDraggable() {
			$('.note-graphic')
				.resizable({
					autoHide: true,
					containment: "parent",
					grid: [20, 0],
					handles: 'w, e',
					maxHeight: 19,
					minHeight: 19,
					minWidth: 20
				})
				.draggable({
					scroll: true,
					containment: "parent",
					grid: [20, 20]
				});
		}

		function deactivateResizableAndDraggable() {
			$('.note-graphic').draggable('option', 'cancel', '.note-graphic');
			$('.note-graphic').resizable('option', 'cancel', '.note-graphic');
		}

		function addNewNoteGraphic(xPosition, yPosition) {
			var x = xPosition.toString();
			var y = yPosition.toString();
			
			var locationOnGrid = "left+" + x + " top+" + y;
			var newNote = document.createElement('div');
			
			$(newNote).attr('class', 'note-graphic');
			$grid.append(newNote);
			$(newNote).position({
				my: "left top",
				at: locationOnGrid,
				of: $grid
			});
			
			$('.note-graphic').click(function (event) {
				event.stopPropagation();
				alert('Cannot create one note on top of another note.');
			});
		}
		
		$('.add-mode').click(function () {
			resetClickHandlers();

			// Add click listener on note graphics, to block creation of one note on top of another.
			$('.note-graphic').click(function (event) {
				event.stopPropagation();
				alert('Cannot create one note on top of another note.');
			});
			
			// Detect where user clicks on grid. Create note there.
			$grid.click(function (event) {
				var xOnGrid = event.pageX - $grid.offset().left;
				var yOnGrid = event.pageY - $grid.offset().top;
				var xCorrected = Math.floor(xOnGrid / 40) * 40 + 1;
				var yCorrected = Math.floor(yOnGrid / 20) * 20 + 1;
				addNewNoteGraphic(xCorrected, yCorrected); // 
			});
			
		});
		
		$('.edit-mode').click(function () {
			resetClickHandlers();
			activateResizableAndDraggable();
		});
		
		$('.remove-mode').click(function () {
			resetClickHandlers();
			$('.note-graphic').click(function () {
				$(this).remove();
			});
		});
		
	});
	
}());