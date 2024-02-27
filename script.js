const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart =  false;

function updateResult(originClear = false) {
  result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigi(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber))
  return;

  if (restart) {
    currentNumber = digit;
    restart = false;
  }else{
    currentNumber+= digit;
  }
  updateResult();
}

function setOperator(newOperator) {
  if (currentNumber) {
    calculate();
    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }

  operator = newOperator;
}

function calculate() {
  if (operator === null || firstOperand == null) return;
  let secundOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;

  switch (operator) {
    case "+":
      resultValue = firstOperand + secundOperand;
      break;
    case "-":
      resultValue = firstOperand - secundOperand;
      break;
    case "×":
      resultValue = firstOperand * secundOperand;
      break;
    case "÷":
      resultValue = firstOperand / secundOperand;
      break;  
    default:
      return;
  }

  if (resultValue.toString().split(".")[1]?.length > 5) {   
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  } else {
    currentNumber = resultValue.toString();
  }

  operator = null;
  firstOperand = null;
  restart = true;
  updateResult();
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateResult(true);
}

function setPercentage() {
  let result = parseFloat(currentNumber) /100;

  if (["+", "-"].includes(operator)) {
    result = result * (firstOperand || 1);
  }

  if (result.toString().split(".")[1]?.length > 5) {
    result = result.toFixed(5).toString();
  }

  currentNumber = result.toString();
  updateResult()
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigi(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (
        parseFloat(currentNumber || firstOperand) * -1
      ).toString();
      updateResult();
    } else if (buttonText ==="%") {
      setPercentage();
    }
  })
})