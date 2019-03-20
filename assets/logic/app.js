
  // Initial array of giphs
  var giphs = ["Thor", "Spider Man", "Thanos", "Iron Man"];
  // displayGiphRating function re-renders the HTML to display the appropriate content
  function displayGiphRating() {

    var searchTerm = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=sNcKr7LScAoiuiJSCdfmJvALAAXq8j89&q=" +
    searchTerm + "&limit=10&offset=0&lang=en";
    // Creates AJAX call for the specific giph button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++){
        
            // Creates a div to hold the giph
            let giphDiv = $("<div class='giph-div'>");
            var rating = results[i].rating;
            var title = results[i].title;
            if(title === "") {
              title = "N/A"
            }
            let pOne = $('<p>').text('Name: ' + title + ' | ' + 'Rating: ' + rating);
            giphDiv.append(pOne);
            
            let pic = $('<img>').attr({"src": results[i].images.fixed_height_still.url, 
                                        "data-state": "still",
                                        "data-still": results[i].images.fixed_height_still.url,
                                        "data-animate": results[i].images.fixed_height.url,
                                        "class": "gif"});

                                        var download_button = $("<button>");
            download_button.addClass("download_giph");
            download_button.text("Download");

            var aa = results[i].images.fixed_height.url
            var aaa =""

              for (ii = 0; ii < aa.length; ii++){
                if(aa[ii] ==="?"){
                   break
                }else{
                  aaa = aaa + aa[ii];
                }
                
              }
            download_button.attr("path",aaa)

            let picAni = $('<img>').attr("src", results[i].images.fixed_height.url);

            console.log(results);
            
            giphDiv.append(pic);
            giphDiv.append(download_button);

              $("#giph-container").prepend(giphDiv);
        }

        $(".gif").on("click", function() {
            var state = $(this).attr('data-state');      
                if (state === 'still') {
                $(this).attr("src", $(this).attr('data-animate'));
                $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        

    });

  }

  // Function for displaying giph data
  function renderButtons() {

    // Deletes the giphs prior to adding new giphs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of giphs
    for (var i = 0; i < giphs.length; i++) {

      // Then dynamicaly generates buttons for each giph in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of giph to our button
      a.addClass("giph");
      // Added a data-attribute
      a.attr("data-name", giphs[i]);
      // Provided the initial button text
      a.text(giphs[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where the add giph button is clicked
  $("#add-giph").on("click", function(event) {
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var giph = $("#giph-input").val().trim();

    // The giph from the textbox is then added to our array
    giphs.push(giph);

    // Calling renderButtons which handles the processing of our giph array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "giph"
  $(document).on("click", ".giph", displayGiphRating);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  function downloadLink(){  
    let parent =$(this).parent();
    downloadLink = parent.attr("data-move");
    console.log(downloadLink);
    $.ajax({
        url:downloadLink,
        method:"GET",
        xhrFields: {
            responseType: 'blob'
        }
    }).then(function(data){
        
        var binaryData = [];
        binaryData.push(data);
        var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/gif"}))
        //mobile support: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
        var a = document.createElement('a');
        a.href = url
        a.download = '';
        a.click();
        window.URL.revokeObjectURL(url);
    })
}

