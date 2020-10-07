const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

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

app.use(express.static("./public"));

app.listen(8080, () => {
    console.log("Server is listening...");
});
