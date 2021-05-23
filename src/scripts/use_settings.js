let taskTimes = [];

$(window).on("load", () => {
    window.api.send("requestSettings");
});

window.api.receive("receiveSettings", (arr) => {
    taskTimes = arr.slice(0, 16);
});