var ytApi = "AIzaSyCbq2wbLQScvSCu8bJhd4ByuojcF55ekzo"; 
var omdbApi = "";
const LOCAL_STORAGE_SEARCH_KEY = "searches"

function searchButtonListener() {
    $("#search-button").on("click", function() {
    
        // get text from input field and remove white space before and after
        var searchInput = $("#film-search").val().trim();
    
        // validate input is not an empty string
        if (!searchInput) {
            return;
        }

        persistUserSearch(searchInput);
    })
}

function persistUserSearch(input) {
    // parse local storage
    var storedSearches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY));

    // if object is null, set it has an array, otherwise append new search input
    if (storedSearches === null) {
        storedSearches = [input];
    } else {
        storedSearches.unshift(input);
    }

    // persist new input with other stored searches
    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify(storedSearches));
}

function displayLocalStorageOnInitialLoad() {
    var storedSearches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY));

    if (storedSearches === null) {
        return;
    }

    storedSearches.forEach(element => {
        const liElement = $("<li>");
        liElement.addClass("list-group-item");
        liElement.text(element);
        $("#history").append(liElement);
    });
}

searchButtonListener();
displayLocalStorageOnInitialLoad();