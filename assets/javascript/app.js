$(function () {
    // variable for topics array
    var characters = ["Mario", "Link", "Kirby"];

    //create inital buttons for each character in array
    function initializePage() {
        characters.forEach(function (character) {
            var button = $("<button></button>");
            button.attr("data-character", character);
            button.addClass("btn btn-success characterButton");
            button.text(character);
            $(".buttons").append(button);
        });
    }

    initializePage();

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
        if ((!addedCharacter) || characters.includes(addedCharacter)) {
            return;
        }
        characters.push(addedCharacter);
        createNewButton(addedCharacter);
        $(".characterName").val("");
    });


    //ajax request on click of button
    $(".buttons").on("click", '.characterButton', function (event) {
        $(".gifs").empty();
        event.preventDefault();
        var characterClicked = $(this).attr("data-character");

        // generate queryURL based off of character clicked
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=6OTeM7Wus3Hb5inxP7JTjEDgKaVE7sBS&q=" + characterClicked + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            //display results as still images with rating
            results.forEach(function (result) {
                var gifDiv = $('<div></div>');
                var rating = result.rating;
                var p = $("<p></p>").text("Rating: " + rating);

                var characterImage = $("<img>");
                characterImage.attr({ "src": result.images.original_still.url, "data-still": result.images.original_still.url, "data-animate": result.images.original.url, "data-state": "still" });
                characterImage.addClass("gif");

                gifDiv.prepend(p);
                gifDiv.prepend(characterImage);

                $(".gifs").prepend(gifDiv);


            });
            //start/stop gif animation on click
            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


        });


    });





});



