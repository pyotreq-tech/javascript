const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    request.on("error", (err) => console.log("err in req:", err));
    response.on("error", (err) => console.log("err in res:", err));

    console.log("request method: ", request.method);
    console.log("request url: ", request.url);
    console.log("request headers: ", request.headers);

    let data = {};
    data.date = Date();
    data.method = request.method;
    data.url = request.url;
    data.userAgent = request.headers["user-agent"];

    let stringifiedData = JSON.stringify(data, null, "\t");

    fs.appendFile("requests.txt", stringifiedData, (err) => {
        if (err) {
            console.log("error: ", err);
        }
        console.log("The data to append was sppended to file!");
    });

    if (request.method === "GET") {
        // response.end();
        //if you send two responses in the same time the server will crush
        //cannot send headera after they are sent to the client
        if (request.url === "/secret-page") {
            //redirect them to the / page
            response.statusCode = 302;
            response.setHeader("Location", "/");
            response.end();
        } else if (request.url === "/requests.txt") {
            response.statusCode = 200;
            response.setHeader("content-type", "text/html");
            response.setHeader(
                "Content-Disposition",
                "attachment; filename=download.txt"
            );
            fs.createReadStream("requests.txt").pipe(response);
        }
        // add information like header and status code to our response
        else {
            response.setHeader("content-type", "text/html");
            response.statusCode = 200;
            // construct a response
            // response.write(`Happy HTTP Day!`);
            // sends the response
            // responde.end();
            response.end(`<!doctype html>
                <html>
                <title>Hello World!</title>
                <p>Hello World!</p>
                </html>
            `);
        }
    } else if (request.method === "POST") {
        console.log("you made a POST request!");

        let body = "";

        request.on("data", (chunk) => {
            body += chunk;
        });
        request.on("end", () => {
            //this runs when data has stopped coming in!
            console.log("body: ", body);
            response.setHeader("Location", "/");
            response.statusCode = 302;
            response.end();
        });
    } else if (request.method === "HEAD") {
        console.log("you made a HEAD request!");
        response.setHeader("content-type", "text/html");
        response.statusCode = 200;
        response.end();
    } else {
        response.statusCode = 405;
        response.end();
    }
});

server.listen(8080, () => {
    console.log("Server is listening...");
});
