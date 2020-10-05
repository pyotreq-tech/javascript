const chalk = require("chalk");
const html = require("./html");
const qs = require("querystring");
const http = require("http");

const server = http.createServer((req, res) => {
    req.on("error", (err) => console.log("Error in request ", err));
    res.on("error", (err) => console.log("Error in response ", err));
    console.log(req.method);
    if (req.method === "GET") {
        res.write(html.text);
        res.end();
    }

    if (req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            console.log("body: ", body);
            console.log("qs.parse(body): ", qs.parse(body));
            const userText = qs.parse(body).text;
            const color = qs.parse(body).color;
            console.log(chalk.keyword(color)(userText));
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            res.write(`
              <a href="/" style="text-decoration: none"><p style="color: ${color}">
              Hello ${userText}</p></a>
            `);

            res.end();
        });
    }
});

server.listen(8080, () => {
    console.log("Server is listening...");
});
