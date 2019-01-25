$(function() {
  //variables
  //objects
  const apiUrl = {
    linkStart: "https://api.nytimes.com/svc/topstories/v2/",
    linkEnd: ".json?api-key=",
    apiKey: "NCDiZQkQNXxf2tNaiVx4oiQBxNeGjpx9"
  };
  //functions

  // MAIN CODE
  //Selector Event Listener
  $(".selector-container").on("change", "#selector", function() {
    const section = $(this).val();
    //Add loading img
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
      .fail() //Api data request Fail
      .always(); //Remove loading img
  });
});
