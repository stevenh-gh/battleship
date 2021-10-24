export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = new Map();
        this.sunk = false;
    }
    hit(pos) {
        this.hits.set(`${pos[0]}-${pos[1]}`, pos);
    }
    isSunk() {
        if (this.hits.size === this.length) {
            this.sunk = true;
        }
    }
}