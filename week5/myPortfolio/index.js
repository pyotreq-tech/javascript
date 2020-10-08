const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const data = require("./data.json");

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("welcome", {
        data,
    });
});

app.listen(8080, () => {
    console.log("Server is listening...");
});
