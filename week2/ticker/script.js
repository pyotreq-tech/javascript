(function () {
    var headlines = document.getElementById("headlines");
    var links = document.getElementsByTagName("a");
    var left = headlines.offsetLeft;
    var animId = requestAnimationFrame(moveHeadlines)
    // moveHeadlines();

    function moveHeadlines() {
        var left = left--;
        console.log(left)
        if (left <= -links[0].offsetWidth){
            
         animId = requestAnimationFrame(moveHeadlines)
        
    }
        console.log("animId:", animId)
    cancelAnimationFrame(animId);

    console.log("links:", links)

    //links value is array that conntains all anchor tags

    links
    links.addEventListener('mouseenter')

    for(var i =0; i <links.length; i++){
        links[i].addEventListener('mouseenter', function(){
            console.log('mouseentered over a link')
        })
    }
})();
