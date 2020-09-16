var num = function () {
    return Math.floor(Math.random() * 256);
};

var randomColor = function () {
    return "rgb(" + num() + ", " + num() + ", " + num() + ")";
};

var div = document.getElementsByTagName("div")[0];

div.addEventListener("mouseup", function (event) {
    event.target.style.backgroundColor = randomColor();
});

div.addEventListener("mousedown", function (event) {
    event.target.style.backgroundColor = randomColor();
});
