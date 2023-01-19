import { renderData } from "./script.js";

const balanceBox = document.querySelector(".hd__box");
const bg = document.querySelector(".bg");
const newDataBox = document.querySelector(".new-data");

const inputsBox = document.querySelector(".inputs");
let inputs = document.querySelectorAll(".input");

const addBtn = document.querySelector(".add");
const resetBtn = document.querySelector(".reset");
const closeBtn = document.querySelector(".close");
const randomBtn = document.querySelector(".random");
const seeResultsBtn = document.querySelector(".see-results");

const randomValue = () => Math.floor(Math.random() * 100);

let placeholder = 4;

const open_close = function (open) {
    if (open) {
        bg.style.opacity = ".5";
        bg.style.visibility = "visible";
        bg.style.pointerEvents = "revert";

        newDataBox.style.opacity = "1";
        newDataBox.style.visibility = "visible";
        newDataBox.style.pointerEvents = "revert";
    } else {
        bg.style.opacity = "0";
        bg.style.visibility = "hidden";
        bg.style.pointerEvents = "none";

        newDataBox.style.opacity = "0";
        newDataBox.style.visibility = "hidden";
        newDataBox.style.pointerEvents = "none";
    }
};

balanceBox.addEventListener("click", function () {
    open_close("open");
});

window.addEventListener("keypress", function (e) {
    if (e.key === "n" || e.key === "N") {
        open_close("open");
    }
});

closeBtn.addEventListener("click", function () {
    open_close(undefined);
});

bg.addEventListener("click", function () {
    open_close(undefined);
});

addBtn.addEventListener("click", function () {
    if (placeholder <= 7) {
        inputsBox.insertAdjacentHTML(
            "beforeend",
            `<input class="input" type="text" placeholder="${placeholder}" />`
        );

        inputs = document.querySelectorAll(".input");
        placeholder++;

        resetBtn.style.backgroundColor = "#ec755d";
    }

    if (placeholder > 7) {
        addBtn.style.backgroundColor = "#ccc";
    }
});

const reset = function () {
    if (placeholder > 4) {
        placeholder = 4;

        addBtn.style.backgroundColor = "#ec755d";
        resetBtn.style.backgroundColor = "#ccc";

        inputsBox.innerHTML = "";
        inputsBox.insertAdjacentHTML(
            "afterbegin",
            `
            <input class="input" type="text" placeholder="1">
            <input class="input" type="text" placeholder="2">
            <input class="input" type="text" placeholder="3">
            `
        );

        inputs = document.querySelectorAll(".input");
    }
};

resetBtn.addEventListener("click", reset);

seeResultsBtn.addEventListener("click", function () {
    const allInputs = [...inputs].map(i => +i.value);
    renderData(allInputs);
    open_close();
    reset();
});

randomBtn.addEventListener("click", function () {
    const allInputs = [...inputs].map(i => i);
    const randomValues = allInputs.map(inp => randomValue());
    allInputs.forEach((inp, i) => (inp.value = randomValues[i]));
});
