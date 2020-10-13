module.exports.double = function (n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isNaN(n)) {
                // throw new Error("not a number");
                reject(new Error("not a number"));
            } else {
                // return n*2;
                resolve(n * 2);
            }
        }, 2000);
    });
};
// #1 - wrap your function in a "Promise Constructor"
// #2 - resolve value you want
// #3 - reject values you dont want (ex. err msgs)
