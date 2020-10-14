const { increase } = require("./increase");

// takes two arguments: string that describes what the test is testing,
// callback function that contains our actual test unit
test('Passing NaN to increase returns "ERROR', () => {
    const result = increase(NaN); // Here we call the function like we normally would
    expect(result).toBe("Error");
});

test("Passing a number less then 0 returns 'Error'", () => {
    const result = increase(-1);
    expect(result).toBe("Error");
});
test("Passing a number larger then 0 returns that number multiplied by 10 until it is greater than a million", () => {
    const result = increase(200);
    // expect(result).toBe(2000000);
    expect(result).toBeGreaterThanOrEqual(1000000);
});
test("Passing a number larger then a million returns that number", () => {
    // const result = increase(1000001);
    // expect(result).toBe(2000000);
    expect(increase(1000001)).toBe(1000001);
});
test("Passing a string to increase returns 'ERROR'", () => {
    // const result = increase(1000001);
    // expect(result).toBe(2000000);
    expect(increase("blue")).toBe("Error");
});
