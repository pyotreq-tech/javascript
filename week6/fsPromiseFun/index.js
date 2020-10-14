const { readdir, stat } = require("fs").promises;
const myPath = `${__dirname}/files`;

const logSizes = (path) => {
    return new Promise((resolve, reject) => {
        let promises = [];
        readdir(path, { withFileTypes: true }).then((data) => {
            data.forEach((arg) => {
                if (arg.isFile()) {
                    promises.push(
                        stat(`${path}/${arg.name}`).then((nextData) => {
                            console.log(`${path}/${arg.name}:`, nextData.size);
                        })
                    );
                } else {
                    promises.push(logSizes(`${path}/${arg.name}`));
                }
            });
            return Promise.all(promises).then(() => {
                resolve("done!");
            });
        });
    });
};

logSizes(myPath).then((endMsg) => {
    console.log(endMsg);
});
