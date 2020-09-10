//1
function each(data, func) {
    if (Array.isArray(data)) {
        data.forEach(func);
    } else if (typeof data === "object") {
        for (var key in data) {
            func(data[key], key);
        }
    }
}

//2
function reverse(arr) {
    var newArr = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    return newArr;
}

//3
function getLessThanZero(arr) {
    var minus = arr.filter(function (el) {
        return el < 0;
    });
    return minus;
}
