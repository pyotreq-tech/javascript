//1
var area = function () {
    if (arguments.length === 1) {
        return arguments[0] * arguments[0];
    } else {
        return arguments[0] * arguments[1];
    }
};

function Rectangle(width, height) {
    this.getArea = function () {
        return area(width, height);
    };
}
function Square(width) {
    this.getArea = function () {
        return area(width);
    };
}

var square = new Square(4);
square.getArea();

var rect = new Rectangle(4, 5);
rect.getArea();

//2
function invertCase(word) {
    var newWord = "";
    for (var i = 0; i < word.length; i++) {
        if (word[i] === word[i].toUpperCase()) {
            newWord += word[i].toLowerCase();
        } else {
            newWord += word[i].toUpperCase();
        }
    }
    return newWord;
}

//3
function Countdown(num) {
    this.countdown = function timer(num) {
        if (num < 0) {
            return num;
        } else {
            setTimeout(function () {
                console.log(num);
                num = timer(num - 1);
                return num;
            }, 1000);
            return num;
        }
    };
    this.start = function () {
        this.countdown(num);
    };
}

var test = new Countdown(7);
test.start();
