export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = new Map();
    }
    hit(pos) {
        this.hits.set(`${pos[0]}-${pos[1]}`, pos);
    }
    isSunk() {
        return this.hits.size === this.length;
    }
}