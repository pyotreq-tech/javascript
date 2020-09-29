Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll(
    'script[type="text/x-handlebars-template"]'
);

Array.prototype.slice.call(templates).forEach(function (script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

// var pokemonObj = {
//     name: "bulbasaur",
//     image:
//         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
//     abilities: ["chlorophyll", "overgrow"],
//     weight: 69,
//     types: ["poison", "grass"],
// };

var pokemonData = {
    pokemon: [
        {
            name: "bulbasaur",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            abilities: ["chlorophyll", "overgrow"],
            weight: 69,
            types: ["poison", "grass"],
        },
        {
            name: "caterpie",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
            abilities: ["run-away", "shield-dust"],
            weight: 29,
            types: ["bug"],
        },
        {
            name: "metapod",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
            abilities: ["shed-skin"],
            weight: 99,
            types: ["bug"],
        },
        {
            name: "venusaur",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            abilities: ["chlorophyll", "overgrow"],
            weight: 1000,
            types: ["poison", "grass"],
        },
        {
            name: "charmeleon",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
            abilities: ["solar-power", "blaze"],
            weight: 190,
            types: ["fire"],
        },
        {
            name: "wartortle",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
            abilities: ["rain-dish", "torrent"],
            weight: 225,
            types: ["water"],
        },
        {
            name: "ivysaur",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            abilities: ["chlorophyll", "overgrow"],
            weight: 130,
            types: ["poison", "grass"],
        },
        {
            name: "butterfree",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
            abilities: ["tinted-lens", "compound-eyes"],
            weight: 320,
            types: ["flying", "bug"],
        },
        {
            name: "blastoise",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
            abilities: ["rain-dish", "torrent"],
            weight: 855,
            types: ["water"],
        },
        {
            name: "squirtle",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            abilities: ["rain-dish", "torrent"],
            weight: 90,
            types: ["water"],
        },
        {
            name: "charmander",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            abilities: ["solar-power", "blaze"],
            weight: 85,
            types: ["fire"],
        },
        {
            name: "charizard",
            image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
            abilities: ["solar-power", "blaze"],
            weight: 905,
            types: ["flying", "fire"],
        },
    ],
};

var myCompiledTemplate = Handlebars.templates.pokemon(pokemonData);

$(".container").html(myCompiledTemplate);
