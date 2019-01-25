$(function() {
  //variables
  const errorMsg = "Couldn't load news";
  let firstSelection = true;
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
  function resizeHeader() {
    //Resizes the header after the initial API request
  }
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
        console.log(
          apiUrl.linkStart + section + apiUrl.linkEnd + apiUrl.apiKey
        );
        console.log(data);
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
  // MAIN CODE
  //Selector Event Listener
  $(".selector-container").on("change", "#selector", function() {
    const sectionName = $(this).val();
    if (sectionName !== "") {
      //Resize Header if it is the first
      if (firstSelection) {
        resizeHeader();
        firstSelection = false;
      }
      //Attempts to load the articles
      loadArticles(sectionName);
    }
  });
});
