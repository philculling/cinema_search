var ytApi = "AIzaSyCbq2wbLQScvSCu8bJhd4ByuojcF55ekzo"; 
const LOCAL_STORAGE_SEARCH_KEY = "searches";
const MAX_STORED_SEARCHES = 5;
var omdbApi = "d5cced46";
var searchInput = "";

var filmDiv = $("#filmdata");
var posterDiv = $("#poster");

var modalTitle = $('#modal-title');
var modalBody = $('.modal-body');

var invalidModalTitle = $("#invalidmodal-title");
var invalidModalBody = $(".modal-body");

var playButton = $("#play-button");
var errorMessage = $("#errorMessage");

function callOmdbApi() {
var queryURLomdbapi = "https://www.omdbapi.com/?t=" + searchInput + "&apikey=" + omdbApi;
  $.ajax({
    url: queryURLomdbapi,
    method: "GET"
  }).then(function (response) {
    console.log(response.Response);
    if (response.Response === "True") {
    //tests, all fine
    console.log(queryURLomdbapi);
    console.log(response);
    console.log(response.Title);
    console.log(response.Year);
    console.log(response.Rated);
    console.log(response.Released);
    console.log(response.Runtime);
    console.log(response.Plot);
    console.log(response.BoxOffice);
    console.log(response.Poster);

    $("#filmdata").empty();
    $("#poster").empty();

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
    playButton.removeClass("hide-element");

    var imgURL = response.Poster;
    var image = $("<img>").attr("src", imgURL);
    posterDiv.append(image);
    errorMessage.empty();
    persistUserSearch(searchInput);
  }
else {
  console.log("This is not a valid film");
    errorMessage.removeClass("hide-element");
}
  });
}

//Youtube API Call - runs when play button clicked (after search)
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
        var videoURL = `https://www.youtube.com/embed/${videoId}`;

        modalTitle.empty();
        modalBody.empty();

        modalTitle.text(videoTitle);
        modalBody.append(`<iframe width="100%" height="400" 
                            src=${videoURL} frameborder="0" allowfullscreen>
                          </iframe> 
                        `);
    }).catch(function (error) {
        console.log(error);
    });
}

function searchButtonListener() {
    $("#search-button").on("click", function() {
        searchForAFilm();
    })
}

function searchForAFilm() {
    // get text from input field and remove white space before and after
    searchInput = $("#film-search").val().trim();
    // validate input is not an empty string
    if (!searchInput) {
        return;
    }

    callOmdbApi();
}

function playButtonListener() {
    $("#play-button").on("click", function() {
        
        callYoutubeApi();
    });
}

function modalCloseButton() {
    $("#close-button").on("click", function() {
        
        //empty modal contents on close
        modalTitle.empty();
        modalBody.empty();
    });
}



function persistUserSearch(input) {
    // parse local storage
    var storedSearches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY));

    // if object is null, set it has an array, otherwise append new search input
    if (storedSearches === null) {
        storedSearches = [input];
    } else {
        // ensure no more then 5 searches are displayed
        storedSearches.unshift(input);
        if (storedSearches.length > MAX_STORED_SEARCHES) {
            storedSearches = storedSearches.slice(0, MAX_STORED_SEARCHES);
        }
    }

    // persist new input with other stored searches
    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify(storedSearches));
}

function displayLocalStorageOnInitialLoad() {
    var storedSearches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY));

    if (storedSearches === null) {
        return;
    }

    const recentSearchesHeaderEl = $("<h5>");
    recentSearchesHeaderEl.text("Recent searches");
    recentSearchesHeaderEl.insertBefore("#history");

    storedSearches.forEach(element => {
        const liElement = $("<button>");
        liElement.addClass("list-group-item list-group-item-action");
        liElement.text(element);
        $("#history").append(liElement);
    });
}

function searchHistoryButtonListener() {
    $(".list-group-item-action").on("click", function(event) {
        // get element
        const buttonEl = event.currentTarget;
        
        // get film title
        const filmTitle = $(buttonEl).text();
        
        // make call
        searchInput = filmTitle;
        callOmdbApi()
    })
}

function searchInputReturnEvent() {
    $("#film-search").keydown(function(event) {
        // if user presses enter (keycode 13), search for film
        if (event.keyCode === 13) {
            searchForAFilm();
        }
    })
}

searchButtonListener();

// playButtonListener();

modalCloseButton();

displayLocalStorageOnInitialLoad();

searchHistoryButtonListener();

searchInputReturnEvent();