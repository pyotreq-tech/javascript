var x;
var doubleX;

x = 7;

function timesTwo(num) {
    return num * 2;
}

doubleX = timesTwo(x);

var numbers;

numbers = [x, doubleX];

numbers.forEach(function (num) {
    console.log(num);
});

numbers = {};

numbers.y = doubleX;
