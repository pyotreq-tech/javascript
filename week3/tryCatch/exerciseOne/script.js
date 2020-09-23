var text = document.querySelector("textarea");
var btnVal = document.getElementById("validate");
var btnCln = document.getElementById("clean");

btnVal.addEventListener("click", function () {
    try {
        JSON.parse(text.value);
        alert("Congratulations, it is a valid JSON code");
    } catch (e) {
        alert("Sorry, it is not a valid JSON code");
    }
});

btnCln.addEventListener("click", function () {
    text.value = "";
});
