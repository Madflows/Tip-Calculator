var billInput = document.querySelector(".bills-amount");
var peopleInput = document.querySelector(".amountPeople");
var tipPerPerson = document.querySelector(".tip-per-person");
var totalPerPerson = document.querySelector(".total-per-person");
var tips = document.querySelectorAll(".tips");
var customTip = document.querySelector(".custom-rate");
var resetBtn = document.querySelector(".reset");
var error = document.querySelector(".error");
let peopleParent = peopleInput.parentNode;
let disabled = document.querySelector(".disabled");

disabled.addEventListener("click", () => {});
billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
customTip.addEventListener("input", tipInputFun);
customTip.addEventListener("focus", tipInputFun);

tips.forEach((e) => {
  e.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetFun);

billInput.value = "";
peopleInput.value = "1";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

disableBtn();

// Functions

function billInputFun() {
  billValue = parseFloat(billInput.value);
  calculateTip();
  enableBtn();
}
function peopleInputFun() {
  if (peopleInput.value < 1) {
    error.style.display = "flex";
    peopleParent.style.border = "2px solid red";
  } else {
    error.style.display = "none";
    peopleParent.style.border = "none";
    peopleValue = parseFloat(peopleInput.value);
    calculateTip();
    enableBtn();
  }
}

function handleClick(event) {
  tips.forEach((val) => {
    val.classList.remove("active");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
  enableBtn();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let peopletip = tipAmount * peopleValue;
    let totalAmount = (billValue + peopletip) / peopleValue;
    tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = "$" + totalAmount.toFixed(2);
  }
}

function tipInputFun() {
  tipValue = parseFloat(customTip.value / 100);

  tips.forEach((val) => {
    val.classList.remove("active");
  });
  calculateTip();
  enableBtn();
}

function resetFun() {
  billInput.value = "";
  peopleInput.value = "";
  customTip.value = "";
  tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
  totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);
  disableBtn()
}

function enableBtn() {
  resetBtn.classList.remove("disabled");
}

function disableBtn() {
  resetBtn.classList.add("disabled");
}
