(function () {
    var kitties = document.querySelectorAll(".kitty-container img");
    var i = 0;
    setTimeout(moveKitties, 3000);

    function moveKitties() {
        //to pull the next kitty onscreen...
        kitties[i].classList.remove("onscreen");
        kitties[i].classList.add("offscreen-left");

        //to go through kitties and make infinite loop
        i++;
        if (i === 4) {
            i = 0;
        }
        // to remove a kitty from the screen...
        kitties[i].classList.add("onscreen");
    }

    document.addEventListener("transitionend", function (event) {
        if (event.target.classList.value === "offscreen-left") {
            event.target.classList.remove("offscreen-left");
        } else {
            return;
        }
        setTimeout(moveKitties, 3000);
    });
})();
