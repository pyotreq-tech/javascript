var text = document.querySelector("textarea");

text.addEventListener("input", function () {
    localStorage.setItem("text", text.value);
});

document.addEventListener("DOMContentLoaded", function () {
    text.value = localStorage.getItem("text");
});
