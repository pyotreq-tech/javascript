(function () {
    var headlines = $("#headlines");
    var left = headlines.offset().left;
    var myReq;

    $.ajax({
        url: "/links.json",
        success: function (data) {
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html +=
                    '<a href="' + data[i].href + '">' + data[i].text + "</a>";
            }
            $("#headlines").append(html);
            moveHeadLines();
        },
    });

    function moveHeadLines() {
        left--;
        if (left < -$("a").eq(0).outerWidth()) {
            left += $("a").eq(0).outerWidth();
            headlines.append($("a").eq(0));
            // let a = $("a");
        }
        headlines.css({ left: left + "px" });
        myReq = requestAnimationFrame(moveHeadLines);
    }

    headlines.on("mouseenter", function () {
        window.cancelAnimationFrame(myReq);
    });

    headlines.on("mouseleave", function () {
        requestAnimationFrame(moveHeadLines);
    });
})();
