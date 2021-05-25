let inputs = [
    "click", "hands", "point", "type",
    "write", "confirm", "think", "read",
    "forget", "remember", "store", "look",
    "hear", "say", "search", "response",
]

let currentTheme = "light";

$(window).on("load", () => {
    window.api.send("requestSettings");
});

window.api.receive("receiveSettings", (arr) => {
    for (i=0; i<16; i++) {
        $(`#${inputs[i]}-input`).val(arr[i]);
    }
    setTheme(arr[16]);
});