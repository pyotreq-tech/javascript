module.exports = function fn(arg) {
    if (typeof arg === "string") {
        return [...arg].reverse().join("");
    } else if (typeof arg !== "string" && Array.isArray(arg) === false) {
        return null;
    } else if (Array.isArray(arg)) {
        let newArr = [];
        arg.forEach((a) => {
            newArr.push(fn(a));
        });
        return newArr;
    }
};
