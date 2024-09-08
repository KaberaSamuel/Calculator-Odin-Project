const deleteButton = document.getElementById("delete");
const clearButton = document.getElementById("clear");
const workingsDisplay = document.getElementById("workings");
const resultDisplay = document.getElementById("result");
const equalButton = document.getElementById("equal");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

const logic = (function () {
  const output = {
    result: 0,
    workings: "",
  };

  function calculate(first, operator, second) {
    first = Number(first);
    second = Number(second);

    if (operator === "+") {
      return first + second;
    } else if (operator === "-") {
      return first - second;
    } else if (operator === "×") {
      return first * second;
    } else if (operator === "÷") {
      return first / second;
    }
  }

  function currentOperator() {
    let boolean = false;
    let operator = "none";
    for (let char of output.workings) {
      if ("×÷+-".includes(char)) {
        boolean = true;
        operator = char;
      }
    }

    return { boolean, operator };
  }

  function evaluateWorkings() {
    let operands;
    if (currentOperator().boolean) {
      operands = output.workings
        .replaceAll(" ", "")
        .split(currentOperator().operator);

      const [first, second] = operands;
      output.result = calculate(first, currentOperator().operator, second);
    } else {
      output.result = Number(output.workings);
    }

    return output.result;
  }

  function insertResult() {
    output.workings = String(evaluateWorkings());

    return output.result;
  }

  return {
    output,
    evaluateWorkings,
    currentOperator,
    insertResult,
  };
})();

const ui = (function () {
  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      logic.output.workings += number.textContent;
      updateWorkings();
    });
  });

  operators.forEach((operator) => {
    operator.addEventListener("click", () => {
      if (logic.currentOperator().boolean) {
        logic.insertResult();
        updateWorkings();
        updateResult();
      }
      logic.output.workings += ` ${operator.textContent} `;
      updateWorkings();
    });
  });

  function updateWorkings() {
    workingsDisplay.textContent = logic.output.workings;
  }

  function updateResult() {
    logic.evaluateWorkings();
    resultDisplay.textContent = logic.output.result;
  }

  function deleteLast() {
    logic.output.workings = "123456789".includes(
      logic.output.workings[logic.output.workings.length - 1]
    )
      ? logic.output.workings.slice(0, -1)
      : logic.output.workings.slice(0, -3);
    updateWorkings();
  }

  function clear() {
    logic.output.result = 0;
    logic.output.workings = "";
    updateWorkings();
    updateResult();
  }

  return {
    clear,
    deleteLast,
    updateResult,
  };
})();

clearButton.addEventListener("click", ui.clear);
deleteButton.addEventListener("click", ui.deleteLast);
equalButton.addEventListener("click", ui.updateResult);
