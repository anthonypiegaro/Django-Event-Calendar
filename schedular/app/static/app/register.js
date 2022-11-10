let username = document.getElementById("floatingInput");
let password = document.getElementById("floatingPassword");
let passwordTwo = document.getElementById("floatingPasswordTwo");
const submitButton = document.getElementById("button");
let usernameLengthNote = document.getElementById("username-length-note");
let usernameUniqueNote = document.getElementById("username-unique-note");
let passwordLengthNote = document.getElementById("password-length-note");
let passwordSameNote = document.getElementById("password-same-note");
let userValid = false;
let passValid = false;
let confValid = false;

function check_username() {
    let data = {
        "username": username.value
    }
    fetch(`${window.origin}/register/check-username/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(res => {
        res.json().then(data => {
            if (data.valid == true) {
                userValid = true;
                username.classList.remove("is-invalid");
            } else {
                userValid = false;
                username.classList.add("is-invalid");
            }
            if (data.uniqueValid == false) {
                usernameUniqueNote.textContent = data.unique;
            } else {
                usernameUniqueNote.textContent = "";
            }
            if (data.lengthValid == false) {
                usernameLengthNote.textContent = data.length;
            } else {
                usernameLengthNote.textContent = "";
            }
            check_all_valid();
        })
    })
}

function check_password() {
    let data = {
        "password": password.value
    }
    fetch(`${window.origin}/register/check-password/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(res => {
        res.json().then(data => {
            if (data.valid == true) {
                passValid = true;
                password.classList.remove("is-invalid");
            } else {
                passValid = false;
                password.classList.add("is-invalid");
            }
            if (data.lengthValid == false) {
                passwordLengthNote.textContent = data.length;
            } else {
                passwordLengthNote.textContent = "";
            }
            check_all_valid();
        })
    })
}

function check_password_confirmation() {
    let data = {
        "password": password.value,
        "passwordTwo": passwordTwo.value
    }
    fetch(`${window.origin}/register/check-password-confirmation/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(res => {
        res.json().then(data => {
            if (data.valid == true) {
                confValid = true;
                passwordTwo.classList.remove("is-invalid");
                passwordSameNote.textContent = "";
            } else {
                confValid = false;
                passwordTwo.classList.add("is-invalid");
                passwordSameNote.textContent = data.message;
            }
            check_all_valid();
        })
    })
}

function disable_submit() {
    submitButton.disabled = true;
}

function allow_submit() {
    submitButton.disabled = false;
}

function check_all_valid() {
    if (userValid && passValid && confValid) {
        allow_submit()
    } else {
        disable_submit()
    }
}

function register() {
    let data = {
        "username": username.value,
        "password": password.value,
    }
    fetch(`${window.origin}/register/register-user`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(() => {
        window.location.pathname = "/profile/";
    })
}

function confirmationFunctionality() {
    username.addEventListener("focusout", check_username);
    password.addEventListener("focusout", check_password);
    passwordTwo.addEventListener("focusout", check_password_confirmation);
    submitButton.addEventListener("mousedown", register);
}

confirmationFunctionality();