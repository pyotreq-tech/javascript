const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

//declaring helpers globally, between require and engine/set
//only with global helpers

const hbSethandlebars = handlebars.create({
    helpers: {
        globalHello() {
            return "Global Hello right back";
        },
    },
});

//way to require a json file, already parsed automatically to JS

const teachers = require("./data.json");

// w.o. global helpers
// app.engine("handlebars", handlebars());
// app.set("view engine", "handlebars");

app.engine("handlebars", hbSethandlebars.engine);
app.set("view engine", "handlebars");

app.use(express.static("./projects"));

app.get("/", (req, res) => {
    res.render("home", {
        // layout: null,
        cohort: "Pimento",
        // teachers: teachers
        teachers,
        //here we can declare functions
        helpers: {
            shouting(text) {
                return (
                    text
                        .slice(5)
                        .replace("o", "apas is delicious")
                        .toUpperCase() + "!!!!!!!!"
                );
            },
            mathsTime(num) {
                return num * Math.floor(Math.random() * 21);
            },
        },
    });
});

app.get("/about", (req, res) => {
    //we pass data OBJECT to the template
    res.render("about", {
        // layout: null,
        emojis: ["😊", "🦠", "🧼", "😷"],
    });
});

app.listen(8080, () => {
    console.log("Server is listening...");
});

//We will be making a list of projects with partials.
//Welcome template we will hae  a loop

// {{#projects}}
//some code
//we will move to partial because we will need it in two places
//later in description page we will use for nav bar
//depending on page image / no image
// {{/projects}}

//helpers we can declare locally or gloally
