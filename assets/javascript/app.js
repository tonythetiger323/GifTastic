$(document).ready(function () {
    // variable for topics array
    var characters = ["Mario", "Link", "Kirby"];

    //create inital buttons for each character in array
    characters.forEach(function (character) {
        var button = $("<button></button>");
        button.attr("data-character", character);
        button.addClass("btn btn-success characterButton");
        button.text(character);
        $(".buttons").append(button);
    });

    //function to create a new button for each added character from user input
    function createNewButton(character) {
        var button = $("<button></button>");
        button.attr("data-character", character);
        button.addClass("btn btn-success characterButton");
        button.text(character);
        $(".buttons").append(button);
    }

    //take user input and add it to the array
    $(".add-topic").on("click", function (event) {
        event.preventDefault();
        var addedCharacter = $(".characterName").val().trim();
        characters.push(addedCharacter);
        createNewButton(addedCharacter);
        $(".characterName").val("");
    });

    //ajax request on click of button
    $(".characterButton").on("click", function (event) {
        event.preventDefault();
        var characterClicked = $(this).attr("data-character");
        //generate queryURL based off of character clicked
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6OTeM7Wus3Hb5inxP7JTjEDgKaVE7sBS&q=" + characterClicked + "&limit=10";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            //display results as still images with rating
            results.forEach(function (result) {
                var gifDiv = $('<div class="d-md-inline-block"></div>');
                var rating = result.rating;
                var p = $("<p></p>").text("Rating: " + rating);

                var characterImage = $("<img>");
                characterImage.attr("src", result.images.fixed_height_small_still.url);

                gifDiv.prepend(p);
                gifDiv.prepend(characterImage);

                $(".gifs").prepend(gifDiv);

            });

        });
    });

});



