
function formatErrorModal(title, msg) {
    $("#custom-modal-title")[0].innerHTML = title;
    $("#custom-modal-message")[0].innerHTML = msg;
    $("#custom-modal").modal("show");
}

window.api.receive("fileSaveFailure", () => {
    $("#filenameInput").addClass("is-invalid");
    formatErrorModal(
        "Error Saving File",
        "There was an error in saving the current file, make sure to only use letters and numbers."
    );
});

window.api.receive("fileSaveSuccess", () => {
    $("#filenameInput").removeClass("is-invalid");
});