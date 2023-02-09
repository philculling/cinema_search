var ytApi = "AIzaSyCbq2wbLQScvSCu8bJhd4ByuojcF55ekzo"; 
var omdbApi = "d5cced46";
var searchInput = "";

var filmDiv = $("#filmdata");
var posterDiv = $("#poster");


function callOmdbApi() {
var queryURLomdbapi = "http://www.omdbapi.com/?t=" + searchInput + "&apikey=" + omdbApi;
  $.ajax({
    url: queryURLomdbapi,
    method: "GET"
  }).then(function (response) {
    //tests, all ...were fine
    console.log(response.Title);
    console.log(response.Year);
    console.log(response.Rated);
    console.log(response.Released);
    console.log(response.Runtime);
    console.log(response.Plot);
    console.log(response.BoxOffice);
    console.log(response.Poster);

    var title = response.Title;
    var pTitle = $("<p>").text("Title: " + title);
    filmDiv.append(pTitle);
    var year = response.Year;
    var pYear = $("<p>").text("Year: " + year);
    filmDiv.append(pYear);
    var rating = response.Rated;
    var pRating = $("<p>").text("Rating: " + rating);
    filmDiv.append(pRating);
    var released = response.Released;
    var pReleased = $("<p>").text("Released: " + released);
    filmDiv.append(pReleased);
    var runtime = response.Runtime;
    var pRuntime = $("<p>").text("Run time: " + runtime);
    filmDiv.append(pRuntime);
    var plot = response.Plot;
    var pPlot = $("<p>").text("Plot: " + plot);
    filmDiv.append(pPlot);
    var boxOffice = response.BoxOffice;
    var pBoxOffice = $("<p>").text("Box Office: " + boxOffice);
    filmDiv.append(pBoxOffice);

    var imgURL = response.Poster;
    var image = $("<img>").attr("src", imgURL);
    posterDiv.append(image);

  })
}

function searchButtonListener() {
    $("#search-button").on("click", function() {
    
        // get text from input field and remove white space before and after
        searchInput = $("#film-search").val().trim();
    
        // validate input is not an empty string
        if (!searchInput) {
            return;
        }
        callOmdbApi();
    })
}

searchButtonListener();
