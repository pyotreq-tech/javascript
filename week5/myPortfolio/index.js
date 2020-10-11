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
        welcome: "Yes",
    });
});

app.get("/project/:project", (req, res) => {
    const { project } = req.params;
    const selectedProject = data.find((item) => item.directory === project);
    // console.log(project, selectedProject);
    if (!selectedProject) {
        res.send("Error 404, page not found");
    } else {
        res.render("project", {
            data,
            selectedProject,
            helpers: {
                activeLink(arg) {
                    if (selectedProject.directory === arg) {
                        return true;
                    }
                },
            },
        });
    }
});

app.listen(8080, () => {
    console.log("Server is listening...");
});
