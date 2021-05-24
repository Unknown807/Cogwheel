let currentTheme = "light";

/* For other themes
$("#").on("click", () => {
    
});
*/

function setTheme(newTheme) {
    let oldToggle = $(`#${currentTheme}-mode-toggle`);
    let newToggle = $(`#${newTheme}-mode-toggle`);

    oldToggle.removeClass("btn-primary");
    oldToggle.addClass("btn-outline-primary");
    
    newToggle.removeClass("btn-outline-primary");
    newToggle.addClass("btn-primary");

    currentTheme = newTheme;
    document.documentElement.className = newTheme;
}

$("#light-mode-toggle").on("click", () => {
    setTheme("light");
});

$("#dark-mode-toggle").on("click", () => {
    setTheme("dark");
});