/**
 * @author Baba Kofi Weusijana
 * Whenever you find you are using while(true), break, or continue, there is probably a better way to write your code.
 * The same goes for using "for (;;) {".
 */
/*global window:false, $:false*/
/*jslint browser:true*/
var main = function() {
	"use strict";
	var max = 100;
	var i;

	/* This code will probably lock-up your browser because it has an infinite loop
	i = 0;
	while (true) {
	$("#content").append(++i+" ");
	}
	$("#content").append("<br/>");
	*/

	// Works, but sloppy
	i = 0;
	while (true) {
		$("#content").append(++i + " ");
		if (i > max) {// If max is too high you could still lock-up your browser and the bug could be hard to find and fix
			break;
		}
	}
	$("#content").append("<br/>");

	// Not sure of how to start? Use a boolean variable instead! 
	// Then refacter (improve the code without changing its purpose) later.
	var notFinishedYet = true;
	i = 0;
	while (notFinishedYet) {
		$("#content").append(++i + " ");
		if (i > max) {
			notFinishedYet = false;
		}
	}
	$("#content").append("<br/>");

	// Refactored to be simpler/better!
	i = 0;
	while (i <= max) {
		$("#content").append(++i + " ");
	}
	$("#content").append("<br/>");

	// If you must run the loop at least once, you can use a do-while loop
	i = 0;
	do {
		$("#content").append(++i + " "); // This line will allways run at least once
	} while (i <= max); // before this boolean test is considered
	$("#content").append("<br/>");
};
window.onload = main;
