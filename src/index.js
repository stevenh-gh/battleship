import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";
import "./styles.css";

let placeShips = document.querySelector("#place-ships");
for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
        let div = document.createElement("div");
        div.classList.add(...
            "border border-black text-xl rounded-md p-1.5 text-white".split(" "));
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
let enemyGameboard = new Gameboard();
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
        // console.log(gameboard);
        for (let i = 0; i < lengths[count]; ++i) {
            if (rotate) {
                document.getElementById(`${coord[0] + i}-${coord[1]}`).classList.add("bg-blue-300");
            } else {
                document.getElementById(`${coord[0]}-${coord[1] + i}`).classList.add("bg-blue-300");
            }
        }
        ++count;
        if (count === 5) {
            gameStart();
        }
    } catch (error) {
        if (error.message !== "Cannot read properties of null (reading 'classList')") {
            alert(error);
        }
    }
}

function gameStart() {
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
    drawPlayerBoard(playerShipsCoords);
    generateComputerShips();
    // draw enemy board
    let comGameGrid = drawEnemyBoard();
    // -------gameplay loop---------
    let player = new Player(enemyGameboard);
    let computer = new Player(gameboard, true);
    // -----------------------------
    let doComGameGridClick = e => handleComGameGridClick(e, player, computer);
    comGameGrid.addEventListener("click", doComGameGridClick);
    let doComGameCheckWin = () => checkWin(comGameGrid, doComGameGridClick, doComGameCheckWin);
    comGameGrid.addEventListener("click", doComGameCheckWin);
}

function generateComputerShips() {
    // use random numbers to generate ships for enemy gameboard
    // make ships in arr
    let comShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
    let comShipsCount = 0;
    while (comShipsCount < comShips.length) {
        // generate random nums for x,y
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let v = Math.floor(Math.random() * 2);
        let coord = [x, y];
        // placeships with try/catch
        try {
            enemyGameboard.placeShip(comShips[comShipsCount], coord, v);
            // increment
            ++comShipsCount;
        } catch {
            continue;
        }
        // console.log("enemy");
        // console.log(enemyGameboard);
    }
}

function checkWin(comGameGrid, doComGameGridClick, doComGameCheckWin) {
    if (enemyGameboard.isAllSunk() || gameboard.isAllSunk()) {
        let winner = document.getElementById("winner");
        enemyGameboard.isAllSunk() ? winner.innerText = "Player wins!" : winner.innerText = "Computer wins!";
        winner.classList.remove("hidden");
        comGameGrid.removeEventListener("click", doComGameGridClick);
        comGameGrid.removeEventListener("click", doComGameCheckWin);
    }
}

function drawPlayerBoard(playerShipsCoords) {
    let playerGrid = document.getElementById("player-game-grid");
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            let cell = document.createElement("div");
            cell.classList.add(...
                "border border-black text-xl rounded-md p-1.5 text-white".split(" "));
            cell.innerText = `${i},${j}`;
            cell.id = `gg-${i}-${j}`;
            if (playerShipsCoords.some(ele => ele[0] === i && ele[1] === j)) {
                cell.classList.add("bg-blue-500");
            }
            playerGrid.appendChild(cell);
        }
    }
}

function drawEnemyBoard() {
    let comGameGrid = document.getElementById("com-game-grid");
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            let cell = document.createElement("div");
            cell.classList.add(...
                "border border-black text-xl rounded-md p-1.5 text-white".split(" "));
            cell.innerText = `${i},${j}`;
            cell.id = `eg-${i}-${j}`;
            comGameGrid.appendChild(cell);
        }
    }
    return comGameGrid;
}

function handleComGameGridClick(e, player, computer) {
    if (e.target.id !== "com-game-grid") {
        let id = e.target.id.split("-");
        let atk = [id[1], id[2]].map(c => parseInt(c));
        // console.log(player.attack(atk));
        if (player.attack(atk)) {
            document.getElementById(e.target.id).classList.add("bg-red-400");
        } else {
            document.getElementById(e.target.id).classList.add("bg-gray-400");
        }
        let cAtk = computer.attack();
        let cAtkCoord = cAtk[1];
        if (cAtk[0]) {
            document.getElementById(`gg-${cAtkCoord[0]}-${cAtkCoord[1]}`).classList.remove("bg-blue-500");
            document.getElementById(`gg-${cAtkCoord[0]}-${cAtkCoord[1]}`).classList.add("bg-red-400");
        } else {
            document.getElementById(`gg-${cAtkCoord[0]}-${cAtkCoord[1]}`).classList.add("bg-gray-400");
        }
    }
}