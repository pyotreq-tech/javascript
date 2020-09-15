//1
function selector(type) {
    var result = document.querySelectorAll(type);
    for (var i = 0; i < result.length; i++) {
        result[i].style.fontStyle = "italic";
        result[i].style.textDecoration = "underline";
        result[i].style.fontWeight = "bold";
    }
}

//2
function classCheck(name) {
    var result = document.getElementsByClassName(name);
    var a = [];
    for (var i = 0; i < result.length; i++) {
        a.push(result[i]);
    }
    return a;
}
//3

function insert(el) {
    var newElement = document.createElement(el);
    var newContent = document.createTextNode("AWESOME");
    document.body.append(newElement);
    newElement.appendChild(newContent);
    newElement.style.zIndex = "2147483647";
    newElement.style.left = "20px";
    newElement.style.top = "100px";
    newElement.style.fontSize = "200px";
    newElement.style.position = "fixed";
}
