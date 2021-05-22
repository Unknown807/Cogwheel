

window.api.receive("fileSaveFailure", () => {
    $("#filenameInput").addClass("is-invalid");
    $("#custom-modal-title")[0].innerHTML = "Error Saving File"
    $("#custom-modal-message")[0].innerHTML = "There was an error in saving the current file, make sure to only use letters and numbers.";
    $("#custom-modal").modal("show");
});

window.api.receive("fileSaveSuccess", () => {
    $("#filenameInput").removeClass("is-invalid");
});