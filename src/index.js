import "./styles.css";

let placeShips = document.querySelector("#place-ships");
for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
        let div = document.createElement("div");
        div.classList.add(...
            "border border-black".split(" "));
        div.innerText = `${i},${j}`;
        div.id = `${i}-${j}`
        placeShips.appendChild(div);
    }
}
let lengths = [5, 4, 3, 3, 2];
placeShips.addEventListener("mouseover", e => {
    let coord = e.target.id.split("-").map(c => parseInt(c));
    placeShips.querySelectorAll("div").forEach(div => {
        div.classList.remove("bg-gray-400");
    })
    for (let i = 0; i < lengths[0]; ++i) {
        try {
            document.getElementById(`${coord[0]}-${coord[1]+i}`).classList.add("bg-gray-400");
        } catch {
            continue;
        }
    }
})