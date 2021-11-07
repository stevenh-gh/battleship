import Gameboard from "./gameboard";
import Ship from "./ship";
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

let rotateBtn = document.querySelector('#rotate-btn');
let rotate = 0;
rotateBtn.addEventListener("click", () => {
    rotate = rotate === 0 ? 1 : 0;
})

let lengths = [5, 4, 3, 3, 2];
let count = 0;
let gameboard = new Gameboard();
placeShips.addEventListener("click", e => {
    let coord = e.target.id.split("-").map(c => parseInt(c));
    try {
        rotate ? gameboard.placeShip(new Ship(lengths[count]), coord, rotate) : gameboard.placeShip(new Ship(lengths[count]), coord);
        console.log(gameboard);
        for (let i = 0; i < lengths[count]; ++i) {
            if (rotate) {
                document.getElementById(`${coord[0]+i}-${coord[1]}`).classList.add("bg-blue-300");
            } else {
                document.getElementById(`${coord[0]}-${coord[1]+i}`).classList.add("bg-blue-300");
            }
        }
        ++count;
    } catch (e) {
        alert(e);
    }
})
placeShips.addEventListener("mouseover", e => {
    let coord = e.target.id.split("-").map(c => parseInt(c));
    placeShips.querySelectorAll("div").forEach(div => {
        div.classList.remove("bg-gray-400");
    })
    for (let i = 0; i < lengths[count]; ++i) {
        try {
            if (rotate) {
                document.getElementById(`${coord[0]+i}-${coord[1]}`).classList.add("bg-gray-400");
            } else {
                document.getElementById(`${coord[0]}-${coord[1]+i}`).classList.add("bg-gray-400");
            }
        } catch {
            continue;
        }
    }
})