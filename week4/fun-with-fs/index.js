//Exercise 1

const fs = require("fs");
// const myPath = __dirname;

// const logSizes = (path) => {
//     fs.readdir(path, { withFileTypes: true }, (err, data) => {
//         if (err) {
//             console.log("Error:", err);
//         }
//         data.forEach((arg) => {
//             if (arg.isFile()) {
//                 fs.stat(`${path}/${arg.name}`, (err, data) => {
//                     if (err) {
//                         console.log("Error: ", err);
//                     }
//                     console.log(`${path}/${arg.name}:`, data.size);
//                 });
//             } else {
//                 logSizes(`${path}/${arg.name}`);
//             }
//         });
//     });
// };

// logSizes(myPath);

//Exercise 2

let myNewPath = `${__dirname}/files`;
console.log(myNewPath);

const mapSizes = (path) => {
    const myDir = fs.readdirSync(path, { withFileTypes: true });
    let obj = {};
    myDir.forEach((arg) => {
        if (arg.isFile()) {
            const myStat = fs.statSync(`${path}/${arg.name}`);
            // console.log("file");
            // console.log(`${path}/${arg.name}`);
            // console.log(myStat.size);
            obj[arg.name] = myStat.size;
        } else {
            obj[arg.name] = mapSizes(`${path}/${arg.name}`);
        }
    });
    return obj;
};

let object = mapSizes(myNewPath);
console.log(object);

// let stringifiedObject = JSON.stringify(object, null, 4);
// console.log(stringifiedObject);

fs.writeFileSync(`${__dirname}/files.json`, JSON.stringify(object, null, 4));
