let todaysDate = moment();
let dateOnly = todaysDate.format("dddd, MMMM Do YYYY");
let timeOnly = todaysDate.format("HH");
currentDateEl = document.getElementById("currentDay");

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

currentDateEl.textContent = dateOnly;
checkHour();