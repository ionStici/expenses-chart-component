import "./newData.js";

const card = document.querySelector(".card");
const graph = document.querySelector(".card__graph");
const logo = document.querySelector(".hd__logo");
let heights;

export const renderData = async function (localData) {
    let data;
    let days;
    let amounts;

    if (!localData) {
        const res = await fetch("./data.json");
        data = await res.json();

        days = data.map(d => d.day);
        amounts = data.map(d => d.amount);
    } else {
        days = [1, 2, 3, 4, 5, 6, 7];
        data = localData;
        amounts = localData;
    }

    const maxValue = amounts.reduce((ac, num) => (ac < num ? num : ac), 0);
    const maxHeight = 150;

    const x = maxHeight / maxValue;
    heights = amounts.map(n => +(n * x).toFixed(0));

    let markup = "";

    data.forEach((data, i) => {
        markup += `
            <div class="card__graph__wrapper">
                <div class="card__graph__col ${
                    amounts[i] === maxValue ? "card__graph__col--active" : ""
                }"></div>
                <p class="card__graph__p">${days[i]}</p>
                <p class="card__graph__money">$${amounts[i]}</p>
            </div>
        `;
    });

    graph.innerHTML = "";
    graph.insertAdjacentHTML("afterbegin", markup);

    setTimeout(() => {
        if (localData) {
            cols = document.querySelectorAll(".card__graph__col");
            cols.forEach((c, i) => (c.style.height = `${heights[i]}px`));
        }
    }, 100);
};

renderData();

let cols;

setTimeout(() => {
    cols = document.querySelectorAll(".card__graph__col");
    cols.forEach((c, i) => (c.style.height = `${heights[i]}px`));
}, 500);

let i = 1;

logo.addEventListener("click", function () {
    if (i === 1)
        cols.forEach((c, i) => {
            c.style.height = `1px`;
        });

    if (i === 2) {
        cols.forEach((c, i) => {
            c.style.height = `${heights[i]}px`;
        });
        i = 1;
    } else {
        i++;
    }
});
