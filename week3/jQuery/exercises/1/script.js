(function () {
    ticker("ticker2", 1);
    ticker("#ticker", -1);

    function ticker(id, step) {
        $.ajax({
            url: "/data.json",
            async: false,
            success: function (response) {
                var newHtml = "";
                var content = $("#headlines");
                content = $("#headlines");
                for (var i = 0; i < response.length; i++) {
                    newHtml +=
                        "<a href='" +
                        response[i].link +
                        "'>" +
                        response[i].value +
                        "</a>";
                }
                console.log(newHtml);
                content.html(newHtml);
            },
        });

        var headlines = $("#headlines");
        var ticker = $(id);
        var links = headlines.find("A");
        var curX = headlines.offset().left;
        var headlinesWidth = headlines.offset().width;
        var tickerWidth = ticker.offset().width;
        var linkWidth =
            step < 0
                ? links[0].offsetWidth
                : links[links.length - 1].offsetWidth;
        var animId;

        headlines.on("mouseenter", function (e) {
            cancelAnimationFrame(animId);
        });

        headlines.on("mouseleave", function () {
            moveHeadlines();
        });

        moveHeadlines();

        function moveHeadlines() {
            curX += step;
            if (step < 0 && curX < -linkWidth) {
                curX += linkWidth;
                headlines.append(links.eq(0));
                linkWidth = links.eq(0).offset().width;
            }
            if (step > 0 && curX + headlinesWidth > tickerWidth + linkWidth) {
                curX -= linkWidth;
                headlines.insertBefore(links[links.length - 1], links[0]);
                linkWidth = links[links.length - 1].offsetWidth;
            }
            headlines.css({
                left: curX + "px",
            });
            animId = requestAnimationFrame(moveHeadlines);
        }
    }
})();
