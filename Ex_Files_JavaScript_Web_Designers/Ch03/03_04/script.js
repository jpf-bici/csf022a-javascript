(function() {
"use strict";

  document.getElementById("btn-estimate").addEventListener("submit", estimateTotal); 

  function estimateTotal(event) {
    event.preventDefault();
    console.log("Estimate Total button clicked.");
  } 


})();