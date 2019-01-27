$(function() {
  //variables
  const numOfArticles = 12, //maximum number of articles to be loaded to the site
    loader = $("#loading"),
    list = $(".article-list");

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
  function loadArticles(section) {
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
        const articles = pickArticles(data.results, numOfArticles);
        for (let i = 0; i < numOfArticles; i++) {
          list.append(
            articleHtml(articles.url[i], articles.img[i], articles.abs[i])
          );
        }
      })
      .fail(function() {
        list.append(errorMessage()); //generates hmtl line for an error message
      })
      .always(function() {
        loader.addClass("loaded"); //removes loading img
      });
  }

  function pickArticles(results, articles) {
    //picks 'articles' number of results and returns an object containing 3 arrays for page urls,img urls and abstracts for the articles
    let index = 0;
    let obj = { url: [], img: [], abs: [] };
    $.each(results, function(key, value) {
      //loops through results
      if (value.multimedia[4] !== undefined && index < articles) {
        obj.url[index] = value.url;
        obj.img[index] = value.multimedia[4].url;
        obj.abs[index] = value.abstract;
        index++;
      }
    });
    return obj;
  }

  function articleHtml(url, img, abs) {
    //returns html code for a li element for the article-list
    return (
      "<li style='background-image:url(" +
      img +
      ")' class='story'><a target='_blank' href=" +
      url +
      "><p class='abstract'>" +
      abs +
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
