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

  // MAIN CODE
  //Selector Event Listener
  $(".selector-container").on("change", "#selector", function() {
    const section = $(this).val();
    //Add loading img
    $("#loading").removeClass("loaded");
    //Resize Header if it is the first selection
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
  });
});
