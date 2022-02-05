currentDateEl = document.getElementById("currentDay");

function getTodaysDate() {
    today = moment().format("dddd, MMMM Do YYYY");
    currentDateEl.textContent = today;
}

$(".container").on("click",".description",function(){
    timeDiv = this;
    timeDivChild = this.childNodes[0];
    if (timeDivChild.tagName != "P") {
        console.log("no p")
        return;
    }

    timeDiv.removeChild(timeDivChild);
    descriptionInput = document.createElement("textarea");
    descriptionInput.setAttribute("autofocus","true");
    timeDiv.appendChild(descriptionInput);
})

getTodaysDate();