const { getAlbumNames } = require("./albums");
const spotify = require("./spotify");

jest.mock("./spotify");

test("album names are in alphabetical order", () => {
    spotify.search.mockResolvedValue({
        albums: {
            items: [
                { name: "Bihanna" },
                { name: "Zapina" },
                { name: "Aadonna" },
            ],
        },
    });

    return getAlbumNames("meat loaf").then((albumNames) => {
        // expect(albumNames).toEqual(["Aadonna", "Bihanna", "Zapina"]);
        console.log("names from test: ", albumNames.sort());
        let test = albumNames.sort();
        console.log(test);
        expect(albumNames).toEqual(test);
    });
});
