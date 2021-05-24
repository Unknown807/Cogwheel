
$("#back-button").on("click", () => {
    let settings = [];
    for (i=0; i<16; i++) {
        settings.push($(`#${inputs[i]}-input`).val());
    }
    settings.push(currentTheme);
    // Add theme to settings list as well

    window.api.send("saveSettings", settings);
    window.location.href = "index.html";
});