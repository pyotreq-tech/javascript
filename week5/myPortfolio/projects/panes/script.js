var slide = $("#slide");
var box = $("#box");
var doc = $(document);
var panel = $(".panel");

slide.on("mousedown", function () {
    box.on("mousemove", function (e) {
        slide.eq(0).css({
            left: e.clientX - box.eq(0).offset().left + "px",
        });
        panel.eq(1).css({
            "background-color": "red",
            width: e.clientX - box.eq(0).offset().left + "px",
        });
        var position = e.clientX - box.eq(0).offset().left;
        //some additional background styling
        if (position < 250) {
            $("body").css({
                "background-color": "lightgrey",
            });
            slide.css({
                "background-color": "lightgrey",
            });
        } else {
            $("body").css({
                "background-color": "#8a7d94",
            });
            slide.css({
                "background-color": "#8a7d94",
            });
        }
    });
    doc.on("mouseup", function () {
        box.off("mousemove");
    });
});
