let runningTotal = 0;
let buffer = "0";
const screen = document.querySelector(".screen");
//const screen = $(".screen");
let lastOperator;

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screenRender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer = buffer + value;
  }
}

function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    doOperation(intBuffer);
  }

  lastOperator = value;

  buffer = "0";
}

function doOperation(intBuffer) {
  if (lastOperator === "+") {
    runningTotal = runningTotal + intBuffer;
  } else if (lastOperator === "-") {
    runningTotal = runningTotal - intBuffer;
  } else if (lastOperator === "x") {
    runningTotal = runningTotal * intBuffer;
  } else {
    runningTotal = intBuffer;
  }
}

function handleSymbol(value) {
	if (value == "C" ) {
      buffer = "0";
      runningTotal = 0;
	} else if (value == "=") {
		if (lastOperator === null) {
        // need two numbers to do math
        return;
      }
      doOperation(parseInt(buffer));
      lastOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
  } else if (value == "←") {
  	if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
  } else if (value == "+" || value == "-" || value == "x" || value == "÷") {
  	handleMath(value);
  }
}

function screenRender() {
  screen.innerText = buffer;
}

function ignition() {
  document
    .querySelector(".calculator-buttons")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

ignition();