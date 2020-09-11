//1
//STILL IN PROGRESS
// function Rectangle(width, height) {
//     this.getArea = function () {
//         return width * height;
//     };
// }
// var rect = new Rectangle(4, 5);
// rect.getArea();

// function Square(num) {}

// Square.prototype.getArea = Rectangle(this.getArea);
// var square = new Square(3);
// square.getArea;

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
