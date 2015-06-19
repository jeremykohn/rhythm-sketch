/* Copyright 2015 Jeremy Kohn. All rights reserved. */

(function () {
    "use strict";

	// Shorthand for jQuery document ready.
	// Also, assign $ to jQuery in local scope to avoid collisions with other libraries.
	jQuery(function($) {

		console.log("Page loaded " + performance.now() + " ago.");
        console.log("Document ready. It is currently " + Date.now() + ".");

		var recordingStartTime = 0;

		var newNote = {};
		// Change this to more full-featured version later.

		var settings = {
			pixelsPerMillisecond: 0.080, // Comes from beats per second (120 beats per minute / 60), * pixels per beat (which is 40 if each beat is assumed 1/4 note), / 1000
			// pixelsPerMillisecond: 0.008, // Just for demo purpopses
			tempo: 120, // beats per minute
			beat: '1/4'
		};
		



		///////////

		// Move function definitions to separate file/plugin/library?

		//////////

		// Also other functions -- jsonInit, jsonUpdate, localStorageInit, localStorageUpdate
		
		function reloadNoteGraphics() {
			// Read localstorage and create, init, position note graphics.
			// Also re-create json object.
		}
		
		// Update one at a time, or all at once?
		// And update when? Add note, remove note, edit note, all? Or just when switch mode? Or when user clicks 'save'?

		function updateNotesObject() {
		}
		
		
		function updateLocalStorage() {
			
		}

		function resetNotes() { // Separate function for 'resetNoteGraphics()'?
			// Including clear localStorage, json object
			// Also re-init localStorage, json object? Or keep that separate? Or just leave them there, just delete content
		}

		///////////


		function resetGridListeners() {
			$('#grid').off('click'); // Remove 'Create note here,' etc.
        }

        function resetNoteGraphicListeners() {
			$('.note-graphic').resizable('disable').draggable('disable'); // Disable editability.			
			$('.note-graphic').off('click'); // Remove 'Cannot add note on top of another note,' etc.
        }

		function resetAllListeners() {
			resetGridListeners();			
			resetNoteGraphicListeners();
		}

        function initEditable($noteGraphic) {
            $noteGraphic.resizable({
                autoHide: true,
                containment: "parent",
                grid: [20, 0],
                handles: 'w, e'
            }).draggable({
                scroll: true,
                containment: "parent",
                grid: [20, 20]
            });
        }

		function enableClickToAdd($grid) {
			$grid.click(function (event) {
				console.log('Click on grid');
				// Encapsulate some of these?
                var clickX = event.pageX - $grid.offset().left;
                var clickY = event.pageY - $grid.offset().top;
                var notePositionX = Math.floor(clickX/40) * 40 + 1; // Instead of 40, make it 20 if placing half-beats.
                var notePositionY = Math.floor(clickY/20) * 20 + 1;

                addNoteGraphic(notePositionX, notePositionY, 39); // Not necessarily 39 -- might change the default length.
            });
		}

		function enableEditable($noteGraphics) {
			$noteGraphics.resizable('enable').draggable('enable');
		}
		
		function disableEditable($noteGraphics) {
			$noteGraphics.resizable('disable').draggable('disable');
		}
		
		function preventStackingNotes($noteGraphics) {
			$noteGraphics.click(function (event) {
                event.stopPropagation();
                alert('Cannot create one note on top of another note.');
            });
		}
			

		function noteGraphicInit($newNoteGraphic) {
			// Remember this gets called in add mode.
			$newNoteGraphic.attr('class', 'note-graphic');
			// Or, newNote.className = 'note-graphic'; 
			// Or use element.classList.add('class-name'); (though not supported in IE 9)			
			
			initEditable($newNoteGraphic);
			disableEditable($newNoteGraphic);
			preventStackingNotes($newNoteGraphic);
		}
		
 
        function addNoteGraphic(x, y, noteLength) { // Or create?

			console.log('Add new note graphic');
			
			// This does a bunch of different things -- 
			// Creates div, init (class, editable, click handler), sets position & length, places on grid

			// Might need another function for live recording.

			var locationOnGrid = "left+" + x.toString() + " top+" + y.toString();			
            var newNote = document.createElement('div');
			var $newNote = $(newNote);
			
			noteGraphicInit($newNote);
			$('#grid').append(newNote);
			
            /////////////

			// Now, set length and position on grid.
			// Encapsulate this? 
			// setLocation($newNote, x, y, noteLength);
			// How about while recording, when length keeps changing?
			
			// Might return a note graphic object from one function, 
			// then position it (after setting width) using another function.
			
			$newNote.width(noteLength); 
			console.log("New note width is now " + $newNote.width());
			// Or could use newNote.style.width in vanilla JS, I think.

			// Position on grid.
            $newNote.position({
                my: "left top",
                at: locationOnGrid,
                of: $('#grid')
            });
			
			// Append here, or has to be earlier?
			
			// Update json & localstorage here? Or all at once, like when click 'save' or change mode, or stop recording?
        }
		// During recording, updateNoteGraphic? (By changing its width constantly)
		
		// create
		// setLocation
		// updateLocation

		// Trouble is, 'position' implies x and y but not length.
		// Location?

		function enableClickToRemove() { // or clickToRemove, or enableClickToRemove
            $('.note-graphic').click(function () {
                $(this).remove();
				// Update JSON, localstorage?
				// If so, identify which note got removed, or run through all note objects and update json based on those?
				// Or, update entire JSON based on notes, then after a delay update entire localStorage based on json?
            });
			
		}
		
		///////////
		
		function setOnTimer(startTime, frequency) {
			console.log('On timer is set. Start time and frequency are ' + startTime + ', ' + frequency);
			setTimeout(function() {
				console.log('On now. Time is ' + performance.now() + '. Frequency is ' + frequency);

				// timbre.js == pitch on
				

			}, startTime);
		}

		function setOffTimer(endTime, frequency) {
			console.log('Off timer is set. End time and frequency are ' + endTime + ', ' + frequency);
			setTimeout(function() {
				console.log('Off now. Time is ' + performance.now() + '. Frequency is ' + frequency);
				// timbre.js == pitch off
				// Or, just to test it, remove pitch (or frequency) from text field
				// And/or deactivate corresponding piano key (that matches pitch)
			}, endTime);
		}

		// How many setTimeouts can there be at once without affecting performance?
			// (Performance -- relative timing of note playback. Also CPU load.)
		
		function convertPositionToFrequency(position) {
			var keyNumber, frequency;
			
			// Right now, top key is number 51 (B4)
			keyNumber = 51 - Math.floor(position / 20);
			
			// Formula from https://en.wikipedia.org/wiki/Piano_key_frequencies			
			frequency = 440 * Math.pow( 2, (keyNumber - 49)/12 );			
			// Or, use array/object? Probably not necessary, just use formula. It's quick, just once per note graphic.
			
			console.log('Key number and frequency are ' + keyNumber + ', ' + frequency);
			return frequency;
			// Round it first? (Check input format of timbre.js and other libraries)
		}
		
		
		///////////


        $('#add-mode').click(function () {
			// Update JSON, localStorage?
			resetAllListeners();
            preventStackingNotes($('.note-graphic')); // Alert to block creation of one note on top of another.
			enableClickToAdd($('#grid')); // Detect where user clicks on grid. Create note there.
        });

        $('#edit-mode').click(function () {
			// Update JSON, localStorage?
			resetAllListeners();
            enableEditable($('.note-graphic'));
        });

        $('#remove-mode').click(function () {
			// Update JSON, localStorage?
			resetAllListeners();
			enableClickToRemove($('.note-graphic'));
        });


		// Remember -- In all three modes, adding / removing / moving a note must also update JS object, and possibly localStorage as well.
		// Unless updates are periodic, or upon save, or change mode, etc.



		////////
		
		$('#rhythm-entry').on('mousedown', function(){
			console.log('Mousedown');
			var mouseDownTime = performance.now();
			
			if (!recordingStartTime) { // Remember, 'stop recording' sets recordingStartTime to zero.
				recordingStartTime = mouseDownTime;
			}
			newNote.startTime = mouseDownTime - recordingStartTime;
			console.log('New note starts at ' + newNote.startTime);
			// newNote.initialize(newNote.startTime); // Or don't do anything for now.
		});
		
		$('#rhythm-entry').on('mouseup', function(){
			var mouseUpTime = performance.now();
			newNote.endTime = mouseUpTime - recordingStartTime;

			// newNote.finalize(newNote.startTime, newNote.endTime); // Also reset startTime, endTime?
			
			// Or for now, just add note, like before.
			
			var startPosition = newNote.startTime * settings.pixelsPerMillisecond + 1; 
			var endPosition = newNote.endTime * settings.pixelsPerMillisecond + 1;
			
			var length = endPosition - startPosition;  // Min. width 19px. Change that for live recording?
			
			console.log('New note starts at ' + newNote.startTime);
			console.log('New note ends at ' + newNote.endTime);
			
			console.log('Start position is ' + startPosition + ', end position is ' + endPosition);
			console.log('Length should be ' + length);
			addNoteGraphic(startPosition, 221, length); // 221 pixels here is the default recording position. (Middle C.) Can change it later.

		});	


		

		
		
		$('#pause-recording').click(function() {
			var currentPosition = $('.grid-container').scrollLeft; // Use env variable? Get from scroll position?
			console.log('Pause recording. Position is ' + currentPosition);
			// Pause at current recording location
			// Keep playhead, and scroll position, where they are.
		});
		
		$('#stop-recording').click(function() {
			// Reset to beginning
			recordingStartTime = 0;
			// Also scroll to beginning of grid.
			$('.grid-container').scrollLeft(0);
		});
		
		
		
		
		///////////
		
		// Remember, record mode is on when page loads.
		// Or is it?
		// Make restoration from localstorage optional?
		// Or, menu that allows you to select from multiple stored sets of notes? (Labeled with date/time created (and/or modified))
		
		
		$('#record-mode').click(function() {
			
			// Unhide 'click to sketch'
			
			// Change 'record mode' to 'stop recording'			
			
			// Listen for click on that
				// Then, create & initialize note, width 0, .5 trasnparent,
				// keep updating width
				// When mouseup, .25 transparent
		});	
		
		/////////
		
		$('#start-playing').click(function() {
			// Start scroll
			// Also add setTimeout to all note graphics, based on position (ie offset relative to parent).
			console.log('Play start');
			var $noteGraphics = $('.note-graphic');

			// Optimize later, with JS forEach instead of jQuery $().each?
			$noteGraphics.each(function(index, noteGraphic) {
				var startPosition, 
					startTime, 
					endPosition, 
					endTime, 
					height,
					notePitch,
					$noteGraphic = $(noteGraphic);
				
				startPosition = $noteGraphic.position().left;
				startTime = startPosition / settings.pixelsPerMillisecond;
				startTime = Math.round(startTime);
				
				endPosition = startPosition + $noteGraphic.width();
				endTime = endPosition / settings.pixelsPerMillisecond;
				endTime = Math.round(endTime);

				height = $noteGraphic.position().top;
				notePitch = convertPositionToFrequency(height);

				setOnTimer(startTime, notePitch);
				setOffTimer(endTime, notePitch);
				
				// Alternative -- might try later --
				// when recording, or when querying all notes at once,
				// store milliseconds in note object, and playback from those.
				
				// Round milliseconds to 20, and synchronize with betterInterval?
				// Or, in betterInterval check to see which on/off times, pitches are between (let's say) 101 and 120?
				// (And turn some pitches on/off accordingly.)
			});
			
			// Might break up that 'each' into subroutines.
			// Or might not.
			
		});
		
		/////////////////
		
		// Keyboard test & recording
		
		// $('#keyboard-test').click(function() {
			// document.getElementById('keyboard-test').value = "Keyboard test off";
			
			console.log("Keyboard test on.");
			
			// Environment variables.
			var keysPressed = {}; // which piano keys are being playing
			var startTimes = {} // when each piano key started playing
			var soundObjects = {}; // timbre.js objects

			var recordingStartTime = 0;
			// Also -- Clear all note graphics?
			
			
			var keyDownListener = document.addEventListener('keydown', function(event) {

				console.log('Key down');

				var keyDownTime = performance.now();
				var pianoKeyNumber = pianoLayout[event.code] || null;
				console.log('Piano key number is');
				console.log(pianoKeyNumber);	
				
				var frequency = 440 * Math.pow( 2, (pianoKeyNumber - 49)/12 );
				console.log('Key number is ' + pianoKeyNumber + ', frequency is ' + frequency);
				// Formula from (http://en.wikipedia.org/wiki/Piano_key_frequencies)
				// Or, could pre-calculate frequencies for each note // var frequency = frequencies.pianoKeyNumber	

				if (!recordingStartTime) {
					recordingStartTime = keyDownTime;
					console.log('Started recording at ' + recordingStartTime + ' which hopefully is similar to ' + performance.now()); 
					// Also start scrolling.
				}
				
				if (pianoKeyNumber) {
					keysPressed.pianoKeyNumber = true;
				}
				
				if (!soundObjects.pianoKeyNumber) {
					soundObjects.pianoKeyNumber = T('sin', {freq: frequency});
				}
				
				console.log(startTimes.pianoKeyNumber);
				startTimes.pianoKeyNumber = keyDownTime - recordingStartTime;
				console.log(startTimes.pianoKeyNumber);
				
				
				soundObjects.pianoKeyNumber.play();

				console.log('Key ' + pianoKeyNumber + ' pressed. Playing note of frequency ' + frequency + '.');
				console.log('Key start time is ' + startTimes.pianoKeyNumber);
				
				// Also start creating & displaying note graphic.
				
				// Also highlight the corresponding piano key -- 
				// var pianoKeyOverlay = document.getElementById('key-' + pianoKeyNumber); // Caution! If that key doesn't exist, sound won't stop playing after keyup.
				// console.log(pianoKeyOverlay);
				// if (pianoKeyOverlay) {
				// 	console.log('Highlight the div element ' + pianoKeyOverlay);
				// 	pianoKeyOverlay.style.opacity = 0.5;
				// }
				
			});

			// When a key is released, stop playing note
			var keyUpListener = document.addEventListener('keyup', function(event) {
				


				var keyUpTime = performance.now();
				var pianoKeyNumber = pianoLayout[event.code] || null;
				var currentNoteObject = soundObjects.pianoKeyNumber;				


				console.log('Key up.');
				console.log(startTimes);
				console.log(pianoKeyNumber);
				console.log(startTimes.pianoKeyNumber);


				var noteStartTime = startTimes.pianoKeyNumber;
				var noteEndTime = keyUpTime - recordingStartTime;
				
				var noteGraphicStartX = (noteStartTime * settings.pixelsPerMillisecond) % 1000;
				var noteGraphicEndX = (noteEndTime * settings.pixelsPerMillisecond) % 1000;
				var noteGraphicLength = noteGraphicEndX - noteGraphicStartX + 20;
								
				var noteGraphicStartY = (63 - pianoKeyNumber) * 20 + 1; // For now, off screen for lower rows.


				console.log('Note started at ' + noteStartTime + ', ' + ' ended at ' + noteEndTime);
				console.log('Note graphic starts at ' + noteGraphicStartX + ', ' + ' ends at ' + noteGraphicEndX);


				// Sanity checks -- see if this key was actually down before it was up
				if (!keysPressed.pianoKeyNumber) {
					console.log('For some reason, this key wasn\'t down before it was up.');
				}
				if (noteStartTime) {
					console.log('Seems this note has a start time.');
				}
				
				
				if (pianoKeyNumber) {
					addNoteGraphic(noteGraphicStartX, noteGraphicStartY, noteGraphicLength);
					// Or 'finalize note graphic' if the keydown listener already started drawing it.				
				
					// Stop playing note.
					if (currentNoteObject) {
						currentNoteObject.pause();
						console.log('Paused note.');
					}


					// Also un-highlight the corresponding piano key
					// pianoKeyOverlays.pianoKeyNumber.style.opacity = 0;	
	


					keysPressed.pianoKeyNumber = false;
					startTimes.pianoKeyNumber = 0;
				}
			});
			

			// Finally, click to turn off keyboard test mode.
			// $('#keyboard-test').click(function(){
			// 				document.getElementById('keyboard-test').value = "Keyboard test on";				
			// 				document.removeEventListener('keydown', keyDownListener);
			// 				document.removeEventListener('keyup', keyUpListener);
			// 			});
			
			// removeEventListener seems not to be working. Try jQuery version instead?
			// Or, 
			// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
			// https://stackoverflow.com/questions/19469881/javascript-remove-all-event-listeners-of-specific-type
			// http://buildingwebapps.blogspot.com/2012/04/removing-anonymous-event-listeners-in.html
		// });
			

    }); // End of jQuery function

}()); // End of IIFE
