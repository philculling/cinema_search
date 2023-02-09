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

//Youtube API Call -- this needs to run when the play clip button is clicked - need a play button and event listener on that button
function callYoutubeApi() {
    var film = searchInput + " trailer";
    var ytQueryUrl =
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${film}&type=video&videoDuration=short&videoEmbeddable=true&key=${ytApi}`;
    
    $.ajax({
        url: ytQueryUrl,
        method: "GET"
    }).then(function (response) {
        var videoId = response.items[0].id.videoId;
        var videoTitle = response.items[0].snippet.title;
        var videoURL = `https://www.youtube.com/watch?v=${videoId}`;
        // console.log(videoTitle);
        // console.log(videoURL);

    });
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
