$(function() {
  const apiUrl = {
    linkStart: "https://api.nytimes.com/svc/topstories/v2/",
    linkEnd: ".json?api-key=",
    apiKey: "NCDiZQkQNXxf2tNaiVx4oiQBxNeGjpx9"
  };
  //Selector Event Listener
  $(".selector-container").on("change", "#selector", function() {
    console.log(
      apiUrl.linkStart + $(this).val() + apiUrl.linkEnd + apiUrl.apiKey
    );
  });
});
