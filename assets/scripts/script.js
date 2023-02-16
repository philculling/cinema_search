var ytApi = "AIzaSyCbq2wbLQScvSCu8bJhd4ByuojcF55ekzo"; 
const LOCAL_STORAGE_SEARCH_KEY = "searches";
const MAX_STORED_SEARCHES = 5;
var omdbApi = "d5cced46";
var searchInput = "";

var filmDiv = $("#filmDetail");
var posterDiv = $("#poster");

var modalTitle = $('#modal-title');
var modalBody = $('.modal-body');

var playButton = $("#play-button");
var errorMessage = $("#errorMessage");

function callOmdbApi() {
var queryURLomdbapi = "https://www.omdbapi.com/?t=" + searchInput + "&apikey=" + omdbApi;
  $.ajax({
    url: queryURLomdbapi,
    method: "GET"
  }).then(function (response) {
    if (response.Response === "True") {


  $('html, body').animate({
    scrollTop: $("#poster").offset().top
  }, 100);


    $("#filmDetail").empty();
    $("#poster").empty();

 

    var title = response.Title;
    var year = response.Year;
    var rating = response.Rated;
    var released = response.Released;
    var runtime = response.Runtime;
    var plot = response.Plot;
    var boxOffice = response.BoxOffice;

    playButton.removeClass("hide-element");

    filmDiv.append(`
    <ul class="list-group">
        <li class="list-group-item display-3">${title}</li>
        <li class="list-group-item lead"><b>Year:</b> ${year}</li>
        <li class="list-group-item lead"><b>Rating:</b> ${rating}</li>
        <li class="list-group-item lead"><b>Plot:</b> ${plot}</li>
        <li class="list-group-item lead"><b>Runtime:</b> ${runtime}</li>
        <li class="list-group-item lead"><b>Released:</b> ${released}</li>
        <li class="list-group-item lead"><b>Box Office:</b> ${boxOffice}</li>
    </ul>`)



    var imgURL = response.Poster;
    var image = $("<img>").attr("src", imgURL);
    image.addClass("poster");
    image.addClass("center-block");
    posterDiv.append(image);

    errorMessage.addClass("hide-element");
    persistUserSearch(searchInput);

    persistUserSearch(title, imgURL);
    errorMessage.empty();
  }
else {
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

function persistUserSearch(title, imageURL) {
    // parse local storage
    var storedSearches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY));

    // if object is null, set it has an array, otherwise append new search input
    if (storedSearches === null) {
        storedSearches = [ 
            {
                title: title,
                imageURL: imageURL
            }
        ];
    } else {
        // remove duplicate search
        const index = storedSearches.findIndex(function (element) {
            return element.title === title;
        })
        if (index >= 0) {
            storedSearches.splice(index, 1);
        }

        // ensure no more then 5 searches are displayed
        storedSearches.unshift({
            title: title,
            imageURL: imageURL
        });
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
        liElement.text(element.title);
        $("#history").append(liElement);
    });

    $("#history-container").css("margin-bottom", "20px");
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

playButtonListener();

modalCloseButton();

displayLocalStorageOnInitialLoad();

searchHistoryButtonListener();

searchInputReturnEvent();