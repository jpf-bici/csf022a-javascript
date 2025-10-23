/**
 * @author Baba Kofi Weusijana
 */
// Ask Question 1, if the user's answer is No then ask Question 2:
// Works, but could be better if you are not using confirmResult for something
// else
var confirmResult;
confirmResult = confirm("Question 1: Please click 'OK' to answer Yes, or click 'Cancel' to answer No.");
if (confirmResult) {
	alert("Your answer to Question 1 was 'Yes'.");
} else {
	confirmResult = confirm("Your answer to Question 1 was 'No'.\nQuestion 2: Please click 'OK' to answer Yes, or click 'Cancel' to answer No.");
	if (confirmResult) {
		alert("Your answer to Question 2 was 'Yes'.");
	} else {
		alert("Your answer to Question 2 was 'No'.");
	}
}

// Better: shorter and no need for a variable
if (confirm("Question 1: Please click 'OK' to answer Yes, or click 'Cancel' to answer No.")) {
	alert("Your answer to Question 1 was 'Yes'.");
} else if (confirm("Your answer to Question 1 was 'No'.\nQuestion 2: Please click 'OK' to answer Yes, or click 'Cancel' to answer No.")) {
	alert("Your answer to Question 2 was 'Yes'.");
} else {
	alert("Your answer to Question 2 was 'No'.");
}

// Here is a case where you need two pieces of information and thus a boolean
// variable is a good idea:
// Works, but if-statements could simpler
var badWeather = confirm("Was the weather bad?\n"
		+ "Please click 'OK' to answer Yes, or click 'Cancel' to answer No.");
var numTrees = Number(prompt("How many trees did you plant?", "0"));// 0 is the default
if (numTrees > 0) {
	if (badWeather === false) {
		alert("Thanks!");
	} else {
		alert("Thanks for planting in bad weather!");
	}
} else {
	// No trees were planted
	if (badWeather === true) {
		alert("Please try again when the weather improves.");
	} else {
		alert("Please try again later.");
	}
}

// Better: shorter by using the boolean value directly and using the not
// operator (!)
badWeather = confirm("Was the weather bad?\n"
		+ "Please click 'OK' to answer Yes, or click 'Cancel' to answer No.");
numTrees = Number(prompt("How many trees did you plant?", "0"));
if (numTrees > 0) {
	if (!badWeather) {
		alert("Thanks!");
	} else {
		alert("Thanks for planting in bad weather!");
	}
} else {
	// No trees were planted
	if (badWeather) {
		alert("Please try again when the weather improves.");
	} else {
		alert("Please try again later.");
	}
}