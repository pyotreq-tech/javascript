(function (countries) {
    var searchField = $("input");
    var resultsDiv = $(".results");
    var noHighlight = true;
    var i = 0;

    searchField.on("input", function () {
        var results = [];
        var htmlForCountries = "";
        resultsDiv.show();
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
                htmlForCountries += "<p class='country'>" + results[j] + "</p>";
            }
            resultsDiv.html(htmlForCountries);
        }
    });

    resultsDiv.on("mouseover", "p", function (e) {
        $(e.target).addClass("highlight");
        noHighlight = false;
        resultsDiv.on("mouseleave", "p", function (e) {
            $(e.target).removeClass("highlight");
            noHighlight = true;
        });
    });

    resultsDiv.on("mousedown", "p", function (e) {
        searchField.val($(e.target).text());
        resultsDiv.hide();
    });

    searchField.on("keydown", function (e) {
        if (e.keyCode === 40 && noHighlight) {
            console.log("down arrow");
            $("p").eq(i).addClass("highlight");
            noHighlight = false;
            i++;
        } else if (e.keyCode === 40) {
            console.log("next arrow down");
            $("p").eq(i).prev().removeClass("highlight");
            $("p").eq(i).addClass("highlight");
            i++;
            console.log(i);
        } else if (e.keyCode === 38 && noHighlight) {
            console.log("up arrow");
            $("p").last().addClass("highlight");
            noHighlight = false;
        } else if (e.keyCode === 13) {
            console.log(e);
        }
    });

    // blur event
    searchField.on("blur", function () {});

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

// // 1. input
// // take the input and compare it to a list of countries
// // and decide what to show - if there are 4 match etc.

// // 2. mouseover
// // think about adding a highlight to the country we are currently hovering over

// // 3. mousedown
// // take what the user clicked, and set the input field to be that IDBCursorWithValue

// // 4. keydown
// // this allows the user to scroll through the results
// // up an ddown arrow keys also the enter key add the value to the input field

// // 5. blur
// // hide the current list of the results

// // 6. focus - show the current list of results

// // We do not want to see first four countries when we delete back

// // Event delegation - how we can attach events to the items that are not on a page when page loads
