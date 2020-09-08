//1

//2
for (var i = 10; i >= 1; i--) {
    console.log(i);
}

//3
var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

var b = {};

for (var key in a) {
    b[a[key]] = key;
}
