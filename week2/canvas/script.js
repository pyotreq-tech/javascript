(function () {
    //1) grab the canvas and render the content
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //2) begin our path
    ctx.beginPath();

    //3) optionally I can set colors and thickness of my line
    ctx.strokeStyle = "teal";
    ctx.lineWidth = 5;

    //4) move the robot with the pen but don't draw the line
    ctx.moveTo(100, 100);

    //5) mapping out our drawing points or the shape that we want
    ctx.lineTo(500, 100);
    ctx.lineTo(300, 400);
    ctx.lineTo(100, 100);
    ctx.closePath(); //this makes for the triangle to have a pointy edge

    //6) tell the robot to draw our line

    ctx.stroke();

    //7) optionally color in my shape
    ctx.fillStyle = "darkkhaki";
    ctx.fill();

    /////////drawing a circle
    ctx.strokeStyle = "limegreen";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(500, 500, 50, 0, 2 * Math.PI);

    //arc(x, y, radius, startingAngle, endAngle)
    ctx.stroke();

    ctx.fillStyle = "goldenrod";
    ctx.fill();

    //Bonus exercise
    // method - draw image; one canvas with sick figure, another draw what another shows.
    // canvas with stickman small, inside there is big canvas
})();
