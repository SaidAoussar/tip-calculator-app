const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const customInput = document.querySelector(".custom-input");

const billInput = document.querySelector("#bill");
const nbrPeopleInput = document.querySelector("#number-people");
const messageElement = document.querySelector("#message");
const tipAmountView = document.querySelector("#tipAmount");
const tolalView = document.querySelector("#total");

function onKeyupBillInput() {
  showResults();
}

function onChangeBillInput() {
  showResults();
}

//when user select tip other tip off, and input disables , opposite true
function checkOne(checkbox) {
  checkboxes.forEach((element) => {
    if (element !== checkbox) {
      element.checked = false;
    }
  });

  if (checkbox.checked === true) {
    customInput.disabled = true;
    customInput.value = "";
  } else {
    customInput.disabled = false;
  }

  showResults();
}

function onKeyupCustomTipInput() {
  showResults();
}

function onChangeCustomTipInput() {
  showResults();
}

function onKeyupNbrPeople() {
  if (parseFloat(nbrPeopleInput.value) === 0 || nbrPeopleInput.value === "") {
    nbrPeopleInput.classList.add("error");
    messageElement.classList.remove("hide");
  } else {
    nbrPeopleInput.classList.remove("error");
    messageElement.classList.add("hide");
  }

  showResults();
}

function onChangeNbrPeople() {
  showResults();
}

// get all fields we need an calc tipAmountPerson and totalPerson then show result in screen (totalView and tipAmountView)
function showResults() {
  const bill = getBill();
  const nbrOfPeople = getNbrOfPeople();
  let tip;
  if (tipChecked() !== 0) {
    tip = tipChecked();
  } else {
    tip = getCustomTip();
  }
  if (bill === 0 || nbrOfPeople === 0 || tip === 0) {
    tipAmountView.innerHTML = 0;
    tolalView.innerHTML = 0;
  } else {
    const tipAmountPerson = parseFloat(
      calcTipAmountPerson(bill, tip, nbrOfPeople)
    );
    tipAmountView.innerHTML = tipAmountPerson;
    tolalView.innerHTML = calcTotalPerson(bill, nbrOfPeople, tipAmountPerson);
  }
}

// calc tip amount per person
function calcTipAmountPerson(bill, tip, nbrOfPeople) {
  return parseFloat((bill * (tip / 100)) / nbrOfPeople).toFixed(2);
}

// calcl total per person
function calcTotalPerson(bill, nbrOfPeople, tipAmountPerson) {
  return parseFloat(bill / nbrOfPeople + tipAmountPerson).toFixed(2);
}

// get tip checked if there is no type checked return 0
function tipChecked() {
  let value = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === true) {
      value = checkbox.value;
    }
  });

  return parseFloat(value);
}

// get custom tip from custom input
function getCustomTip() {
  let customTip = customInput.value;

  if (parseFloat(customTip) >= 0) {
    return parseFloat(customTip);
  } else {
    return 0;
  }
}
// get bill from bill input
function getBill() {
  let bill = billInput.value;

  if (parseFloat(bill) >= 0) {
    return parseFloat(bill);
  } else {
    return 0;
  }
}

// get number of people from number-people input
function getNbrOfPeople() {
  let numberPeople = nbrPeopleInput.value;
  if (parseFloat(numberPeople) >= 0) {
    return parseFloat(numberPeople);
  } else {
    return 0;
  }
}

//reset

function reset() {
  //reset bill
  billInput.value = 0;
  // reset checkbox
  checkboxes.forEach((element) => {
    element.checked = false;
  });

  //reset custom input
  customInput.value = "";
  customInput.disabled = false;

  //reset number of people
  nbrPeopleInput.value = 1;

  //reset tip amount view
  tipAmountView.innerHTML = 0;

  //reset total view
  tolalView.innerHTML = 0;
}
