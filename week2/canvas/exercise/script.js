small();
big();

function small() {
    var canvas = document.getElementById("small");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = "darkgrey";
    ctx.lineWidth = 5;

    //head
    ctx.arc(250, 150, 50, 0, 2 * Math.PI);

    //body
    ctx.moveTo(250, 200);
    ctx.lineTo(250, 400);

    //legs
    ctx.moveTo(250, 400);
    ctx.lineTo(150, 480);

    ctx.moveTo(250, 400);
    ctx.lineTo(350, 480);

    //hands
    ctx.moveTo(250, 300);
    ctx.lineTo(150, 200);

    ctx.moveTo(250, 300);
    ctx.lineTo(350, 200);

    //draw
    ctx.stroke();
}

function big() {
    var canvas = document.getElementById("big");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("small");
    var alert = document.getElementsByClassName("alert")[0];
    var x = 0;
    var y = 0;
    var speed = 20;
    var clear = function () {
        ctx.clearRect(0, 0, 1200, 600);
        alert.classList.remove("visible");
    };
    document.addEventListener("keydown", function (e) {
        clear();
        if (e.keyCode === 38) {
            clear();
            ctx.drawImage(img, x, y);
            y -= speed;
        } else if (e.keyCode === 40) {
            clear();
            ctx.drawImage(img, x, y);
            y += speed;
        } else if (e.keyCode === 37) {
            clear();
            ctx.drawImage(img, x, y);
            x -= speed;
        } else if (e.keyCode === 39) {
            clear();
            ctx.drawImage(img, x, y);
            x += speed;
        } else {
            alert.classList.add("visible");
        }
    });
}
