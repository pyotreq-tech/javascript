const fs = require("fs"); //we are requirign fs so that we can use its functions, fs is a core module of node

const message = "Let's write our very second file with javascript Pimento <3";

const myPath = __dirname; // gets me the path this file is executed at

// console.log("myPath has a value of:", myPath);

//writing our first file the async way

fs.writeFile(`${myPath}/pimento.txt`, message, (err) => {
    if (err) {
        // console.log("something went wrong in witeFile", err);
        return;
    }
    // console.log("write file worked fine");
});

const obj = {
    name: "Pimento",
    favouruteFilms: ["Batman", "One flew over the cuckoo's nest", "Avatar"],
};

//If you want to format JSON nicely, the second argument will be null
fs.writeFileSync(`${myPath}/my_new_file.json`, JSON.stringify(obj, null, 4));

//readdir: reading the content of a specified directory

//filetypes true check whether content is directory or a file
fs.readdir(myPath, { withFileTypes: true }, (err, content) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("content:", content);
    for (let i = 0; i < content.length; i++) {
        // console.log("content name is:", content[i].name);
        // console.log(content[i].name, "is a file? ", content[i].isFile());
    }
    // console.log("readdir has end running");
});
// console.log("this console.log came after fs readdir");

//readdirSync: reading the content of a specified directory syncronously
const myDir = fs.readdirSync(myPath, { withFileTypes: true });
// console.log("readdirSync has this value:", myDir);
// console.log("I come after readdirSync");
// console.log(myDir[0].name, "is this a directory?", myDir[0].isDirectory());
// console.log(myDir[4].name, "is this a file?", myDir[4].isFile());

fs.stat(`${myPath}/pimento.txt`, (err, data) => {
    if (err) {
        console.log("err in stat:", err);
        return;
    }
    console.log("stat for", `${myPath}/pimento.txt`, data);
});

//statSync
// [1].name work only with the files that live on the same level
const myStat = fs.statSync(myDir[1].name);
console.log(`myStat for ${myDir[1].name} value is:`, myStat);

// readFile: reading file content
fs.readFile(`${__dirname}/index.js`, "utf8", (err, fileContent) => {
    if (err) {
        console.log("error in readFile:", err);
    }
    console.log("fileContent:", fileContent);
});

const myFile = fs.readFileSync(`${myPath}/index.js`, "utf8");

console.log(myFile);

//EXERCISES:
