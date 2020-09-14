//1
var area = function (width, height) {
    return width * height;
};

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.getArea = function () {
        return area(this.width, this.height);
    };
}
function Square(width) {
    this.width = width;
    this.height = width;
    this.getArea = function () {
        return area(this.width, this.height);
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
