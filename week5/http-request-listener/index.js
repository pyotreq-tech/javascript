const http = require("http");

const server = http.createServer((request, response) => {
    request.on("error", (err) => console.log("err in req:", err));
    response.on("error", (err) => console.log("err in res:", err));

    console.log("request method: ", request.method);
    console.log("request url: ", request.url);
    console.log("request headers: ", request.headers);

    if (request.method === "GET") {
        // response.end();
        //if you send two responses in the same time the server will crush
        //cannot send headera after they are sent to the client
        if (request.url === "/secret-page") {
            //redirect them to the / page
            response.statusCode = 302;
            response.setHeader("Location", "/");
            response.end();
        }
        // add information like header and status code to our response
        else response.setHeader("content-type", "text/html");
        response.statusCode = 200;
        // construct a response
        // response.write(`Happy HTTP Day!`);
        // sends the response
        // responde.end();
        response.end(`Happy HTTP Day!`);
    } else if (request.method === "PUT") {
        response.statusCode = 200;
        response.end(`<h1> you made a PUT request! </h1>`);
    } else if (request.method === "POST") {
        console.log("you made a POST request!");

        let body = "";

        request.on("data", (chunk) => {
            body += chunk;
        });
        request.on("end", () => {
            //this runs when data has stopped coming in!
            console.log("body: ", body);
            response.setHeader("content-type", "text/html");
            response.statusCode = 200;
            response.end(
                `<h1>POST request has successfully been completed :)</h1>`
            );
        });
    } else if (request.method === "HEAD") {
        console.log("you made a HEAD request!");
    }
});

server.listen(8080, () => {
    console.log("Server is listening...");
});
