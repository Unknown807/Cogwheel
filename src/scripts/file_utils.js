
function saveCurrentFile() {
    let filename = $("#filenameInput").val();
    let data = codemirror_editor.getValue();
    window.api.send("saveCurrentFile", filename, data);
}

function createNewFile() {
    codemirror_editor.setValue("");
    codemirror_editor.clearHistory();
    $("#filenameInput").val("");
    window.api.send("resetCurrentFilePath");
}

function openFile() {
    $("#open-file-input").trigger("click");
}

$("#open-file-input").on("change", function() {
    let files = $("#open-file-input")[0].files;
    
    if (files.length > 0) {
        let file = files[0];
        window.api.send("openFile", file.path);
    }
})

window.api.receive("openFileSuccess", (filename, content) => {
    $("#filenameInput").val(filename);
    codemirror_editor.setValue(content);
});

window.api.receive("openFileFailure", () => {
    formatErrorModal(
        "Error Opening File",
        "There was an error in opening the selected file, it may be corrupt."
    );
});