
$(window).on("load", () => {
    window.api.send("requestSettings");
});

window.api.receive("receiveSettings", (arr) => {
    document.documentElement.className = arr[16];
});