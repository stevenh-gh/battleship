import Ship from "./ship";

export default class Gameboard {
    constructor() {
        this.ships = new Map();
    }
    placeShip(coord, length) {
        this.ships.set(coord, new Ship(length));
    }
}