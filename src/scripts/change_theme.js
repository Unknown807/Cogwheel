
function setTheme(newTheme) {
    let oldToggle = $(`#${currentTheme}-mode-toggle`);
    let newToggle = $(`#${newTheme}-mode-toggle`);

    oldToggle.removeClass("theme-button-active");
    oldToggle.addClass("theme-button");
    
    newToggle.removeClass("theme-button");
    newToggle.addClass("theme-button-active");

    currentTheme = newTheme;
    document.documentElement.className = newTheme;
    console.log(document.documentElement.className);
}

$("#light-mode-toggle").on("click", () => {
    setTheme("light");
});

$("#dark-mode-toggle").on("click", () => {
    setTheme("dark");
});

$("#bliss-mode-toggle").on("click", () => {
    setTheme("bliss");
});

$("#mdn-like-mode-toggle").on("click", () => {
    setTheme("mdn-like");
});