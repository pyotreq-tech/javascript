var runners = document.getElementsByClassName("runner");
var donuts = document.getElementsByClassName("donut");

var ghost = 0;
var alien = 0;
var robot = 0;
var horse = 0;

function getRandomNumber() {
    return Math.floor(Math.random() * 101);
}

function winnerCheck() {
    for (var i = 0; i < runners.length; i++) {
        if (
            runners[i].offsetLeft + runners[i].offsetWidth >=
            donuts[i].offsetLeft
        ) {
            console.log("game over", runners[i].innerText, "is the winner");
            document.removeEventListener("keydown", game);
        }
    }
}
function game(event) {
    if (event.keyCode === 32) {
        ghost += getRandomNumber();
        alien += getRandomNumber();
        robot += getRandomNumber();
        horse += getRandomNumber();

        runners[0].style.left = ghost + "px";
        runners[1].style.left = alien + "px";
        runners[2].style.left = robot + "px";
        runners[3].style.left = horse + "px";

        winnerCheck();
    }
}

document.addEventListener("keydown", game);
