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

  // TODO: In the requestImages function, make an AJAX request for JSONP data
  // and append the item descriptions (which include images) into the #images
  // HTML element.
  // See the example called "Loads the four most recent pictures of Mount
  // Rainier from the Flickr JSONP API."
  // at: https://api.jquery.com/jQuery.getJSON/
  // but get the tags from the #searchTags form HTML element.
  // Make sure you use jQuery's .done and .fail AJAX methods.
  //
  // Inside .done you must
  // a. Replace all content inside the #images HTML element
  // so it doesn't have content from other AJAX requests in it.
  // You must use this line of code to get an item's description
  // (this is required in the rubric):
  // $images.append($("<div>").append(item.description));
  // Display all the items, unlike the example which only loads 4 items from
  // Flickr.
  // b. Animate the icon on the submit button by removing from the
  // $submiticon the iconoir-wifi-off, iconoir-wifi, and spin classes and
  // adding the iconoir-search class so the user will know the button can be
  // used again to search Flickr.
  // c. At the end of the .done function you need to alter the new elements
  // just successfully loaded from Flickr:
  // Use the jQuery attr function to make ONLY all of the <a> elements (the links)
  // inside the div with the id of "images" have the target of "_blank" so when
  // users click on them they open in a new window or tab. Also add the class
  // flickrimage to ONLY all of the img elements inside the div with the id of "images"
  // so that will be animated bigger with a blue glowing outline if a user hovers
  // their mouse over it.
  //
  // Inside .fail let the user know that a failure occurred (which can
  // happen if your Wi-Fi is turned off) by:
  // a. Using the console.log function to say the search of Flickr failed.
  // b. Animate the icon on the submit button by removing from the
  // $submiticon the iconoir-search, iconoir-wifi, and spin classes and
  // adding the iconoir-wifi-off class to indicate to the user that the
  // search of Flickr failed.
  var requestImages = function () {
    var $submiticon = $("#submiticon");
    $submiticon
      .removeClass("iconoir-wifi-off iconoir-search")
      .addClass("iconoir-wifi spin");
    // TODO: Write your code after this line in this requestImages function
    var flickerAPI =
      "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    // process user input (if different from default value 'Climate Change')
    $("#requestImagesForm").on("submit", function (e) {
      e.preventDefault(); // stops the mailto action
      let userInput = $("#searchTags").val();
      console.log(userInput);

      // Make an AJAX request for JSONP data and append the item descriptions
      // (which include images) into the #images HTML element.
      // url for the Flickr public photo feed with JSON callback

      $.getJSON(flickerAPI, {
        tags: userInput,
        tagmode: "any",
        format: "json",
      }).done(function (data) {
        // .done(callback) Runs only when the AJAX request succeeds
        // Loop through each item (photo) in the response
        // .each is jQuery’s way of doing a loop
        // same as modern JS: data.items.forEach((item, i) => { ... });
        $.each(data.items, function (i, item) {
          // Append the image
          // Create a new <img> element and set its src to the photo URL
          /*
              This is classic jQuery DOM manipulation:
              $("<img>")
              Creates a new jQuery object wrapping a new <img> element (not yet in the page).
              .attr("src", item.media.m)
              Sets the src attribute of that <img> to the photo URL.
              item.media.m is where Flickr stores the URL for a medium-sized image.
              .appendTo("#images")
              Appends this <img> element to the element with id="images".
              After this line runs, you now have an <img> inside <div id="images">.
              */
          $("<img>").attr("src", item.media.m).appendTo("#images");
          //
          // Append the description right after the image
          // using the line provided in the final rubric
          // very messy as there is a bunch of html
          //$("#images").append($(item.description));
          //
          // Better UI is to append only the photo title
          $("#images").append($("<p>").text(item.title));
        });
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
