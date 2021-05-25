
function getSettings() {
    let settings = [];
    for (i=0; i<16; i++) {
        settings.push($(`#${inputs[i]}-input`).val());
    }
    settings.push(currentTheme);

    return settings
}

$("#back-button").on("click", () => {
    let settings = getSettings();
    window.api.send("saveSettings", settings);
    window.location.href = "index.html";
});

$("#save-button").on("click", () => {
    let settings = getSettings();
    window.api.send("saveSettings", settings);
    $("#save-button").attr('style', 'color: green !important');
    setTimeout(() => {
        $("#save-button").attr("style", "");
    }, 250);
});