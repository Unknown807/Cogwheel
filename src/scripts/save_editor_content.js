

function saveEditorContent() {
    let content = codemirror_editor.getValue();
    window.api.send("saveEditorContent", content);
}

$("#settings-button").on("click", () => {
    saveEditorContent();
    window.location.href = "settings.html";
});

$("#help-button").on("click", () => {
    saveEditorContent();
    window.location.href = "help.html";
});