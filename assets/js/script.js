let todaysDate = moment();
let dateOnly = todaysDate.format("dddd, MMMM Do YYYY");
let timeOnly = todaysDate.format("HH");
currentDateEl = document.getElementById("currentDay");

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

setInterval(function() {
    todaysDate = moment();
    dateOnly = todaysDate.format("dddd, MMMM Do YYYY");
    timeOnly = todaysDate.format("HH");
    checkHour();
},600000);

function checkHour() {
    allDescriptions = $(".container").find(".description");
    hoursArray = [9,10,11,12,13,14,15,16,17];
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

function loadSchedule() {
    myEvents = JSON.parse(localStorage.getItem("workDaySchedule"));
    allDescriptions = $(".container").find(".description");
    for (let i = 0; i<allDescriptions.length; i++) {
        console.log(allDescriptions[i].childNodes[0].innerText);
        console.log(myEvents[allDescriptions[i].id.toUpperCase()]);
        allDescriptions[i].childNodes[0].innerText = myEvents[allDescriptions[i].id.toUpperCase()];
    }
}

$(".container").on("click",".description",function(){
    timeDiv = this;
    timeDivChild = this.childNodes[0];
    if (timeDivChild.tagName != "P") {
        return;
    }

    innerText = "";

    if (timeDivChild.innerHTML != "") {
        innerText = timeDivChild.innerHTML;
    }

    timeDiv.removeChild(timeDivChild);
    descriptionInput = document.createElement("textarea");
    descriptionInput.innerHTML = innerText;
    timeDiv.appendChild(descriptionInput);
    descriptionInput.focus();
})

$(".container").on("blur","textarea",function(){
    timeDiv = this.parentElement;
    descriptionText = this.value.trim();

    timeDiv.removeChild(this);
    descriptionPara = document.createElement("p");
    descriptionPara.innerHTML = descriptionText;
    descriptionPara.className = "text-dark";
    timeDiv.appendChild(descriptionPara);
})

$(".container").on("click",".saveBtn",function(){
    parentDiv = this.parentElement;
    timeString = parentDiv.childNodes[1].innerText;
    myEvents[timeString] = parentDiv.childNodes[3].innerText;
    localStorage.setItem("workDaySchedule",JSON.stringify(myEvents));
})

currentDateEl.textContent = dateOnly;
checkHour();
loadSchedule();