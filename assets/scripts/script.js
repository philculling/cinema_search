var ytApi = "AIzaSyCbq2wbLQScvSCu8bJhd4ByuojcF55ekzo"; 
var omdbApi = "";

function searchButtonListener() {
    $("#search-button").on("click", function() {
    
        // get text from input field and remove white space before and after
        var searchInput = $("#film-search").val().trim();
    
        // validate input is not an empty string
        if (!searchInput) {
            return;
        }
    })
}

searchButtonListener();