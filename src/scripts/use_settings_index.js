let taskTimes = [];

$(window).on("load", () => {
    window.api.send("requestSettings");
});

window.api.receive("receiveSettings", (arr) => {
    taskTimes = arr.slice(0, 16);
    document.documentElement.className = arr[16];
    codemirror_editor.setOption("theme", arr[16]);
    codemirror_editor.setValue(arr[17]);
    $("#filename-input").val(arr[18]);
});