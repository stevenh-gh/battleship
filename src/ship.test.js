import Ship from "./ship";

let ship;
beforeEach(() => {
    ship = new Ship(5);
})

describe("constructor", () => {
    it("should take a length", () => {
        expect(ship.length).toBe(5);
    })
})

describe("hit method", () => {
    it("should take a number and mark that position as hit", () => {
        ship.hit([4, 5]);
        expect(ship.hits.get("4-5")).toEqual([4, 5]);
    })
})

describe("isSunk() method", () => {
    it("should set property \"sunk\" by calculating the length and positions hit", () => {
        ship.hit([1, 1]);
        ship.hit([1, 2]);
        ship.hit([1, 3]);
        ship.hit([1, 4]);
        ship.hit([1, 5]);
        ship.isSunk();
        expect(ship.sunk).toBeTruthy();
    })
})