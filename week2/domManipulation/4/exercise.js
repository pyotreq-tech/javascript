var num = function () {
    return Math.floor(Math.random() * 256);
};

var randomColor = function () {
    return "rgb(" + num() + ", " + num() + ", " + num() + ")";
};

var child = document.querySelector(".child");
child.addEventListener("click", function (event) {
    event.target.style.backgroundColor = randomColor();
    event.preventDefault();
});

var parent = document.querySelector(".parent");
parent.addEventListener("click", function (event) {
    event.target.style.backgroundColor = randomColor();
});
