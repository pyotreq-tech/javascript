(function () {
    var moreButton = $("#more");
    var resultsParagraph = $("#results-paragraph");
    var resultsContainer = $("#results-container");
    var newUrl;

    moreButton.hide();

    $("#submit-btn").on("click", function () {
        var baseUrl = "https://spicedify.herokuapp.com/spotify";
        var userInput = $("input").val();
        var albumOrArtist = $("select").val();

        $.ajax({
            url: baseUrl,
            method: "GET",
            data: {
                query: userInput,
                type: albumOrArtist,
            },
            success: function (res) {
                res = res.artists || res.albums; //eliminate one layer of nestedness
                urlHandler(res.next);
                resultsContainer.html(resultsHandler(res.items));
            },
        });

        moreButton.on("click", function () {
            $.ajax({
                url: newUrl,
                method: "GET",
                success: function (res) {
                    res = res.artists || res.albums; //eliminate one layer of nestedness
                    urlHandler(res.next);
                    resultsContainer.append(resultsHandler(res.items));
                },
            });
        });

        function resultsHandler(arg) {
            var myHtml = "";
            if (arg.length > 0) {
                for (var i = 0; i < arg.length; i++) {
                    var imgUrl = "default.jpg";
                    if (arg[i].images.length > 0) {
                        imgUrl = arg[i].images[1].url;
                    }
                    myHtml +=
                        "<div class='tile'><a href='" +
                        arg[i].external_urls.spotify +
                        "'><div>" +
                        "<img src='" +
                        imgUrl +
                        "'/>" +
                        "</div>" +
                        "<div class='caption'>" +
                        arg[i].name +
                        "</div></a></div>";
                }
                resultsParagraph.html(
                    "Your results for " + userInput + " are:"
                );
                return myHtml;
            } else {
                resultsParagraph.html("no results for: " + userInput);
                resultsContainer.html("");
            }
        }

        function urlHandler(nextUrl) {
            newUrl =
                nextUrl &&
                nextUrl.replace(
                    "api.spotify.com/v1/search",
                    "spicedify.herokuapp.com/spotify"
                );
            if (!newUrl) {
                moreButton.hide();
            } else {
                moreButton.show();
            }
        }
    });
})();

// function getresults(items) return html
//call it and pass data irems

//127.0.0.1:8080/?scroll=infinite

// location.search.indexOf('scroll=infinite') > - 1
// true

// not use scroll

// function checkScrollPos() {
//     var hasScrolledToBottom;

//     if (hasScrolledToBottom) {
//         //go get more!
//     } else {
//         setTimeout(checkScrollPos, 500);
//     }
// }

// $(window).height();
// $(document).height();
// $(document).scrollTop();
