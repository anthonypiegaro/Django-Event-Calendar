let username = document.getElementById("floatingInput");
let password = document.getElementById("floatingPassword");
let submitButton = document.getElementById("button");
let checkList = document.getElementById("checklist");

function login() {
    let data = {
        "username": username.value,
        "password": password.value,
    }
    fetch(`${window.origin}/login/`, {
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
                window.location.pathname = "/profile/";
            } else {
                checkList.textContent = data.message;
                checkList.classList.add("checklist");
            }
        })
    })
}

function attemptLogin() {
    submitButton.addEventListener("click", login);
}

attemptLogin();