const http = require("http");
const fs = require("fs");
const path = require("path");
//for sync version:
const script = require("./script");
//for async version:
const script2 = require("./script2");
const extension = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};
// console.log(script2.generateHtml());
// const { generateHtml } = require('./fun')

http.createServer((req, res) => {
    // const myReadStream = fs.createReadStream(
    //     __dirname + "/projects/panes/style.css"
    // );
    // //pipe the readable stream into a writable stream (i.e. response object)
    // myReadStream.pipe(res);
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 200;

        //For sync version:
        return res.end("<h1>My portfolio: </h1>" + script.generateHtml());

        //for async version
        // return script2.generateHtml(res);
    }
    if (req.method !== "GET") {
        res.statusCode = 405; //method not allowed
        return res.end();
    }

    const filePath = path.normalize(`${__dirname}/projects${req.url}`);
    // console.log("req url", filePath);

    // traversal attack (DOT DOT SLASH) - when user is trying to visit
    // the part of our server that is not supposed to visit
    // console.log("/users/petea/../../../wp-config");
    // console.log(path.normalize('"/users/petea/../../../wp-config"'));

    if (!filePath.startsWith(`${__dirname}/projects/`)) {
        res.statusCode = 403; //forbidden
        console.log("INTRUDER ALERT");
        return res.end();
    }

    // console.log("Now is the time to try and serve something");

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            console.log("err if fs.stat: ", err);
            return res.end("blad 404");
        }
        // console.log("do something...", stats);
        if (stats.isFile()) {
            // console.log("we are serving a file");
            console.log("we are serving a file", path.extname(filePath));
            console.log(filePath);
            const readStreamHtml = fs.createReadStream(filePath);
            res.setHeader("Content-Type", extension[path.extname(filePath)]);
            readStreamHtml.pipe(res);
            readStreamHtml.on("error", (err) => {
                console.log("err in readStreamHtml: ", err);
                res.statusCode = 500;
                res.end();
            });
            // const readStreamHtml = fs.createReadStream(`${filePath}/${stats.name}`)
            // E STILL need to create a readable stream
            // object;
            // we need to set the correct header type based on the extname
        } else {
            console.log("It is a directory");
            if (req.url.endsWith("/")) {
                if (fs.existsSync(`${filePath}/index.html`)) {
                    console.log("contains index.html");
                    // console.log("file path: ", filePath);
                    const readStreamHtml = fs.createReadStream(
                        `${filePath}/index.html`
                    );
                    res.setHeader("Content-Type", "text/html");
                    readStreamHtml.pipe(res);
                    readStreamHtml.on("error", (err) => {
                        console.log("err in readStreamHtml: ", err);
                        res.statusCode = 500;
                        res.end();
                    });
                } else {
                    console.log("contains no index.html");
                    res.statusCode = 404;
                    res.end("blad 404");
                }
            } else {
                // redirect them to a url that has a slash at the end

                res.setHeader("Location", req.url + "/");
                res.statusCode = 302;
                res.end();
            }
        }
    });
}).listen(8080, () => {
    console.log("Server is listening...");
});
