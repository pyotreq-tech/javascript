const headlines = require("./headlines");
const twApi = require("./twApi");

jest.mock("./twApi");
// this basically says, hey jest, go checkhout what the twApi export object looks like
// make a copy of that, but don't give it any of the actual functionality, so make a dummy
// mocked version of the real thing

test("headlines filters out tweets that do not have exactly one link", () => {
    twApi.getTweets.mockResolvedValue([
        {
            entities: {
                urls: [{ url: "dummy-value.com" }],
            },
            full_text: "I will make it to the end",
        },
        {
            entities: {
                urls: [],
            },
            full_text: "I will not make it out after headlines",
        },
        {
            entities: {
                urls: [{ url: "dummy-value.com" }, { url: "duck-duck.com" }],
            },
            full_text: "I also will not make it",
        },
    ]);
    return headlines().then((tweets) => {
        expect(tweets.length).toBe(1);
        expect(tweets[0]).toEqual({
            text: "I will make it to the end",
            href: "dummy-value.com",
        });
    });
});
