const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let conversation = {
    q: "Welcome to The Land Of Wizards! Would you like to play?",
    answers: {
        yes: {
            q:
                "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
            answers: {
                left: {
                    q:
                        "There's a scary wizard! He asks you a tough question. What's 1+1?",
                    answers: {
                        2: "congratulations!",
                    },
                },
                right: "This was not the right choice. Goodbye!",
            },
        },
        no: "Alright then. Enjoy your day!",
    },
};

function askQuestion(convoObj, color) {
    rl.question(chalk.keyword(color)(convoObj.q), (answer) => {
        answer = answer.toLowerCase();

        if (convoObj.answers[answer]) {
            if (typeof convoObj.answers[answer] === "object") {
                askQuestion(convoObj.answers[answer], color);
            } else {
                console.log(convoObj.answers[answer]);
                rl.close();
            }
        } else {
            console.log("wrong answer");
            askQuestion(convoObj);
        }
    });
}

askQuestion(conversation, "green");
