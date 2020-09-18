(function () {
    var kitties = document.querySelectorAll(".kitty-container img");
    var dots = document.getElementsByClassName("dot");
    var i = 0;
    var timer;
    var isCurrentlyAnimating;

    timer = setTimeout(moveKitties, 3000);

    for (var j = 0; j < dots.length; j++) {
        dots[j].addEventListener("click", function (event) {
            // if (event.target.classList.contains("on")) {
            //     return;
            // }
            if (isCurrentlyAnimating) {
                return;
            }
            for (var j = 0; j < dots.length; j++) {
                if (dots[j] == event.target) {
                    if (j == i) {
                        return;
                    }
                    clearTimeout(timer);
                    moveKitties(j);
                }
            } //this function runs in the future, thats why the j value will be always 4
        });
    }

    //ALTERNATIVE WAY OF DOING THAT:

    // for (var j = 0; j < dots.length; j++) {
    //     dots[j].addEventListener("click", getClickHandler(j));
    // }

    // function getClickHandler(j) {
    //     return function () {
    //         clearTimeout(timer);
    //         console.log(j);
    //     };
    // }

    // function getClickHandler(j) {
    //         clearTimeout(timer);
    //         console.log(j);

    // }

    function moveKitties(nextIndex) {
        //to pull the next kitty onscreen...
        isCurrentlyAnimating = true;
        kitties[i].classList.remove("onscreen");
        dots[i].classList.remove("on");
        kitties[i].classList.add("offscreen-left");

        if (typeof nextIndex != "undefined") {
            i = nextIndex;
        } else {
            //to go through kitties and make infinite loop
            i++;
            if (i === kitties.length - 1) {
                i = 0;
            }
        }
        // to remove a kitty from the screen...
        kitties[i].classList.add("onscreen");
        dots[i].classList.add("on");
    }

    document.addEventListener("transitionend", function (event) {
        if (event.target.classList.contains("offscreen-left")) {
            isCurrentlyAnimating = false;
            event.target.classList.remove("offscreen-left");
            timer = setTimeout(moveKitties, 3000);
        }
    });
})();
