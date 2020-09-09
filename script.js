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
