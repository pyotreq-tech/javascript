(function () {
    var moreButton = $("#more");
    var resultsParagraph = $("#results-paragraph");
    var resultsContainer = $("#results-container");

    //To hide more button and result query paragraph

    resultsParagraph.hide();
    moreButton.hide();

    //Sending a request after clicking Search button

    $("#submit-btn").on("click", function () {
        var userInput = $("input").val();
        var albumOrArtist = $("select").val();
        var baseUrl = "https://spicedify.herokuapp.com/spotify";

        $.ajax({
            url: baseUrl,
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist,
            },
            success: function (res) {
                var response = res.artists || res.albums; //eliminate one layer of nestedness
                console.log(res);
                var nextUrl =
                    response.next &&
                    response.next.replace(
                        "api.spotify.com/v1/search",
                        "spicedify.herokuapp.com/spotify"
                    );
                var myHtml = "";
                resultsParagraph.show();

                if (response.items.length > 0) {
                    for (var i = 0; i < response.items.length; i++) {
                        var imgUrl = "default.jpg";
                        if (response.items[i].images.length > 0) {
                            imgUrl = response.items[i].images[1].url;
                        }
                        myHtml +=
                            "<a href='" +
                            response.items[i].external_urls.spotify +
                            "'><div class='tile'><div>" +
                            "<img src='" +
                            imgUrl +
                            "'/>" +
                            "<div>" +
                            response.items[i].name +
                            "</div></div></div></a>";
                    }
                    resultsParagraph.html(
                        "Your results for " + userInput + " are:"
                    );

                    resultsContainer.html(myHtml);
                } else {
                    resultsParagraph.html("no results for: " + userInput);
                    resultsContainer.html("");
                }
            },
        });
    });
})();

//we need to add image showing on screen

//when response has next property we can expect more results to appear

//we want do something when nextUrl, make sure that more button appears

//we do not need to define data - query and type again in another request

//feedback to Merle if it was helpful
