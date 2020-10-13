const { Key, Secret } = require("./secrets.json");
const https = require("https");

exports.getToken = () => {
    return new Promise((resolve, reject) => {
        let creds = `${Key}:${Secret}`;
        let encodedCreds = Buffer.from(creds).toString("base64");
        const options = {
            method: "POST",
            host: "api.twitter.com",
            path: "/oauth2/token",
            headers: {
                Authorization: `Basic ${encodedCreds}`,
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        };

        function cb(response) {
            if (response.statusCode != 200) {
                console.log(
                    "Something went wrong in getToken: ",
                    response.statusCode
                );
                reject(response.statusCode);
            }
            let body = "";
            response.on("data", function (chunk) {
                body += chunk;
            });
            response.on("end", function () {
                let parsedBody = JSON.parse(body);
                resolve(parsedBody.access_token);
            });
        }
        const req = https.request(options, cb);
        req.end("grant_type=client_credentials");
    });
};

exports.getTweets = function (bearerToken, account) {
    return new Promise((resolve, reject) => {
        const options = {
            method: "GET",
            host: "api.twitter.com",
            path: `/1.1/statuses/user_timeline.json?count=20&screen_name=${account}&tweet_mode=extended`,

            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        };

        function cb(response) {
            if (response.statusCode != 200) {
                console.log(
                    "Something went wrong in Tweets: ",
                    response.statusCode
                );
                reject(response.statusCode);
            }
            let body = "";
            response.on("data", function (chunk) {
                body += chunk;
            });
            response.on("end", function () {
                let parsedBody = JSON.parse(body);

                resolve(parsedBody);
            });
        }

        const req = https.request(options, cb);
        req.end();
    });
};

exports.filterTweets = function (tweets) {
    //here we need to add who made a tweet, we need to append that to text
    let newObject = [];
    function check(array) {
        return array.entities.urls.length === 1;
    }
    let newArray = tweets.filter(check);

    newArray.forEach((arg) => {
        newObject.push({
            text: `"${arg.user.name}": ${arg["full_text"].split("http")[0]}`,
            href: arg.entities.urls[0].url,
        });
        // console.log(arg.entities.urls);
    });
    return newObject;
};
