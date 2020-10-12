const express = require("express");
const app = express();

const { getToken, getTweets, filterTweets } = require("./ticker.js");

app.use(express.static("ticker"));

app.get("/links.json", (req, res) => {
    getToken(function (err, barerToken) {
        if (err) {
            console.log("Error in getToken: ", err);
            return;
        }

        getTweets(barerToken, function (err, tweets) {
            if (err) {
                console.log("Error in tweets: ", err);
                return;
            }

            const filteredTweets = filterTweets(tweets);
            res.json(filteredTweets);
        });
    });
});

app.listen(8080, () => {
    console.log("Server is waiting for the tweets...");
});
