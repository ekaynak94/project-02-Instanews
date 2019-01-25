$(function() {
  //variables
  const errorMsg = "Couldn't load news";
  //objects
  const apiUrl = {
      linkStart: "https://api.nytimes.com/svc/topstories/v2/",
      linkEnd: ".json?api-key=",
      apiKey: "NCDiZQkQNXxf2tNaiVx4oiQBxNeGjpx9"
    },
    errorMsgTags = {
      opening: "<li class=errorMessage>",
      closing: "</li>"
    };
  //functions
  function loadArticles(section) {
    //Does an API request and loads content depending on the result
    //Add loading img
    $("#loading").removeClass("loaded");
    //Empty Content
    $(".article-list").empty();
    //Api Data Request
    $.ajax({
      method: "GET",
      url: apiUrl.linkStart + section + apiUrl.linkEnd + apiUrl.apiKey,
      dataType: "json"
    })
      .done(function(data) {
        //Api data request Success
        processResults(data.results); //Executes necessary instructions after success
      })
      .fail(function() {
        //Api data request Fail
        $(".article-list").append(
          errorMsgTags.opening + errorMsg + errorMsgTags.closing
        );
      })
      .always(function() {
        //Remove loading img
        $("#loading").addClass("loaded");
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
    //generates html code for a li element
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
});
