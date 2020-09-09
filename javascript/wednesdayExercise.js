//1
function sum() {
    var sum = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

sum(10, 20, 40, 30);

//2
function waitThenRun(fnc) {
    setTimeout(fnc, 1500);
}

waitThenRun(function () {
    console.log("Hello!");
    waitThenRun(function () {
        console.log("Goodbye!");
    }); // logs 'Goodbye!' 1.5 seconds later
}); // logs 'Hello!' 1.5 seconds later

//3

function check(num) {
    if (num <= 0 || isNaN(num)) {
        return "ERROR";
    } else if (num >= 1000000) {
        console.log(num);
        //does console.log but return undefined when num is between 1 and 999999?
        return num;
    } else {
        check(num * 10);
    }
}

check(10);

//4

function getTotaler() {
    var sum = 0;
    return function () {
        var result = (sum += arguments[0]);
        return result;
    };
}

var totaler = getTotaler();
totaler(1);
totaler(3);
totaler(5);
