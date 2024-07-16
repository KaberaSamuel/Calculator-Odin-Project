// variables
let var1;
let var2;
let operator;
let position;
let result = 0;
const numbers = ".0123456789";
const operators = "÷×-+";

const downBox = document.querySelector(".downBox");
const displayWorkings = document.querySelector("#displayWorkings");
const displayResult = document.querySelector("#displayResult");
const clearbtn = document.querySelector("#clear");
const deletebtn = document.querySelector("#delete");

//Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const parseString = function (string) {
  const words = string.split(" ");
  var1 = Number(words[0]);
  var2 = Number(words[2]);
  let inlineOperator = words[1];

  if (inlineOperator === "+") {
    result = add(var1, var2);
  }
  if (inlineOperator === "-") {
    result = subtract(var1, var2);
  }
  if (inlineOperator === "×") {
    result = multiply(var1, var2);
  }
  if (inlineOperator === "÷") {
    if (var2 != 0) {
      result = var1 / var2;
    } else {
      alert("Math Error");
      clear();
    }
  }
};

const checkOperatorPresence = function (string) {
  for (let char of [...string]) {
    if (operators.includes(char)) return true;
  }
  return false;
};

const clear = function () {
  displayWorkings.textContent = "";
  displayResult.textContent = result = 0;
};

// working operations
downBox.addEventListener("click", function (e) {
  // 1. if it's a number
  if (numbers.includes(e.target.textContent)) {
    displayWorkings.textContent += e.target.textContent;
  }

  // 2. if it's an operator
  if (operators.includes(e.target.textContent)) {
    operator = e.target.textContent;
    if (!checkOperatorPresence(displayWorkings.textContent)) {
      displayWorkings.textContent += ` ${operator} `;
    } else {
      parseString(displayWorkings.textContent);
      displayWorkings.textContent = `${result} ${operator} `;
      displayResult.textContent = result;
    }
  }

  // 3. if it's an equal sign
  if (e.target.textContent === "=") {
    parseString(displayWorkings.textContent);
    displayResult.textContent = result;
  }
});

// Clearing and Deleting
clearbtn.addEventListener("click", clear);
deletebtn.addEventListener("click", () => {
  position = displayWorkings.textContent.length - 1;
  displayWorkings.textContent =
    displayWorkings.textContent.slice(position) === " "
      ? displayWorkings.textContent.slice(0, position - 2)
      : displayWorkings.textContent.slice(0, position);
});
