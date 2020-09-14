(function () {
    var headlines = document.getElementById("headlines");
    var links = document.getElementsByTagName("a");
    var left = headlines.offsetLeft;
    // moveHeadlines();

    function moveHeadlines() {
        var left = left--;
        console.log(left)
        if (left <= -links[0].offsetWidth){
            
        }
        }
        requestAnimationFrame(moveHeadlines)
    }
})();
