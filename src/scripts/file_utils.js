
function saveCurrentFile() {
    let filename = $("#filename-input").val();
    let data = codemirror_editor.getValue();
    window.api.send("saveCurrentFile", filename, data);
    $("#save-file-button").css("color", "green");
    setTimeout(() => {
        $("#save-file-button").css("color", "");
    }, 250);
}

function createNewFile() {
    codemirror_editor.setValue("");
    codemirror_editor.clearHistory();
    $("#filename-input").val("");
    window.api.send("resetCurrentFilePath");
}

function openFile() {
    $("#open-file-input").trigger("click");
}

$("#open-file-input").on("change", () => {
    let files = $("#open-file-input")[0].files;
        
    if (files.length > 0) {
        let file = files[0];
        window.api.send("openFile", file.path);
    }

    $("#open-file-input").val("");
});

window.api.receive("openFileSuccess", (filename, content) => {
    $("#filename-input").val(filename);
    codemirror_editor.setValue(content);
});

window.api.receive("openFileFailure", () => {
    formatErrorModal(
        "Error Opening File",
        "There was an error in opening the selected file, it may be corrupt."
    );
});