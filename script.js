// SCOPE
// HOISTING
// CALLBACKS

// setTimeout(arg1, arg2);
// arg1 - callback
// arg2 - amount of time to wait before You run the callback

// setTimeout(function () {
//     console.log("this runs after 3 seconds");
// }, 3000);

// IIFE
// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS

// makes sure that the code You write inside Your bubble is local.EXPRESSIONS
// (function(){

// })();

// ARGUMENTS

// for flexible function, when You don't know how many arguments You will receive
// function sayHi() {
//     console.log(arguments);
//     console.log(arguments.length);
// }

// sayHi("Pimento", "Andrea", "Pete", "Allister", "Ivana", "David");

//RECURSION - google joke
//It's calling function within a function
// There has to be a stopping Condition.
// Loops are for arrays and objects and Recursions for functions.

// function countdown(num) {
//     console.log(num);

//     if (num <= 0) {
//         return;
//     } else {
//         countdown(num - 1);
//     }
// }

// countdown(5);

// Shift Alt dwnArrow
// // ALT arrdown - moves down
// // Shift Alt dwnArrow

// //SPLICE

// colors = ["orange", "blue", "red", "green", "yellow", "purple"];
// // var remove = colors.splice(1, 2);
// // console.log(colors);
// // console.log(remove);

//we have mutared, changed the Array

// var myColors = colors.slice(1, 4);
// console.log(myColors);

// var copyOfColors = colors.slice();
// console.log(copyOfColors);

// var longColors = colors.filter(function (color) {
//     return color.length > 4;
// });

// console.log(longColors);

// "pets" in person = checks whether is a property in Object

// person.hasOwnProperty("address");

// DELETE FROM Object

// delete person["Embarassing Stuff"];

// CONSTRUCTOR - function which ALWAYS returns objects
// name starts with capital letter

// function Person(firstName, surname) {
//     this.name = firstName;
//     this.lastName = surname;
// }

// var ivana = new Person("ivana", "matijevic");
// var david = new Person("piotr", "majtyka");

// var britneySpears;

// objects created by constructors are instance
// function that exists inside an object is a method

//prototype is the parent of an object
//our objects have parents, and they can inherit properties from them

// Person.prototype.sleeps = function () {
//     console.log("zzzzzz");
// };

//syntax above - You will not see properties in console.log, however they exists

//this is an object that Dog will return

// function Dog() {
//     this.cute = true;
// }

// var terrier = new Dog();

//usually we do anonymous functions in object

//this shows object itself inside which method is inside of "obj"
// var obj = {
//     name: "lucy",
//     breed: "unknown",
//     cute: true,
//     barks: function () {
//         console.log(this.name + " is cute");
//     },
// };

// obj.barks();

//ex num 2, no constructors
