(function () {
    var kitties = document.querySelectorAll(".kitty-container img");
    var i = 0;
    setTimeout(moveKitties, 3000);

    function moveKitties() {
        if (i < 3) {
            kitties[i].classList.remove("onscreen");
            kitties[i].classList.add("offscreen-left");
            //to pull the next kitty onscreen...

            kitties[i + 1].classList.add("onscreen");
            // to remove a kitty from the screen...
            i++;
            console.log(i);
        } else {
            kitties[i].classList.remove("onscreen");
            kitties[i].classList.add("offscreen-left");
            kitties[0].classList.add("onscreen");
            i = 0;
        }
    }

    document.addEventListener("transitionend", function (event) {
        if (event.target.classList.value === "offscreen-left") {
            console.log(event.target);
            event.target.classList.remove("offscreen-left");
        } else {
            return;
        }
        setTimeout(moveKitties, 3000);
    });
})();
