// const express = require("express");
// const app = express();

// const { getToken, getTweets, filterTweets } = require("./ticker.js");

// app.use(express.static("ticker"));

// app.get("/links.json", (req, res) => {
//     //call with promise syntax
//     getToken(function (err, barerToken) {
//         if (err) {
//             console.log("Error in getToken: ", err);
//             return;
//         }
//         //call with promise syntax
//         getTweets(barerToken, function (err, tweets) {
//             if (err) {
//                 console.log("Error in tweets: ", err);
//                 return;
//             }

//             const filteredTweets = filterTweets(tweets);
//             res.json(filteredTweets);
//         });
//     });
// });

// app.listen(8080, () => {
//     console.log("Server is waiting for the tweets...");
// });

// FIRST WE NEED TO PROMISIFY OUR TWITTER

// const express = require("express");
// const app = express();

// const { getToken, getTweets, filterTweets } = require("./ticker.js");

// app.use(express.static("ticker"));

// app.get("/links.json", (req, res) => {
//     //call with promise syntax
//     getToken()
//         .then((token) => {
//             return getTweets(token, "Drake").then((drakeTweets) => {
//                 getTweets(token, "papinadepalma").then((papinaTweets) => {
//                     getTweets(token, "MarsCuriosity").then((marsTweets) => {
//                         // combine tweets/filter tweets/send them back
//                     });
//                 });
//             });
//         })
//         .catch((err) => {
//             console.log("err in catch: ", err);
//             res.sendStatus(500);
//         });
// });

// app.listen(8080, () => {
//     console.log("Server is waiting for the tweets...");
// });

const express = require("express");
const app = express();

const { getToken, getTweets, filterTweets } = require("./ticker.js");

app.use(express.static("ticker"));

app.get("/links.json", (req, res) => {
    //call with promise syntax
    getToken()
        .then((token) => {
            // takes single argument - array of promises
            Promise.all([
                // no matter when it comes back, the order stays the same in results
                getTweets(token, "MTV"),
                getTweets(token, "papinadepalma"),
                getTweets(token, "MarsCuriosity"),
            ])
                .then((results) => {
                    // [[drakeTweets], [papinaTweets], [marsTweets]];
                    // const drake = results[0];
                    // const papina = results[1];
                    // const mars = results[2];
                    // const { drake, papina, mars } = results;
                    // const mergedResults = drake.concat(papina, mars);
                    // const mergedResults = [...drake, ...papina, ...mars];
                    const mergedResults = [
                        ...results[0],
                        ...results[1],
                        ...results[2],
                    ];

                    const sortedTweets = mergedResults.sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                    });

                    // console.log(sortedTweets);

                    const filteredTweets = filterTweets(sortedTweets);
                    res.json(filteredTweets);
                })
                // if all 3 resolved - this runs
                .catch((err) => {
                    console.log("err in promise all: ", err);
                });
            // if any single promise doesn't resolve as expected - here runs
        })
        .catch((err) => {
            console.log("err in catch: ", err);
            res.sendStatus(500);
        });
});

app.listen(8080, () => {
    console.log("Server is waiting for the tweets...");
});
