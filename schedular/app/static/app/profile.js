const editButton = document.querySelector(".edit-btn");
const exitButton = document.querySelector(".exit");
const blockBackground = document.querySelector(".block-background");
const editProfileContainer = document.querySelector(".edit-profile-container");

function enableEdit() {
    blockBackground.classList.add("active");
    editProfileContainer.classList.add("active");
}

function disableEdit() {
    blockBackground.classList.remove("active");
    editProfileContainer.classList.remove("active");
}

function editFunctionality() {
    editButton.addEventListener("click", enableEdit);
    exitButton.addEventListener("click", disableEdit);
}

editFunctionality();