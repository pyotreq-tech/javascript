(function () {
    var moreButton = $("#more");
    var resultsParagraph = $("#results-paragraph");
    var resultsContainer = $("#results-container");
    var newUrl;

    moreButton.hide();
    resultsParagraph.hide();

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
                checkScrollPos();
            },
        });

        moreButton.on("click", getMore);

        function getMore() {
            $.ajax({
                url: newUrl,
                method: "GET",
                success: function (res) {
                    res = res.artists || res.albums; //eliminate one layer of nestedness
                    urlHandler(res.next);
                    resultsContainer.append(resultsHandler(res.items));
                    checkScrollPos();
                },
            });
        }

        function resultsHandler(arg) {
            resultsParagraph.show();
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

        function checkScrollPos() {
            if (location.search.indexOf("scroll=infinite") > -1) {
                moreButton.hide();
                if (
                    $(window).height() + $(document).scrollTop() >=
                    $(document).height() - 300
                ) {
                    var hasScrolledToBottom = true;
                }
                if (hasScrolledToBottom) {
                    if (newUrl) {
                        getMore();
                    }
                } else {
                    setTimeout(checkScrollPos, 500);
                }
            }
        }
    });
})();
