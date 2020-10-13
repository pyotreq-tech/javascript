// // 'FIRST' is asynchronous b/c it takes some time to complete & it's nonblocking
// // we're using setTimeout to simulate async behavior
// function first() {
//     setTimeout(function () {
//         console.log(1);
//     }, 2000);
// }

// function second() {
//     console.log(2);
// }

// first();
// second();
// // here we see '2' and then '1'. We don't want this behavior!

// ///// USING CALLBACKS TO SOLVE ASYNC BEHAVIOR //////
// function first(callback) {
//     setTimeout(function () {
//         console.log(1);
//         callback();
//     }, 2000);
// }

// function second() {
//     console.log(2);
// }

// first(function () {
//     second();
// });

// ////////// LOOKING AT PROMISES SYNTAX //////////
// const { promisifiedFirst, second } = require("./promisified-functions");

// promisifiedFirst().then(() => {
//     second();
// });

// promisifiedFirst runs and when it successfully completes, THEN the code inside will run.

// promise object is in 1 of 3 states:
// pending - action is not complete (what it starts off as)
// resolved - everything went well :)
// reject - something went wrong :(
// once the promise is either resolved or rejected - it is considered 'settled'

//// skopiowac z notatek poprzednia czesc

// const { double } = require("./double");

// const { double } = require("./double");

// double(2).then((result) => {
//     // result is as a placeholder here
//     // console.log(result);
//     double(result).then((secondResult) => {
//         console.log("2nd result: ", secondResult);
//     });
// });

// if we are looking for err, we need to attach catch after curlies and normal of .then
// double("hello")
//     .then((result) => {
//         console.log("result: ", result);
//     })
//     .catch((err) => console.log("err in double: ", err));

////// CHAINING ON THENS /////////
// there is only one catch
// make sure that you will return values

// double(10)
//     .then((value) => {
//         console.log("value : ", value);

//         return double(100);
//     })
//     .then((nextVal) => {
//         console.log("nextVal: ", nextVal);
//     })
//     .catch((err) => {
//         console.log("err: ", err);
//     });

////// NESTED THENS //////
// you have access to the parent scope all the time, there is no need to return
// you can catch each error

// double(2)
//     .then((result) => {
//         double(result)
//             .then((secondResult) => {
//                 console.log("results: ", result);
//                 console.log("2nd result: ", secondResult);
//             })
//             .catch((err) => console.log("err in 2nd dbl: ", err));
//     })
//     .catch((err) => console.log("err in 1st dbl: ", err));

///// PROMISIFYING FINCTIONS - 3 WAYS /////

//// PROMISE CONSTRUCTOR

// wrapping into new Promise
// reject
// resolve

// const fs = require("fs");
// const path = __dirname;

// function readdir(path) {
//     //
//     return new Promise((resolve, reject) => {
//         fs.readdir(path, (err, files) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(files);
//             }
//         });
//     });
//     //
// }

// readdir(path).then((files) => console.log(files));

//////// UTIL. PROMISIFY ///////
// for node version 8+
// it must take a node-style callback function (callback function that takes err as its 1st argument);

// const fs = require("fs");
// const { promisify } = require("util");

// const readdir = promifify(fs.readdir);
// readdir(__dirname).then((content) => console.log("content: ", content));

////////EXPERIMENTAL PROMISES
//works only for promisifying fs methods

// const fs = require("fs").promises;

// function getFirstFileName() {
//     return fs.readdir(__dirname).then((files) => {
//         console.log(files[0]);
//     });
// }

// getFirstFileName();

///// PROMISE.ALL /////
//allow you to run multiple functions that has a promise at once
//and when functions don't depend on each other

// double(2)
//     .then((result) => {
//         double(result)
//             .then((secondResult) => {
//                 console.log("2nd result: ", secondResult);
//             })
//             .catch((err) => console.log("err in 2nd dbl: ", err));
//     })
//     .catch((err) => console.log("err in 1st dbl: ", err));

// adds results in the array

// Promise.all([double(10).double(20), double(30)])
//     .then((results) => {
//         console.log("redults from P.all: ", results);
//     })
//     .catch((err) => {
//         console.log("err: ", err);
//     });
