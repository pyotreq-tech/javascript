var div = document.querySelector("div");

document.addEventListener("mouseover", move);

function move(event) {
    div.style.left = event.clientX - 50 + "px";
    div.style.top = event.clientY - 50 + "px";
}
