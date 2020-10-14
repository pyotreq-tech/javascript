// test of promisified function

const { dbl } = require("./dbl");

test("Double returns argument times 2 if pased a number", () => {
    // Very important to use return
    return dbl(2).then((resolvedVal) => {
        expect(resolvedVal).toBe(4);
    });
});
test("dbl rejects promise if NaN is passed", () => {
    // Very important to use return
    return dbl("cupcake").catch((err) => {
        expect(err).toBe("bad number cannot double");
    });
});
