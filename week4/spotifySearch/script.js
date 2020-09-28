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
        var myHtml = "";
        var j = 1;

        if (request(baseUrl)) {
            moreButton.show();
            moreButton.on("click", function () {
                console.log("more");
                request(baseUrl);
            });
        } else {
            console.log("no more no more");
            moreButton.hide();
        }

        function request(currentUrl) {
            $.ajax({
                url: currentUrl,
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
                        return true;

                        //checking if the next URL is available
                    } else {
                        resultsParagraph.html("no results for: " + userInput);
                        resultsContainer.html("");
                        return false;
                    }
                },
            });
        }
    });
})();

// var search = function () {
//     $.ajax({
//         url:
//             "https://spicedify.herokuapp.com/spotify?query=stones&type=artist&offset=80&limit=20",
//         method: "GET",
//         data: {
//             // query: userInput,
//             // type: albumOrArtist,
//         },
//         success: function (res) {
//             console.log(res);
//         },
//     });
// };
// search();
