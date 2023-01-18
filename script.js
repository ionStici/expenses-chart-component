const card = document.querySelector(".card");
const graph = document.querySelector(".card__graph");
const logo = document.querySelector(".hd__logo");
let heights;

const renderData = async function () {
    const res = await fetch("./data.json");
    const data = await res.json();

    const days = data.map(d => d.day);
    const amounts = data.map(d => d.amount);

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
