(function () {
    var searchField = $("input");
    var resultsDiv = $(".results");

    var index = 0;
    var highlight = false;
    var results;
    var timer;
    //Clean will delete highlight class everytime we selected something with mouse event and then fire key event or vice versa
    var clean = function () {
        for (var l = 0; l < $("p").length; l++) {
            $("p").eq(l).removeClass("highlight");
        }
    };

    searchField.on("input", function result() {
        var userInput = searchField.val().toLowerCase();

        clearInterval(timer);
        console.log(timer);
        timer = setTimeout(ajaxRequest, 250);
        console.log(timer);

        function ajaxRequest() {
            $.ajax({
                url: "https://spicedworld.herokuapp.com/",
                data: {
                    q: userInput,
                },

                success: function (res) {
                    console.log("request...");
                    var currentInput = searchField.val().toLowerCase();
                    if (currentInput === userInput) {
                        results = res;
                        build();
                    } else {
                        console.log("discard");
                    }
                },
            });
        }

        function build() {
            index = 0;
            resultsDiv.show();
            highlight = false;

            var htmlForCountries = "";

            if (results.length === 0) {
                htmlForCountries += "<p>No results</p>";
                resultsDiv.html(htmlForCountries);
                if (searchField.val() == []) {
                    resultsDiv.html("");
                }
            } else {
                for (var j = 0; j < results.length; j++) {
                    htmlForCountries +=
                        "<p class='country' id='" +
                        j +
                        "'>" +
                        results[j] +
                        "</p>";
                }
                resultsDiv.html(htmlForCountries);
            }
            return results;
        }
    });

    resultsDiv.on("mouseover", "p", function (e) {
        clean();
        $(e.target).addClass("highlight");
        highlight = true;
        index = e.target.id;
        resultsDiv.on("mouseleave", "p", function (e) {
            $(e.target).removeClass("highlight");
            index = 0;
            highlight = false;
        });
    });

    resultsDiv.on("mousedown", "p", function (e) {
        searchField.val($(e.target).text());
        resultsDiv.hide();
    });

    searchField.on("keydown", function (e) {
        for (var k = 0; k < $("p").length; k++) {
            if ($("p").eq(k).hasClass("highlight")) {
                highlight = true;
            }
        }
        if (e.keyCode === 13) {
            searchField.val($(".highlight").text());
            resultsDiv.hide();
        }

        clean();

        if (e.keyCode === 40 && !highlight) {
            $("p").eq(index).addClass("highlight");
            highlight = true;
        } else if (e.keyCode === 40) {
            index++;
            if (index === $("p").length) {
                $("p")
                    .eq($("p").length - 1)
                    .removeClass("highlight");
                index = 0;
            }
            $("p").eq(index).prev().removeClass("highlight");
            $("p").eq(index).addClass("highlight");
        }

        if (e.keyCode === 38 && !highlight) {
            $("p")
                .eq($("p").length - 1)
                .addClass("highlight");
            highlight = true;
            index = $("p").length - 1;
        } else if (e.keyCode === 38) {
            index--;
            if (index === -1) {
                $("p").eq(0).removeClass("highlight");
                index = $("p").length - 1;
            }
            $("p").eq(index).next().removeClass("highlight");
            $("p").eq(index).addClass("highlight");
        }
    });

    searchField.on("focus", function () {
        resultsDiv.show();
    });

    searchField.on("blur", function () {
        resultsDiv.hide();
    });

    //event listener delegation
    // $(".container").on("click", ".country", function () {});
    //thin about event objects, information about event that fired
    //e.target
    //e.currentTarget
    //value of p tag and assign it to index of input field, then disappears
    //next() check which has class highlited, if no I want to add it to first element, remove and pass is to next one
    //prev()
    //after click, hide list and change placeholder, but also when click back it appears again
})();
