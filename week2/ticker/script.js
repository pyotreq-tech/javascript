(function () {
    var headlines = document.getElementById("headlines");
    var left = headlines.offsetLeft;
    var links = document.getElementsByTagName("a");
    var animId = requestAnimationFrame(moveHeadlines);

    moveHeadlines();

    function moveHeadlines() {
        left--;
        headlines.style.left = left + "px";

        if (left <= -links[0].offsetWidth) {
            left += links[0].offsetWidth;
            headlines.appendChild([links[0]]);
        }

        animId = requestAnimationFrame(moveHeadlines);
    }

    animId = requestAnimationFrame(moveHeadlines);

    cancelAnimationFrame(moveHeadlines);
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function (event) {
            if (event.innerText === animId) {
                links[i].style.color = "green";
                links[i].style.textDecoration = "underline";
            }
        });
        links[i].removeEventListener("mouseleave", function () {
            links[i].style.color = "unset";
            links[i].style.textDecoration = "none";
        });
    }
})();
