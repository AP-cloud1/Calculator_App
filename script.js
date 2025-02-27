let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let themeToggle = document.getElementById("themeToggle");

// Load theme from local storage
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

function appendNumber(num) {
    display.value += num;
}

function appendOperator(operator) {
    if (display.value !== "") {
        display.value += operator;
    }
}

function appendDecimal() {
    let parts = display.value.split(/[\+\-\*\/]/);
    if (!parts[parts.length - 1].includes(".")) {
        display.value += ".";
    }
}

function appendFunction(func) {
    let value = parseFloat(display.value);
    if (isNaN(value)) return;

    let result;
    switch (func) {
        case "sqrt":
            result = Math.sqrt(value);
            break;
        case "pow":
            result = Math.pow(value, 2);
            break;
        case "sin":
            result = Math.sin(value * (Math.PI / 180));
            break;
        case "cos":
            result = Math.cos(value * (Math.PI / 180));
            break;
        case "tan":
            result = Math.tan(value * (Math.PI / 180));
            break;
        case "log":
            result = Math.log10(value);
            break;
    }
    updateHistory(`${display.value} = ${result}`);
    display.value = result;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        let result = eval(display.value);
        updateHistory(`${display.value} = ${result}`);
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

function updateHistory(entry) {
    let li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
    localStorage.setItem("history", historyList.innerHTML);
}

function clearHistory() {
    historyList.innerHTML = "";
    localStorage.removeItem("history");
}

// Load history from local storage
historyList.innerHTML = localStorage.getItem("history") || "";
