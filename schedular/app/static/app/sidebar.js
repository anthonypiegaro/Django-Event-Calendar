const button = document.querySelector("#btn");
const nav = document.querySelector("nav");
const main = document.querySelector("main");

function sidebarFunctionality() {
    button.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
            nav.classList.remove("active");
            main.classList.remove("active");
        } else {
            nav.classList.add("active");
            main.classList.add("active");
        }
    });
}

sidebarFunctionality();