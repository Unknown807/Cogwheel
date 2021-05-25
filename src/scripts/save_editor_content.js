

function saveEditorContent() {
    let content = codemirror_editor.getValue();
    let title = $("#filename-input").val();
    window.api.send("saveEditorContent", content, title);
}

$("#settings-button").on("click", () => {
    saveEditorContent();
    window.location.href = "settings.html";
});

$("#help-button").on("click", () => {
    saveEditorContent();
    window.location.href = "help.html";
});