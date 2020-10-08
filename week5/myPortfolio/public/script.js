const img = $("img");

img.on("mouseover", (e) => {
    const result = $(e.target).attr("src");
    console.log("result: ", result);
    const animation = result.substring(0, result.length - 15);
    console.log("animation: ", animation);
    $(e.target).attr("src", `${animation}/animation.gif`);
    img.on("mouseleave", () => {
        $(e.target).attr("src", `${animation}/screenshot.jpg`);
    });
});
