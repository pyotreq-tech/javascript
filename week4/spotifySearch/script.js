(function () {
    var moreButton = $("#more");
    var resultsParagraph = $("#results-paragraph");
    var resultsContainer = $("#results-container");

    resultsParagraph.hide();
    moreButton.hide();

    $("#submit-btn").on("click", function () {
        var baseUrl = "https://spicedify.herokuapp.com/spotify";
        var userInput = $("input").val();
        var albumOrArtist = $("select").val();
        var myHtml = "";
        var newUrl;

        ajaxRequest(baseUrl);

        moreButton.on("click", function () {
            ajaxRequest(newUrl);
        });

        function ajaxRequest(arg) {
            $.ajax({
                url: arg,
                method: "GET",
                data: {
                    query: userInput,
                    type: albumOrArtist,
                },
                success: function (res) {
                    var response = res.artists || res.albums; //eliminate one layer of nestedness
                    var nextUrl =
                        response.next &&
                        response.next.replace(
                            "api.spotify.com/v1/search",
                            "spicedify.herokuapp.com/spotify"
                        );
                    newUrl = nextUrl;
                    resultsParagraph.show();

                    if (response.items.length > 0) {
                        for (var i = 0; i < response.items.length; i++) {
                            var imgUrl = "default.jpg";
                            if (response.items[i].images.length > 0) {
                                imgUrl = response.items[i].images[1].url;
                            }
                            myHtml +=
                                "<div class='tile'><a href='" +
                                response.items[i].external_urls.spotify +
                                "'><div>" +
                                "<img src='" +
                                imgUrl +
                                "'/>" +
                                "</div>" +
                                "<div class='caption'>" +
                                response.items[i].name +
                                "</div></a></div>";
                        }
                        resultsParagraph.html(
                            "Your results for " + userInput + " are:"
                        );

                        resultsContainer.html(myHtml);

                        if (!nextUrl) {
                            moreButton.hide();
                        } else {
                            moreButton.show();
                        }
                    } else {
                        resultsParagraph.html("no results for: " + userInput);
                        resultsContainer.html("");
                    }
                },
            });
        }
    });
})();
