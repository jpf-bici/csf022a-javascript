// The following comments are settings for various linters
// Not sure if a reported error matters? Look it up at http://linterrors.com/js
/*global console: false, window: false, document: false*/

/*jslint es5: true */
/*jslint node: false*/
/*jslint browser: true*/
/*jslint devel: true*/
/*jslint plusplus: true */

/*jshint es5: true */
/*jshint globalstrict: true*/
/*jshint jquery: true*/
/*jshint node: false*/
/*jshint browser: true*/
/*jshint devel: true*/

/*eslint-env jquery */
/*eslint-env browser*/
/*eslint no-console: 0*/

(function () {
  "use strict";
  // The DOM is now loaded and can be manipulated
  var DEBUG = true;
  $("button").button(); // Enhance buttons with jQueryUI
  var $form = $(document.forms.requestImagesForm);
  if (DEBUG) {
    console.log("$form", $form);
  }

  var requestImages = function () {
    var $submiticon = $("#submiticon");
    $submiticon
      //.removeClass("iconoir-wifi-off iconoir-search")
      //.addClass("iconoir-wifi spin");
      // the 2 lines above seemed to be a bug behavior w the icons,
      // so i changed them to the 2 lines below
      .removeClass("iconoir-wifi-off iconoir-wifi spin")
      .addClass("iconoir-search");
    // TODO: Write your code after this line in this requestImages function
    var flickerAPI =
      "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    // process user input (if different from default value 'Climate Change')
    $("#requestImagesForm").on("submit", function (e) {
      e.preventDefault(); // stops the mailto action
      let userInput = $("#searchTags").val();
      console.log(userInput);

      $("#images").empty(); // clear previous images

      // Make an AJAX request for JSONP data and append the item descriptions
      // (which include images) into the #images HTML element.
      // url for the Flickr public photo feed with JSON callback

      $.getJSON(flickerAPI, {
        tags: userInput,
        tagmode: "any",
        format: "json",
      })
        .done(function (data) {
          // .done(callback) Runs only when the AJAX request succeeds
          // Loop through each item (photo) in the response
          $.each(data.items, function (i, item) {
            // a. Replace all content inside the #images HTML element
            // Append the description right after the image
            // using the line provided in the final rubric:
            // $images.append($("<div>").append(item.description));
            // Note I changed it to $("#images") from $images
            // and it seems to append BOTH the image and the description
            $("#images").append($("<div>").append(item.description));
          });
          // Use the jQuery attr function to make ONLY all of the <a> elements (the links)
          // inside the div with the id of "images" have the target of "_blank" so when
          // users click on them they open in a new window or tab.
          $("#images a").attr("target", "_blank");

          // Add the class flickrimage to ONLY all of the img elements inside the div with the id of "images"
          $("#images img").addClass("flickrimage");

          // b. Animate the icon on the submit button by removing from the
          // $submiticon the iconoir-wifi-off, iconoir-wifi, and spin classes and
          // adding the iconoir-search class so the user will know the button can be
          // used again to search Flickr.
          $submiticon
            .removeClass("iconoir-wifi-off iconoir-wifi spin")
            .addClass("iconoir-search");
        })
        // Inside .fail let the user know that a failure occurred (which can
        // happen if your Wi-Fi is turned off) by:
        // a. Using the console.log function to say the search of Flickr failed.
        // b. Animate the icon on the submit button by removing from the
        // $submiticon the iconoir-search, iconoir-wifi, and spin classes and
        // adding the iconoir-wifi-off class to indicate to the user that the
        // search of Flickr failed.
        .fail(function () {
          console.log("Flickr search failed");
          $submiticon
            .removeClass("iconoir-search iconoir-wifi spin")
            .addClass("iconoir-wifi-off");
        });
    }); // on submit
  }; // closing: requestImages = function () {

  if ($form) {
    // TODO: Bind the submit event to a function that prevents
    // the default action
    // and then calls the requestImages function.
    $form.on("", function (event) {
      if (DEBUG) {
        console.log("Handler for $form.submit() called.");
      }
      // TODO: Prevent the default behavior of the form submit event, by
      // using the event parameter
      if (event) {
      }
      // TODO: Call the requestImages function

      // TODO: return false (the old way of preventing the default
      // behavior of the form submit event)
    });

    // Make the initial AJAX request as the page loads
    requestImages();
  }

  /* From https://graphicdon.com/2020/07/01/a-complete-guide-to-dark-mode-on-the-web/ */
  var btn = document.querySelector(".btn-toggle");
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  var currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.toggle("dark-theme");
  } else if (currentTheme === "light") {
    document.body.classList.toggle("light-theme");
  }

  btn.addEventListener("click", function (event) {
    if (DEBUG) {
      console.log("btn click event:", event);
    }
    var theme = "dark";
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      theme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
    } else {
      document.body.classList.toggle("dark-theme");
      theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    }
    localStorage.setItem("theme", theme);
  });
})(); // See: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
