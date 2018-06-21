var buttonArr = ["happy", "excited", "sad", "angry", "scared"];

$(document).ready(function(){
    function start() {
        for (i=0; i<buttonArr.length; i++) {
            var newButton = $("<button>" + buttonArr[i] + "</button>");
            newButton.addClass("data-button");
            newButton.attr("data-name", buttonArr[i]);
            $(".body").append(newButton);
        }
    }

    $(document).on("click", ".data-button", function() {
        var word = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        word + "&api_key=dGrqwMFiqAjfyJQQ0xVk43lmaNRtnDBr&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          })
            .then(function(response) {
              var results = response.data;
              
    
              for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
    
                var rating = results[i].rating;
    
                var p = $("<p>").text("Rating: " + rating);
    
                var personImage = $("<img>");
                personImage.attr("src", results[i].images.original_still.url);
                personImage.attr("data-still", results[i].images.original_still.url);
                personImage.attr("data-animate", results[i].images.original.url);
                personImage.attr("data-state", "still");
                personImage.addClass("gif");
                gifDiv.prepend(p);
                gifDiv.prepend(personImage);
    
                $("#gifs-box").prepend(gifDiv);
              }
            });
    })

    $(document).on("click", ".add", function(){
        event.preventDefault();
        var newWord = $("#add-word").val().trim();
        var newButton = $("<button>" + newWord + "</button>");
        newButton.attr("data-name", newWord);
        newButton.addClass("data-button");
        $(".body").append(newButton);
    })
    $(document).on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    


start();
});
