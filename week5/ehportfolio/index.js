const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

//way to require a json file, already parsed automatically to JS

const teachers = require("./data.json");

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));

app.get("/", (req, res) => {
    res.render("home", {
        // layout: null,
        cohort: "Pimento",
        // teachers: teachers
        teachers,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        // layout: null,
        emojis: ["😊", "🦠", "🧼", "😷"],
    });
});

app.listen(8080, () => {
    console.log("Server is listening...");
});
