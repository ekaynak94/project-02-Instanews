$(function() {
  // MAIN CODE
  //Selector Event Listener
  $(".selector-container").on("change", "#selector", function() {
    const sectionName = $(this).val();
    if (sectionName !== "") {
      //Resizes the header before the initial API request
      $(".site-header").removeClass("full-sized");
      //Attempts to load the articles
      loadArticles(sectionName);
    }
  });

  //functions
  function loadArticles(section) {
    //Does an API request and loads content depending on the result
    $("#loading").removeClass("loaded"); //Adds loading img
    $(".article-list").empty(); //Empties the contents of the article-list
    $.ajax({
      //Api Data Request
      method: "GET",
      url: getApiUrl(section),
      dataType: "json"
    })
      .done(function(data) {
        processResults(data.results); //Executes necessary instructions after success
      })
      .fail(function() {
        $(".article-list").append(errorMessage()); //generates hmtl line for an error message
      })
      .always(function() {
        $("#loading").addClass("loaded"); //removes loading img
      });
  }

  function processResults(results) {
    $.each(results, function(key, value) {
      //loops through results
      if (value.multimedia[0] !== undefined) {
        //selects stories with images
        $(".article-list").append(
          storyHtml(value.url, value.multimedia[0].url, value.abstract) //generates the necessary html code for the li element
        );
      }
    });
  }

  function storyHtml(link, img, text) {
    //returns html code for a li element for the article-list
    return (
      "<li class='story'><a href=" +
      link +
      "><img src=" +
      img +
      " alt='article picture'><p class='abstract'>" +
      text +
      "</p></a></li>"
    );
  }
  function getApiUrl(section) {
    //returns proper url link given the section name
    const linkStart = "https://api.nytimes.com/svc/topstories/v2/",
      linkEnd = ".json?api-key=",
      apiKey = "NCDiZQkQNXxf2tNaiVx4oiQBxNeGjpx9";
    return linkStart + section + linkEnd + apiKey;
  }

  function errorMessage() {
    //returns error message string
    return "<li class=errorMessage>Ooops something went wrong :(</li>";
  }
});
