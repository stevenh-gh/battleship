import "./styles.css";

let placeShips = document.querySelector("#place-ships");
for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
        let div = document.createElement("div");
        div.classList.add(...
            "border border-black".split(" "));
        div.innerText = `${i},${j}`;
        div.id = `${i}-${j}`
        div.addEventListener("mouseover", e => {
            div.classList.add("bg-gray-400");
        })
        div.addEventListener("mouseout", e => {
            div.classList.remove("bg-gray-400");
        })
        placeShips.appendChild(div);
    }
}