//async version

const fs = require("fs");

function generateHtml(serverResponse) {
    let myHtml = "";
    fs.readdir(`${__dirname}/projects`, (err, files) => {
        if (err) {
            console.log("error: ", err);
        }

        files.forEach((arg) => {
            myHtml += `<li><a href="/${arg}/">${arg}</a></li>`;
        });
        return serverResponse.end(`<h1>My portfolio: </h1><ul>${myHtml}`);
    });
}

exports.generateHtml = generateHtml;
