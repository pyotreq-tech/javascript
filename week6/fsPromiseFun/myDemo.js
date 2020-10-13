// Checking loops with promises here

const { readdir, stat } = require("fs").promises;
const arr = [1, 2, 3];
const myPath = `${__dirname}/files`;

const func = () => {
    return new Promise((resolve, reject) => {
        let promises = [];
        console.log("Beginning");
        for (let i = 0; i < arr.length; i++) {
            if (i === 0) {
                promises.push(
                    readdir(myPath, { withFileTypes: true }).then((data) => {
                        console.log(i);
                    })
                );
            } else {
                promises.push(
                    readdir(myPath, { withFileTypes: true }).then((data) => {
                        console.log(i);
                    })
                );
            }
        }
        Promise.all(promises).then(() => {
            console.log("The End");
            resolve("Final End");
        });
    });
};

func().then((msg) => {
    console.log(msg);
});
