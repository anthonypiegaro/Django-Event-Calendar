const expandTemplateButton = document.querySelector(".accordian-logo");
const templateContainer = document.querySelector(".event-container")
const blockBackgroundDiv = document.querySelector(".block-background");
const addTemplateButton = document.getElementById("add-event-template");
const formContainer = document.querySelector(".form-container");
const exitButton = document.querySelector(".exit");
const form = document.querySelector(".form-container form");
const formHeader = document.querySelector(".form-header");
let deleteTemplateButtons;

let date = new Date();

function renderCalendar() {
    // Setting date to first day of month
    date.setDate(1)

    // Getting the last day of the month
    const monthDays = document.querySelector(".days");

    // Getting the last day of the month
    const lastDay = new Date(date.getFullYear(),
    date.getMonth() + 1, 0).getDate();

    // Getting the last day of the previous month
    const prevLastDay = new Date(date.getDate(),
    date.getMonth(), 0).getDate();

    // Getting the index of the last day
    const firstDayIndex = date.getDay();

    // Getting the index of teh last day
    const lastDayIndex = new Date(date.getFullYear(),
    date.getMonth() + 1, 0).getDay();

    // Getting the number of days in the next month
    // that will appear on the end of the calendar
    const nextDays = 6 - lastDayIndex;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // Getting current month and year
    // and adding these to the calendar
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString();
    document.querySelector(".date").innerHTML = month + ", " + year;

    let days = "";

    // Adding the prev month days to the calendar
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        days += `<div class="prev-date"><div>${prevLastDay - 1}</div></div>`;
    }

    // Adding the current month days to the calendar
    for (let i = 1; i <= lastDay; i++) {
        days += `<div class="drop-container" id="day-${i}"><div>${i}</div></div>`;
    }

    // Adding the next month days to the calendar
    for (let i = 1; i <= nextDays; i++) {
        days += `<div class="next-date"><div>${i}</div></div>`;
    }

    // Adding the days to the html
    monthDays.innerHTML = days;

    draggingFunctionality();
    loadDataToCalendar(date.getMonth() + 1);
    // deleteEventFunctionality();
}

function nextMonth(date) {
    document.querySelector(".next").
    addEventListener("click", () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });
}

function prevMonth(date) {
    document.querySelector(".prev").
    addEventListener("click", () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });
}

function templateAccordianFunctionality() {
    expandTemplateButton.addEventListener("click", () => {
        templateContainer.classList.toggle("expanded");
     });
}

function startForm() {
    blockBackground();
    getForm();
}

function endForm() {
    unblockBackground();
    putAwayForm();
    clearForm();
}

function clearForm() {
    formHeader.textContent = "";
    form.innerHTML = "";
    form.removeAttribute("action");
}

function exitFormFunctionality() {
    exitButton.addEventListener("click", endForm);
}

function getForm() {
    formContainer.classList.add("active");
}

function putAwayForm() {
    formContainer.classList.remove("active");
}

function blockBackground() {
    blockBackgroundDiv.classList.add("active");
}

function unblockBackground() {
    blockBackgroundDiv.classList.remove("active");
}

function addTemplateButtonFunctionality() {
    addTemplateButton.addEventListener("click", createTemplateForm);
}

function createTemplateForm() {
    populateTemplateForm();
    startForm();
}

function populateTemplateForm() {
    form.setAttribute("action", "/create-template/");
    formHeader.textContent = "Create Template";
    let workoutNameContainer = document.createElement("div");
    workoutNameContainer.classList.add("form-floating");
    workoutNameContainer.classList.add("mb-3");
    let workoutNameInput = document.createElement("input");
    workoutNameInput.setAttribute("type", "text");
    workoutNameInput.setAttribute("id", "floatingInput");
    workoutNameInput.setAttribute("name", "name");
    workoutNameInput.setAttribute("placeholder", "workoutname");
    workoutNameInput.classList.add("form-control")
    let workoutNameLabel = document.createElement("label");
    workoutNameLabel.setAttribute("for", "floatingInput");
    workoutNameLabel.textContent = "Event Name";
    workoutNameContainer.appendChild(workoutNameInput);
    workoutNameContainer.appendChild(workoutNameLabel);
    form.append(workoutNameContainer);
    let workoutNotesContainer = document.createElement("div");
    workoutNotesContainer.classList.add("form-floating");
    workoutNotesContainer.classList.add("mb-3");
    let workoutNotesInput = document.createElement("textarea");
    workoutNotesInput.setAttribute("id", "floatingTextArea");
    workoutNotesInput.setAttribute("name", "notes");
    workoutNotesInput.setAttribute("placeholder", "Notes");
    workoutNotesInput.classList.add("form-control")
    let workoutNotesLabel = document.createElement("label");
    workoutNotesLabel.setAttribute("for", "floatingTextArea");
    workoutNotesLabel.textContent = "Event Notes";
    workoutNotesContainer.appendChild(workoutNotesInput);
    workoutNotesContainer.appendChild(workoutNotesLabel);
    form.append(workoutNotesContainer);
    let submitButtonContainer = document.createElement("div");
    submitButtonContainer.classList.add("d-grid");
    submitButtonContainer.classList.add("gap-2");
    submitButtonContainer.classList.add("col-6");
    submitButtonContainer.classList.add("mx-auto");
    submitButtonContainer.classList.add("mb-3");
    let submitButton = document.createElement("button");
    submitButton.classList.add("btn");
    submitButton.classList.add("btn-primary");
    submitButton.setAttribute("id", "button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Save Template";
    submitButtonContainer.appendChild(submitButton);
    form.appendChild(submitButtonContainer);
}

function deleteTemplateFunctionality() {
    deleteTemplateButtons = document.querySelectorAll(".bx-trash");
    deleteTemplateButtons.forEach(button => {
        button.addEventListener("click", deleteTemplate);
    });
}

function deleteTemplate(event) {
    let template = event.target.parentElement
    let templateId = template.id
    let data = {
        "templateId": templateId
    }
    fetch(`${window.origin}/delete-template/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(() => {
        window.location.reload();
    })
}

function dragstart_handler(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.effectAllowed = "copyMove";
}

function dragover_handler(event) {
    event.preventDefault();
}

function drop_handler(event) {
    event.preventDefault();
    let id = event.dataTransfer.getData("text");
    let nodeCopy = document.getElementById(id).cloneNode(true);
    nodeCopy.classList.remove("eventTemplate");
    nodeCopy.classList.add("event");

    // Ensuring element is dropped in the div.drop-container
    let parent = event.target;
    while (!parent.classList.contains("drop-container")) {
        parent = parent.parentElement;
    }
    if (nodeCopy.id !== "wellness-questionaire") {
        let deleteButton = nodeCopy.querySelector(".bx-trash");
        nodeCopy.removeChild(deleteButton);
    }

    nodeCopy.removeAttribute("draggable");
    parent.appendChild(nodeCopy)

    let workoutYear = date.getFullYear();
    let workoutMonth = date.getMonth() + 1;
    let workoutDay = parent.id.split("-")[1];
    let workoutDate = `${workoutYear}-${workoutMonth}-${workoutDay}`;

    if (nodeCopy.id !== "wellness-questionaire") {
        let data = {
            "templateId": id,
            "date": workoutDate,
        };
        sendTemplateData("workout", data);
    } else {
        let data = {
            "date": workoutDate,
        };
        sendTemplateData("wellness-questionaire", data);
    }
}

function sendTemplateData(templateType, data) {
    fetch(`${window.origin}/create-${templateType}/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(res => {
        res.json().then(resData => {
            console.log(resData.message);
        })
    })
}

function draggingFunctionality() {
    document.querySelectorAll(".eventTemplate").forEach(template => {
        template.addEventListener("dragstart", dragstart_handler);
    });
    document.querySelectorAll(".drop-container").forEach(date => {
        date.addEventListener("drop", drop_handler);
        date.addEventListener("dragover", dragover_handler);
    });
}

function loadDataToCalendar(month) {
    fetch(`${window.origin}/get-workouts/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({"month": month}),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(res => {
        res.json().then(data => {
            events = data.events;
            events.forEach(event => {
                let eventDay = parseInt(event.date.split("-")[2]);
                let eventId = `event-id-${event.id}`;
                let dateId = `#day-${eventDay}`;
                let theDay = document.querySelector(dateId);
                let theEvent = document.createElement("div");
                theEvent.textContent = event.name;
                theEvent.setAttribute("id", eventId);
                theEvent.setAttribute("class", "event");
                theDay.appendChild(theEvent);
            });
        })
        .then(() => {
            deleteEventFunctionality();
        })
    })
}

function deleteEventFunctionality() {
    document.querySelectorAll(".event").forEach(event => {
        event.addEventListener("dblclick", deleteEvent);
    });
    document.querySelectorAll(".wellness-questionaire").forEach(event => {
        event.addEventListener("dblclick", deleteEvent);
    });
}

function deleteEvent(event) {
    let eventId = parseInt(event.target.id.split("-")[2]);
    let type = event.target.id.split("-")[0]
    let data = {
        "type": type,
        "eventId": eventId,
    }
    fetch(`${window.origin}/delete-event/`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(res => {
        res.json().then(data => {
            console.log(data.message);
            window.location.reload();
        })
    })
}

function startApp() {
    renderCalendar();
    nextMonth(date);
    prevMonth(date);
    templateAccordianFunctionality();
    addTemplateButtonFunctionality();
    deleteTemplateFunctionality();
    exitFormFunctionality();
}

startApp();