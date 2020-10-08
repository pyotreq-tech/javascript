const express = require("express");
const cookieParser = require("cookie-parser");
const basicAuth = require("basic-auth");
const app = express();

const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "piotr3" || creds.pass != "piotr4") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/cookie", (req, res) => {
    res.sendFile(__dirname + "/cookie.html");
});

app.post("/cookie", (req, res) => {
    if (req.body.agreedToCookies) {
        res.cookie("agreedToCookies", "yes");
        res.redirect(req.cookies.url);
    } else {
        res.send(
            "I am sorry but you cannot continue until you agree for cookie policy"
        );
    }
});

app.use((req, res, next) => {
    if (req.cookies.agreedToCookies) {
        return next();
    } else {
        res.cookie("url", req.originalUrl);
        res.redirect("/cookie");
    }
});

app.get("/canvas", auth);

app.use(express.static("./public"));

app.listen(8080, () => {
    console.log("Server is listening...");
});
