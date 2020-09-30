//Exercise 1

for (let i of genFunc()) {
    console.log(i);
}

function* genFunc() {
    let num = 1;
    while (num <= 100) {
        if (num % 15 === 0) {
            yield "fizzbuzz";
        } else if (num % 3 === 0) {
            yield "fizz";
        } else if (num % 5 === 0) {
            yield "buzz";
        } else {
            yield num;
        }
        num++;
    }
}

//Exercise 2
let array = ["a", "b", "c", "d", "e"];

function* genFunc(arr) {
    let i = arr.length;
    while (i >= 1) {
        i--;
        yield arr[i];
    }
}

let it = genFunc(array);
it.next;

let result = it.next();
console.log(result);

let result2 = it.next();
console.log(result2);

let result3 = it.next();
console.log(result3);

let result4 = it.next();
console.log(result4);

let result5 = it.next();
console.log(result5);

let result6 = it.next();
console.log(result6);

//Exercise 3

function genFunc() {
    let i = 0;
    let result = [];
    while (i < arguments.length) {
        result.push(arguments[i]);
        i++;
    }
    return result;
}

const a = genFunc(10, 20, 30);

console.log(a[0]);
console.log(a[1]);
console.log(a[2]);

a[Symbol.iterator] = function* () {
    for (var i = this.length - 1; i >= 0; i--) {
        yield this[i];
    }
};

console.log([...a]);
