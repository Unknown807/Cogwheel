let inputs = [
    "click", "hands", "point", "type",
    "write", "confirm", "think", "read",
    "forget", "remember", "store", "look",
    "hear", "say", "search", "response",
]

$(window).on("load", () => {
    window.api.send("requestSettings");
});

window.api.receive("receiveSettings", (arr) => {
    for (i=0; i<16; i++) {
        $(`#${inputs[i]}-input`).val(arr[i]);
    }
    // Set theme area as well
});

$("#back-button").on("click", () => {
    let settings = [];
    for (i=0; i<16; i++) {
        settings.push($(`#${inputs[i]}-input`).val());
    }
    // Add theme to settings list as well

    window.api.send("saveSettings", settings);
    window.location.href = "index.html";
});