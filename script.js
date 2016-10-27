$(document).ready(function() {
  var newQuote = "";
  var newAuthor = "";
  var quoteIsLoaded = false;

  function getQuote() {
    quoteIsLoaded = false;
    $("#getQuote").prop('disabled', true);
    dotOne();
    $.ajax({
      dataType: "json",
      url: "https://crossorigin.me/http://api.forismatic.com/api/1.0/?            method=getQuote&format=json&lang=en",
      cache: false,
      success: getNewQuote,
      error: errorGettingQuote
    });
  }

  getQuote();

  //Replace "Loading your quote..." with new quote and author.  Set twitter button to tweet new quote and author.
  function getNewQuote(data) {
    $("#getQuote").prop('disabled', false);
    quoteIsLoaded = true;
    var leftQuote = "<i class='fa fa-quote-left'></i>";
    var rightQuote = "<i class='fa fa-quote-right'></i>";
    newQuote = data.quoteText;
    newAuthor = data.quoteAuthor;
    $(".quote").html(leftQuote + newQuote + rightQuote);
    if (newAuthor === "") {
      $(".quoteFooter").html("- Unknown");
    } else {
      $(".quoteFooter").html("- " + newAuthor);
    }
    $(".tweet").attr("href", "https://twitter.com/intent/tweet?hashtags=Quote&related=RandomQuoteMachine&text=" + encodeURIComponent('"' + newQuote + '"' + " " + "- " + newAuthor));
    $(".twitter").attr("style", "visibility: visible;");
  }

  //Error handling for getQuote function
  function errorGettingQuote() {
    $("#getQuote").prop('disabled', false);
    quoteIsLoaded = true;
    $(".twitter").attr("style", "visibility: hidden;");
    $(".quote").html("There was an error retrieving quote.  Please try again.");
  }

  //Get Quote button calls getQuote function for new quote
  $("#getQuote").on("click", function() {
    $(".quote").html("Loading your quote<span class='dots'>...</span>");
    $(".quoteFooter").html("");
    $(".twitter").attr("style", "visibility: hidden;");
    getQuote();
  });

  //Twitter button click tweets quote and author
  $(".twitter").on("click", function() {
    window.open('https://twitter.com/intent/tweet?hashtags=Quote&related=RandomQuoteMachine&text=' + encodeURIComponent('"' + newQuote + '"' + " " + "- " + newAuthor));
  });

  //functions for "..." animation when loading quote
  function dotOne() {
    if (quoteIsLoaded === false) {
      $(".dots").html(".<span style='color: orange'>..</span>");
      window.setTimeout(dotTwo, 1000);
    }
  }
  
  function dotTwo() {
    if (quoteIsLoaded === false) {
      $(".dots").html("..<span style='color: orange'>.</span>");
      window.setTimeout(dotThree, 1000);
    }
  }
  
  function dotThree() {
    if (quoteIsLoaded === false) {
      $(".dots").html("...");
      window.setTimeout(dotOne, 1000);
    }
  }
});