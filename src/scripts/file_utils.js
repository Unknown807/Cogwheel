
function saveCurrentFile() {
    let filename = $("#filenameInput").val();
    let data = codemirror_editor.getValue();
    window.api.send("saveCurrentFile", filename, data);
}

function createNewFile() {
    
}

function openFile() {

}