(function () {
    var moreButton = $("#more");
    var resultsParagraph = $("#results-paragraph");
    var resultsContainer = $("#results-container");
    var baseUrl = "https://spicedify.herokuapp.com/spotify";

    resultsParagraph.hide();
    moreButton.hide();

    $("#submit-btn").on("click", function () {
        initialRequest(baseUrl);
    });

    function initialRequest(currentUrl) {
        var userInput = $("input").val();
        var albumOrArtist = $("select").val();
        var myHtml = "";
        var j = 1;

        ajaxRequest(currentUrl);
        function ajaxRequest(ajaxUrl) {
            $.ajax({
                url: ajaxUrl,
                method: "GET",
                data: {
                    query: userInput,
                    type: albumOrArtist,
                },
                success: function (res) {
                    console.log(res);
                    var response = res.artists || res.albums; //eliminate one layer of nestedness
                    var nextUrl =
                        response.next &&
                        response.next.replace(
                            "api.spotify.com/v1/search",
                            "spicedify.herokuapp.com/spotify"
                        );
                    console.log(nextUrl);
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
                                j +
                                "<img src='" +
                                imgUrl +
                                "'/>" +
                                "<div>" +
                                response.items[i].name +
                                "</div></div></div></a>";

                            j++;
                        }
                        resultsParagraph.html(
                            "Your results for " + userInput + " are:"
                        );

                        resultsContainer.html(myHtml);

                        if (nextUrl) {
                            moreButton.show();
                            moreButton.on("click", function () {
                                console.log("more");
                                ajaxRequest(nextUrl);
                            });
                        } else {
                            console.log("no more no more");
                            moreButton.hide();
                        }

                        // checking if the next URL is available
                    } else {
                        resultsParagraph.html("no results for: " + userInput);
                        resultsContainer.html("");
                        // return false;
                    }
                },
            });
        }
    }
})();
