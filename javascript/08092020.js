// 1
var test;
function logType(arg) {
    if (typeof arg === "undefined") {
        console.log("undefined!");
    } else if (arg === null) {
        console.log("null!");
    } else if (typeof arg === "number") {
        if (isNaN(arg)) {
            console.log("not a number!");
        } else {
            console.log("number!");
        }
    } else if (typeof arg === "string") {
        console.log("string!");
    } else if (typeof arg === "boolean") {
        console.log("boolean!");
    } else if (typeof arg === "bigint") {
        console.log("bigint!");
    } else if (typeof arg === "function") {
        console.log("function!");
    } else if (Array.isArray(arg) === true) {
        console.log("array!");
    } else if (typeof arg === "object") {
        console.log("object!");
    } else {
        console.log("I have no idea!");
    }
}

logType(test);

// 2
var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

var b = {};

for (var key in a) {
    b[a[key]] = key;
}

// 3
for (var i = 10; i >= 1; i--) {
    console.log(i);
}
