(function () {
    console.log("work");
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function (script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });

    //Handlebars established

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
            let answer = {};
            answer.ans = arg;
            if (arg.length > 0) {
                resultsParagraph.html(
                    "Your results for " + userInput + " are:"
                );

                for (var i = 0; i < arg.length; i++) {
                    arg[i].imgUrl = "default.jpg";
                    if (arg[i].images.length > 0) {
                        arg[i].imgUrl = arg[i].images[1].url;
                    }
                }
                let handlebarsResults = Handlebars.templates.spotify(answer);
                return handlebarsResults;
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
