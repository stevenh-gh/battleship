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
placeShips.addEventListener("click", handleClicks)
placeShips.addEventListener("mouseover", handleMouseOver)


function placeShipsRmEvnt() {
        placeShips.removeEventListener("click", handleClicks);
        placeShips.removeEventListener("mouseover", handleMouseOver);
    }

function handleMouseOver(e) {
    let coord = e.target.id.split("-").map(c => parseInt(c));
    placeShips.querySelectorAll("div").forEach(div => {
        div.classList.remove("bg-gray-400");
    });
    for (let i = 0; i < lengths[count]; ++i) {
        try {
            if (rotate) {
                document.getElementById(`${coord[0] + i}-${coord[1]}`).classList.add("bg-gray-400");
            } else {
                document.getElementById(`${coord[0]}-${coord[1] + i}`).classList.add("bg-gray-400");
            }
        } catch {
            continue;
        }
    }
}

function handleClicks(e) {
    let coord = e.target.id.split("-").map(c => parseInt(c));
    try {
        rotate ? gameboard.placeShip(new Ship(lengths[count]), coord, rotate) : gameboard.placeShip(new Ship(lengths[count]), coord);
        console.log(gameboard);
        for (let i = 0; i < lengths[count]; ++i) {
            if (rotate) {
                document.getElementById(`${coord[0] + i}-${coord[1]}`).classList.add("bg-blue-300");
            } else {
                document.getElementById(`${coord[0]}-${coord[1] + i}`).classList.add("bg-blue-300");
            }
        }
        ++count;
        if (count === 5) {
        placeShipsRmEvnt();
            document.getElementById("place-ships-div").classList.add("hidden");
            document.getElementById("gameplay-div").classList.remove("hidden");
            // to setup 2 gameboards:
            // combine all the ships' coords into a single array
            let playerShipsCoords = [];
            gameboard.ships.forEach(ship => {
                playerShipsCoords = playerShipsCoords.concat(ship.coord);
            })

            // and when constructing grid, if grid num matches a coord, color it
            let playerGrid = document.getElementById("player-game-grid");
            for (let i = 0; i < 10; ++i) {
                for (let j = 0; j < 10; ++j) {
                    let cell = document.createElement("div");
                    cell.innerText = `${i},${j}`;
                    if (playerShipsCoords.some(ele => ele[0] === i && ele[1] === j)) {
                        cell.classList.add("bg-blue-500");
                    }
                    playerGrid.appendChild(cell);
                }
            }
        }
    } catch (e) {
        alert(e);
    }
}