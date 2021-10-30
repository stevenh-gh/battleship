export default class Gameboard {
    constructor() {
        this.ships = [];
    }
    placeShip(ship, coord) {
        this.ships.push({
            ship,
            coord
        })
    }
}