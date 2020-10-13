function first() {
    setTimeout(function () {
        console.log(1);
    }, 2000);
}

module.exports.promisifiedFirst = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
};
