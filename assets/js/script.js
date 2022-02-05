currentDateEl = document.getElementById("currentDay");

function getTodaysDate() {
    today = moment().format("dddd, MMMM Do YYYY");
    currentDateEl.textContent = today;
}

getTodaysDate();