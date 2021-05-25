
$("#back-button").on("click", () => {
    let settings = [];
    for (i=0; i<16; i++) {
        settings.push($(`#${inputs[i]}-input`).val());
    }
    settings.push(currentTheme);

    window.api.send("saveSettings", settings);
    window.location.href = "index.html";
});