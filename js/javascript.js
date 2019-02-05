$(function() {
  //variables
  const numOfArticles = 12, //maximum number of articles to be loaded to the site
    loader = $("#loading"),
    list = $(".article-list"),
    errorMessage = "<p class='errorMessage'>Failed to load data</p>";

  // MAIN CODE
  //Selector Event Listener
  $(".selector-container").on("change", "#selector", function() {
    const sectionName = $(this).val();
    if (sectionName !== "") {
      //Resizes the header before the initial API request
      $(".site-header").addClass("post-select");
      //Attempts to load the articles
      loadArticles(sectionName);
    }
  });

  //functions
  const loadArticles = section => {
    //Does an API request and loads content depending on the result
    loader.removeClass("loaded"); //Adds loading img
    list.empty(); //Empties the contents of the article-list
    $.ajax({
      //Api Data Request
      method: "GET",
      url: getApiUrl(section),
      dataType: "json"
    })
      .done(function(data) {
        //adds numOfArticles amount of articles into html code after success
        $.each(pickArticles(data.results, numOfArticles), function(key, value) {
          const { url, multimedia, abstract } = value;
          const imgUrl = multimedia[4].url;
          list.append(articleHtml(url, imgUrl, abstract));
        });
      })
      .fail(function() {
        list.append(errorMessage); //generates hmtl line for an error message
      })
      .always(function() {
        loader.addClass("loaded"); //removes loading img
      });
  };

  const pickArticles = (results, number) => {
    //picks the first 12 articles that have images in them from the results
    return results
      .filter(argument => {
        return argument.multimedia[4] !== undefined;
      })
      .slice(0, number);
  };
  const articleHtml = (
    url,
    img,
    abs //returns the appropriate html element to append to the list
  ) =>
    `<a class='story' target='_blank' href=${url} style='background-image:url(${img})'><p class='abstract'>${abs}</p></a>`;
  const getApiUrl = (
    section //returns proper url link given the section name
  ) =>
    `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=NCDiZQkQNXxf2tNaiVx4oiQBxNeGjpx9`;
});
