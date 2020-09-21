// var board = document.getElementById("board");
var jqBoard = $("#board");
// var animals = document.getElementsByClassName("animal");
var jqAnimals = $(".animal");
var animalsLeft = [0, 0, 0, 0];

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// board.addEventListener("click", function () {
//     for (var i = 0; i < animalsLeft.length; i++) {
//         animalsLeft[i] += getRandomNumber(21);
//         animals[i].style.left = animalsLeft[i] + "px";
//     }
// });

// turn this clickhandler into a jQuery eventhandler
jqBoard.on("click", function () {
    for (var i = 0; i < animalsLeft.length; i++) {
        animalsLeft[i] += getRandomNumber(21);
        jqAnimals.eq(i).css({
            left: animalsLeft[i] + "px",
        });

        // jqAnimals.toggle(1000);
        // jqAnimals.eq(i).hide(1000).show(1000);
        // jqAnimals.eq(i).fadeOut(600).fadeIn(600);
    }
});

// document.getElementById("boost-button").addEventListener("click", function (e) {
//     console.log("clicked on boost button!");
//     e.stopPropagation();

//     animalsLeft[0] += 20;
//     animals[0].style.left = animalsLeft[0] + "px";
// });

$("#boost-button").on("click", function boostTurtle(e) {
    e.stopPropagation();
    $("#boost-button").html(
        '<div class="boost-button" id="boost-button"> ️Boost used !! </div>'
    );
    animalsLeft[0] += 20;
    jqAnimals.eq(0).css({
        left: animalsLeft[0] + "px",
    });
    //turning off the event handler for the turtle boost
    $(e.target).off("click", boostTurtle);
});

// document.addEventListener("keydown", function (evt) {
//     if (evt.keyCode === 82) {
//         var r = getRandomNumber(256);
//         var g = getRandomNumber(256);
//         var b = getRandomNumber(256);
//         var randomColor = "rgb(" + r + "," + g + "," + b + ")";
//         console.log(randomColor);
//         board.style.backgroundColor = randomColor;
//     }
// });

$(document).on("keydown", function (evt) {
    if (evt.keyCode === 82) {
        var r = getRandomNumber(256);
        var g = getRandomNumber(256);
        var b = getRandomNumber(256);
        var randomColor = "rgb(" + r + "," + g + "," + b + ")";
        console.log(randomColor);
        jqBoard.eq(0).css({
            "background-color": randomColor,
        });
    }
});

//TICKER EXERCISE - FIND
