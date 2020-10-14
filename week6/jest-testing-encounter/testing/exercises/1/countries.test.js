const { find } = require("./countries");

test("When find is passed an empty string, it returns an ampty array", () => {
    const result = find("");
    expect(result.length).toBe(0);
});

test("The array that it returns contains no more than four matches", () => {
    const result = find("U");
    expect(result.length).toBeLessThanOrEqual(4);
});

test("The search is case insensitive", () => {
    const result = find("UnIteD kIngDom");
    expect(result).toContain("United Kingdom");
});

test("If there are no matching countries, an empty array is returned", () => {
    const result = find("Berlin");
    expect(result.length).toBe(0);
});
