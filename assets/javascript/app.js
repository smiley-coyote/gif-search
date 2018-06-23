var buttonArr = ["laura palmer", "dale cooper", "audrey horne", "log lady", "killer bob"];

$(document).ready(function(){
    function start() {
        for (i=0; i<buttonArr.length; i++) {
            var newButton = $("<button>" + buttonArr[i] + "</button>");
            newButton.addClass("data-button");
            newButton.attr("data-name", buttonArr[i]);
            $(".button-head").append(newButton);
        }
    }

    $(document).on("click", ".data-button", function() {
        var word = $(this).attr("data-name");
        var queryURL = 
         "https://api.giphy.com/v1/gifs/search?q=twin peaks " +
         word + "&api_key=dGrqwMFiqAjfyJQQ0xVk43lmaNRtnDBr&limit=10";
        console.log(queryURL)
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
        $(".button-head").append(newButton);
        $("#add-word").val("");
    })
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
      var input = document.getElementById("add-word");
      input.addEventListener("keyup", function(event) {
          event.preventDefault();
          if (event.keyCode === 13) {
              document.getElementById("new").click();
          }
      });

start();
});


