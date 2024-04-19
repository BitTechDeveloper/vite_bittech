import "/styles/main.css";
import * as f from "../libjs/functions";

// selectors
const numBtns = f.selectAll(".num");
const oprBtns = f.selectAll(".opr");
const equalBtn = f.select(".equal");
const delBtn = f.select(".del");
const resetBtn = f.select(".reset");
const screen = f.select(".screen");
const resultDisplay = f.select(".result-display");
const inputDataDisplay = f.select(".input-data-display");

// state varibles
let result = null;
let operator = "";
let inputData = "0";

// initial display
inputDataDisplay.innerText = inputData;

// handle numbers
numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", () => {
        if (numBtn.innerText == "." && inputData.includes(".")) return;
        inputData == "0" ? (inputData = numBtn.innerText) : (inputData += numBtn.innerText);
        inputData[0] == "." ? (inputData = "0" + inputData) : (inputData = inputData);
        inputDataDisplay.innerText = inputData;
        // console.log(numBtn.innerText);
    });
});

// handle operators
oprBtns.forEach((oprBtn) => {
    oprBtn.addEventListener("click", () => {
        if (inputData == "0") return;
        if (operator == "") {
            result = parseFloat(inputData);
            operator = oprBtn.innerText;
        } else {
            if (operator == "+") {
                result += parseFloat(inputData);
                operator = oprBtn.innerText;
            } else if (operator == "-") {
                result -= parseFloat(inputData);
                operator = oprBtn.innerText;
            } else if (operator == "*") {
                result *= parseFloat(inputData);
                operator = oprBtn.innerText;
            } else if (operator == "/") {
                result /= parseFloat(inputData);
                operator = oprBtn.innerText;
            }
        }
        inputData = "0";
        inputDataDisplay.innerText = inputData;
        resultDisplay.innerText = result + " " + operator;
        // console.log(oprBtn.innerText);
    });
});

// handle equal sign
equalBtn.addEventListener("click", () => {
    if (operator == "+") {
        result += parseFloat(inputData);
    } else if (operator == "-") {
        result -= parseFloat(inputData);
    } else if (operator == "*") {
        result *= parseFloat(inputData);
    } else if (operator == "/") {
        result /= parseFloat(inputData);
    }
    inputData = String(result);
    inputDataDisplay.innerText = result;
    result = null;
    resultDisplay.innerText = "";
    operator = "";
    // console.log(equalBtn.innerText);
});

// handle delete charachter
delBtn.addEventListener("click", () => {
    if (inputData == "0") return;
    if (inputData.length == 1) {
        inputData = "0";
    } else {
        inputData = inputData.slice(0, -1);
    }
    inputDataDisplay.innerText = inputData;
    // console.log(delBtn.innerText);
});

// handle reset
resetBtn.addEventListener("click", () => {
    result = null;
    inputData = "0";
    operator = "";
    inputDataDisplay.innerText = inputData;
    resultDisplay.innerText = "";
    // console.log(resetBtn.innerText);
});
