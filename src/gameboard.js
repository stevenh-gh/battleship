export default class Gameboard {
    constructor() {
        this.ships = [];
    }
    placeShip(ship, pos, verticality = 0) {
        let coord = [pos];
        setCoords(ship, coord, verticality);
        this.ships.push({
            ship,
            coord
        })
    }
}

function setCoords(ship, coord, verticality) {
    for (let i = 0; i < ship.length - 1; ++i) {
        let x = coord[coord.length - 1][0];
        let y = coord[coord.length - 1][1];
        if (verticality) {
            coord.push([x + 1, y]);
        } else {
            coord.push([x, y + 1]);
        }
    }
}