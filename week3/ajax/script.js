// request();
// function request() {
//     $.ajax({
//         url: "https://pokeapi.co/api/v2/pokemon/charmander",
//         success: function (data) {
//             console.log(data);
//         },
//     });
// }

request();
function request() {
    $.ajax({
        url: "/data.json",
        success: function (response) {
            var myHtml = "";
            var div = $("div");
            for (var i = 0; i < response.length; i++) {
                myHtml += "<p>" + response[i].animal + "</p>";
            }
            div.html(myHtml);
        },
    });
}
