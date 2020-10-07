const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// Order of middleware sometimes matters
// Middleware for cookies should run before express.static()

// it means we have a piece of middleware which will run on every route
// this will parse POST request body for us
// check if there is a post request and if yes, it parse for us
// if there are no post route, it is not needed
app.use(express.urlencoded({ extended: false }));

// next is a method that allows our middleware to run the rest of the route
// next is important, and position of middleware is important
// to be above our routing
// Imports > Declarations > Middleware > Routes

app.use((req, res, next) => {
    console.log("MIDDLEWARE running!!!");
    console.log(`a ${req.method} request was made to the ${req.url} route`);
    next();
});

// First we check whether user is allowed to see the website
// It creates an object of key - value pairs, living in request object
// req.cookies
app.use(cookieParser());
// express does allow to serve files only from th
app.use(express.static("./public"));

app.get("/", (req, res) => {
    // we set cookie in response

    console.log("req.cookies: ", req.cookies);
    res.send("<h1>Hello Pimento!!!</h1>");
    // res.sendFile('filepath');
    // res.redirect('/route');
    // res.render()
    // res.json()
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Dynamic generated route ":", value will be stored in req.params
app.get("/users/:username/:postId", (req, res) => {
    const { username, postId } = req.params;
    res.send("Username is: " + username + postId);
});

app.get("/register", (req, res) => {
    res.send(`
    <h2>Please tell us about yourself</h2>
        <form method='POST' style="display: flex; flex-direction: column; justify-content: space-between; width: 40%; height: 50%;">
            <input type='text' name='firstname' placeholder='First Name' autocomplete='off'>
            <input type='text' name='lastname' placeholder='Last Name' autocomplete='off'>
            <div>
                <span>How old are you? </span><input type="number" name="age">
            </div>
            <div>
                <input type="checkbox" name="subscribe"><span>Would you like to receive our newsletter?</span>
            </div>
            <button> submit </submit>
        </form>
        `);
});

app.post("/register", (req, res) => {
    res.cookie("first-cookie", "this is soo exciting!!!");
    res.cookie("authenticated", true);
    // In post requests we need to parse data for req.body
    // Middleware is a code that runs on every route before the route runs
    // console.log(req.body);
    // res.send(`
    // Record sent:
    // <p> firstname: ${req.body.firstname} </p>
    // <p> lastname: ${req.body.lastname} </p>
    // <p> age: ${req.body.age} </p>
    // <p> subscribe: ${req.body.subscribe} </p>
    // `);
    const { firstname, lastname, age, subscribe } = req.body;
    console.log("POST request made to the /register route");
    if (subscribe) {
        res.send(`
        <h1>Thank you ${firstname} ${lastname} for subscribing!</h1>
        <h2>You are ${age} years old, apparently</h2>
        `);
    } else {
        res.send(`
        
        <h1>We are sorry you didn't want to subscribe</h1>
        <h3>We'll get over it in ${age} years... </h3>
        `);
    }
});

app.get("/private", (req, res) => {
    console.log("req.cookie: ", req.cookies);
    if (req.cookies.authenticated) {
        res.send(`
    
    <h1>TOP SECRET INFORMATION</h1>
    <h3>this is sooooo secret </h3>
    
    `);
    } else {
        res.redirect("/");
    }
});

app.listen(8080, () => {
    console.log("Server is listening...");
});
