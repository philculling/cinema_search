var ytApi = "AIzaSyCbq2wbLQScvSCu8bJhd4ByuojcF55ekzo"; 
var omdbApi = "d5cced46";

//for testing:
var userInput = "Titanic";

var queryURLomdbapi = "http://www.omdbapi.com/?t=" + userInput + "&apikey=d5cced46"

$.ajax({
    url: queryURLomdbapi,
    method: "GET"
  }).then(function (response) {
    //tests, all are fine
    console.log(response.Title);
    console.log(response.Year);
    console.log(response.Rated);
    console.log(response.Released);
    console.log(response.Runtime);
    console.log(response.Plot);
    console.log(response.BoxOffice);
    console.log(response.Poster);

    var imgURL = response.Poster;
    var image = $("<img>").attr("src", imgURL);

  })

