currentDateEl = document.getElementById("currentDay");

function getTodaysDate() {
    today = moment().format("dddd, MMMM Do YYYY");
    currentDateEl.textContent = today;
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

getTodaysDate();