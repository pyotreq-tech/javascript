translateNumberToGerman();

function translateNumberToGerman() {
    try {
        var numShown = askForNumber();

        if (numShown == 1) {
            console.log("eins");
        } else if (numShown == 2) {
            console.log("zwei");
        } else if (numShown == 3) {
            console.log("drei");
        } else if (numShown == 4) {
            console.log("vier");
        } else if (numShown == 5) {
            console.log("funf");
        } else if (numShown == 6) {
            console.log("sehts");
        } else if (numShown == 7) {
            console.log("sieben");
        } else if (numShown == 8) {
            console.log("acht");
        } else if (numShown == 9) {
            console.log("neun");
        } else console.log("zehn");
    } catch (e) {
        console.log(e);
        translateNumberToGerman();
    }
}

function askForNumber() {
    var num = prompt("Please enter a number between 1 and 10");
    if (num >= 1 && num <= 10 && num == parseInt(num)) {
        return num;
    }
    throw new Error("Bad number");
}
