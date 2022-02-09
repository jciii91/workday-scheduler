// variables and HTML element for date display
let todaysDate = moment();
let dateOnly = todaysDate.format("dddd, MMMM Do YYYY");
let timeOnly = todaysDate.format("HH");
currentDateEl = document.getElementById("currentDay");

// object for localStorage
let myEvents = {
    "9AM" : "",
    "10AM" : "",
    "11AM" : "",
    "12PM" : "",
    "1PM" : "",
    "2PM" : "",
    "3PM" : "",
    "4PM" : "",
    "5PM" : ""
};

// Checks every 10 minutes which hour it is currently
setInterval(function() {
    todaysDate = moment();
    dateOnly = todaysDate.format("dddd, MMMM Do YYYY");
    timeOnly = todaysDate.format("HH");
    checkHour();
},600000);

// function to update row colors
function checkHour() {
    // find all description divs
    allDescriptions = $(".container").find(".description");
    hoursArray = [9,10,11,12,13,14,15,16,17];
    // compare hour the description corresponds to with what hour it is currently
    for (let i = 0; i<allDescriptions.length; i++) {
        if (timeOnly-hoursArray[i] > 0) {
            allDescriptions[i].className = "description past col-10 py-2 d-flex justify-content-start";
        } else if (timeOnly-hoursArray[i] == 0) {
            allDescriptions[i].className = "description present col-10 py-2 d-flex justify-content-start";
        } else if (timeOnly-hoursArray[i] < 0) {
            allDescriptions[i].className = "description future col-10 py-2 d-flex justify-content-start";
        }
    }
}

//loads saved schedule on page load
function loadSchedule() {
    if (JSON.parse(localStorage.getItem("workDaySchedule")) == null) {
        return;
    }
    // parse stored schedule
    myEvents = JSON.parse(localStorage.getItem("workDaySchedule"));
    // find all description divs
    allDescriptions = $(".container").find(".description");
    // iterate over each row and fill in saved events
    for (let i = 0; i<allDescriptions.length; i++) {
        allDescriptions[i].childNodes[0].innerText = myEvents[allDescriptions[i].id.toUpperCase()];
    }
}

// listener for entering events into description
$(".container").on("click",".description",function(){
    timeDiv = this;
    timeDivChild = this.childNodes[0];
    if (timeDivChild.tagName != "P") {
        return;
    }

    innerText = "";

    // check for pre-existing text
    if (timeDivChild.innerHTML != "") {
        innerText = timeDivChild.innerHTML;
    }

    // remove existing p element and replace with textarea
    timeDiv.removeChild(timeDivChild);
    descriptionInput = document.createElement("textarea");
    descriptionInput.innerHTML = innerText;
    timeDiv.appendChild(descriptionInput);
    descriptionInput.focus();
})

// when textarea loses focus switch it back to a p element
$(".container").on("blur","textarea",function(){
    timeDiv = this.parentElement;
    descriptionText = this.value.trim();

    timeDiv.removeChild(this);
    descriptionPara = document.createElement("p");
    descriptionPara.innerHTML = descriptionText;
    descriptionPara.className = "text-dark";
    timeDiv.appendChild(descriptionPara);
})

// when the save button for a row is click then save the text shown to localStorage
$(".container").on("click",".saveBtn",function(){
    parentDiv = this.parentElement;
    timeString = parentDiv.childNodes[1].innerText;
    myEvents[timeString] = parentDiv.childNodes[3].innerText;
    localStorage.setItem("workDaySchedule",JSON.stringify(myEvents));
})

// load date, update row colors, load pre-existing schedule
currentDateEl.textContent = dateOnly;
checkHour();
loadSchedule();