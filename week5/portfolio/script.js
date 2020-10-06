//sync version

const fs = require("fs");

function generateHtml() {
    const folder = fs.readdirSync(`${__dirname}/projects`);
    let myHtml = "";
    folder.forEach((arg) => {
        myHtml += `<li><a href="/${arg}/">${arg}</a></li>`;
    });
    return myHtml;
}

exports.generateHtml = generateHtml;
