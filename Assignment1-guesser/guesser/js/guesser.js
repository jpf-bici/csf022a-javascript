// The following comments are settings for various linters
/*jslint es6: true*/ // Causes an "Unexpected 'es6'." warning in JSLint that you should ignore.
/*jshint globalstrict: true*/
/*jshint esversion: 6 */
/*jshint jquery: false*/
/*jshint node: false*/
/*jshint browser: true*/
/*jshint devel: true*/
/*eslint-env es6*/
/*eslint-env jquery: false*/
/*eslint-env browser*/
/*eslint no-console: 0*/

/*
 * INSTRUCTIONS:
 * Use ES6 or above for this assignment.
 * 
 * Make a guessing game where the computer guesses what the human user's secret
 * number is between 0 and 100 (inclusive). Do NOT use Arrays,
 * do NOT use a linear search algorithm, and do NOT use the prompt functions!
 * 
 * Use if-else and confirm("some question") inside the while-loop.
 * The human is expected to click the cancel button to indicate No
 * (and thus the confirm function returns false)
 * or the OK button to indicate Yes (confirm function returns true).
 * 
 * Do NOT change the line "guess = Math.round((min + max) / 2);"
 * because the computer is supposed to guess efficiently by
 * asking the human if their secret number is higher, lower, or equal to
 * the computer's current guess.
 * 
 * Do NOT use break or continue. You can use the "return;" statement inside
 * the while-loop to get the computer to leave the guesser function.
 * 
 * For info on how while loops work see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
 * For info on how return works see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
 * For info on how arrrow function expressions work see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 */
const guesser = event => {
	let min = 0;
	let max = 100;
	// JP: Initial guess will be half way between mon and max fpr binary search
	// JP: original file had:  let guess = 0; 
	let guess = Math.round((min + max) / 2); 
	// If this guesser function was called correctly both event.currentTarget
	// and the this variable should be the window object. If event is undefined you probably
	// changed the code at the end of this file even though you are not allowed to.
	console.log("this:", this);
	console.log("event.currentTarget:", event.currentTarget);

	// JP: alert creates a window object with an OK button
	// and displays the desired string inside the window.
	// The code will wait at this line until the user clicks the OK button.
	alert("Think of a number between " + min + " and " + max + ".");

	while (min <= max) {
		guess = Math.round((min + max) / 2);
		// TODO: Add your code below here ONLY!
		// JP: confirm creates a window with OK and Cancel buttons
		// and a string. Returns true if user clicks 'OK', false if 'Cancel'.
		// If true, the alert statement is executed, and return exits the while loop. 
		// If false, the else statement is executed.
		if (confirm("Did you pick " + guess + "?" + "\nPlease click 'OK' to answer Yes, \nor click 'Cancel' to answer No.")) {
			alert("I guessed your number! It is " + guess);
			return;  // exit the while loop 
		}
		// executes if guess is not correct
		else {
			let temp = confirm("If your number higher than " + guess + " press OK, \nelse press Cancel.");
			if (temp) {
				// user's number is higher than guess
				// resets min to guess + 1 (we know guess is not the answer)
				min = guess + 1;  
				console.log("min = " + min + ", max = " + max);  // to debug
			}
			else {
				// user's number is lower than guess
				// resets max to guess - 1 (we know guess is not the answer)
				max = guess - 1; 
				console.log("min = " + min + ", max = " + max);  // to debug
			}
		}


		// TODO: Move or remove the next line. It is only here to prevent an infinite
		// loop.

		// return; JP commented this out
		
		// TODO: Add your code above here ONLY!
	}

	alert("I could not guess your number. I think you are cheating!");
};
// guesser is now an arrow function that takes a parameter it refers to as event.
window.onload = guesser;
// When the window's page is loaded it will call guesser(event).