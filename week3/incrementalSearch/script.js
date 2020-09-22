(function (countries) {
    var searchField = $("input");
    var resultsDiv = $(".results");
    var index = 0;
    var highlight = false;

    //Clean will delete highlight class everytime we selected something with mouse event and then fire key event or vice versa
    var clean = function () {
        for (var l = 0; l < $("p").length; l++) {
            $("p").eq(l).removeClass("highlight");
        }
    };

    searchField.on("input", function result() {
        var results = [];
        var htmlForCountries = "";
        index = 0;
        resultsDiv.show();
        highlight = false;
        for (var i = 0; i < countries.length; i++) {
            var userInput = searchField.val().toLowerCase();
            if (countries[i].toLowerCase().indexOf(userInput) === 0) {
                results.push(countries[i]);
            }

            if (results.length === 4) {
                break;
            }
        }

        if (results.length === 0) {
            htmlForCountries += "<p>No results</p>";
            resultsDiv.html(htmlForCountries);
        } else if (searchField.val() === "") {
            resultsDiv.html("");
        } else {
            for (var j = 0; j < results.length; j++) {
                htmlForCountries +=
                    "<p class='country' id='" + j + "'>" + results[j] + "</p>";
            }
            resultsDiv.html(htmlForCountries);
        }
        return results;
    });

    resultsDiv.on("mouseover", "p", function (e) {
        clean();
        $(e.target).addClass("highlight");
        highlight = true;
        index = e.target.id;
        console.log(index);
        resultsDiv.on("mouseleave", "p", function (e) {
            $(e.target).removeClass("highlight");
            index = 0;
            highlight = false;
        });
    });

    resultsDiv.on("mousedown", "p", function (e) {
        searchField.val($(e.target).text());
        resultsDiv.hide();
    });

    searchField.on("keydown", function (e) {
        for (var k = 0; k < $("p").length; k++) {
            if ($("p").eq(k).hasClass("highlight")) {
                highlight = true;
            }
        }
        if (e.keyCode === 13) {
            searchField.val($(".highlight").text());
            resultsDiv.hide();
        }

        clean();

        if (e.keyCode === 40 && !highlight) {
            $("p").eq(index).addClass("highlight");
            highlight = true;
        } else if (e.keyCode === 40) {
            index++;
            if (index === $("p").length) {
                $("p")
                    .eq($("p").length - 1)
                    .removeClass("highlight");
                index = 0;
            }
            $("p").eq(index).prev().removeClass("highlight");
            $("p").eq(index).addClass("highlight");
        }

        if (e.keyCode === 38 && !highlight) {
            $("p")
                .eq($("p").length - 1)
                .addClass("highlight");
            highlight = true;
            index = $("p").length - 1;
        } else if (e.keyCode === 38) {
            index--;
            if (index === -1) {
                $("p").eq(0).removeClass("highlight");
                index = $("p").length - 1;
            }
            $("p").eq(index).next().removeClass("highlight");
            $("p").eq(index).addClass("highlight");
        }
    });

    searchField.on("focus", function () {
        resultsDiv.show();
    });

    searchField.on("blur", function () {
        resultsDiv.hide();
    });

    //event listener delegation
    // $(".container").on("click", ".country", function () {});
    //thin about event objects, information about event that fired
    //e.target
    //e.currentTarget
    //value of p tag and assign it to index of input field, then disappears
    //next() check which has class highlited, if no I want to add it to first element, remove and pass is to next one
    //prev()
    //after click, hide list and change placeholder, but also when click back it appears again
})([
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Côte D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People’s Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
]);
