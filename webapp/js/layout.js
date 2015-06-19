/* 

Computer keys mapped to piano keys. 

Diagram:

                                 1 2    4 5 6    8 9    - = backspace
                              tab q w  e r t y  u i o  p [ ] \
     a s d    g h    k l ;
shift z x c  v b n  m , . / 

Lower two rows: piano keys 21 through 39 (F2 through B4).
Upper two rows: piano keys 40 through 63 (C4 through B5).

*/

var pianoLayout = (function () {

	return {
		// "ShiftRight": 0,		
		// "ShiftLeft": 21,
        "Shift": 21,		
        "KeyA": 22,
        "KeyZ": 23,
        "KeyS": 24,
        "KeyX": 25,
        "KeyD": 26,
        "KeyC": 27,
        "KeyV": 28,
        "KeyG": 29,
        "KeyB": 30,
        "KeyH": 31,
        "KeyN": 32,
        "KeyM": 33,
        "KeyK": 34,
        "Comma": 35,
        "KeyL": 36,
        "Period": 37,
        "Semicolon": 38,
        "Slash": 39,
        "Tab": 40,
        "Digit1": 41,
        "KeyQ": 42,
        "Digit2": 43,
        "KeyW": 44,
        "KeyE": 45,
        "Digit4": 46,
        "KeyR": 47,
        "Digit5": 48,
        "KeyT": 49,
        "Digit6": 50,
        "KeyY": 51,
        "KeyU": 52,
        "Digit8": 53,
        "KeyI": 54,
        "Digit9": 55,
        "KeyO": 56,
        "KeyP": 57,
        "Minus": 58,
        "BracketLeft": 59,
        "Equal": 60,
        "BracketRight": 61,
        "Backspace": 62,
        "Backslash": 63
	};
	
}());

// That's with KeyboardEvent.code (each physical key is coded as a string).
// Older browsers use KeyboardEvent.keyCode.
// Fortunately there's a polyfill. 
// https://github.com/inexorabletash/polyfill/blob/master/keyboard.js
