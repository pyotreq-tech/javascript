var button = document.getElementById("first-button");
var pageBackground = document.querySelector("body");
var input = document.querySelector("input");
var newDiv = document.getElementsByClassName("new-div")[0];
var takeMeAway = document.querySelector("a");

takeMeAway.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Nooo, You are staying right here");
});

button.addEventListener("click", function () {
    console.log("someone clicked on the button");
    pageBackground.style.backgroundColor = "blue";
    button.stopPropagation;
});

document.addEventListener("keydown", function (event) {
    if (event.key === "p") {
        console.log("The letter 'P' was pressed");
        pageBackground.style.backgroundColor = "tomato";
    } else {
        console.log("any key was pressed");
    }
});

input.addEventListener("input", function (event) {
    console.log("input is happening");
    event.target.value = "Pimento!!";
});

newDiv.addEventListener("click", function () {
    newDiv.style.backgroundColor = "green";
});
