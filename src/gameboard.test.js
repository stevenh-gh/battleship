import Gameboard from "./gameboard";
import Ship from "./ship";

describe("gameboard", () => {
    it("should have a list of ships", () => {
        // arrange
        let gameboard;
        // act
        gameboard = new Gameboard();
        // assert
        expect(gameboard.ships).toEqual([]);
    })
})
describe("placeShip", () => {
    it("should take a pair of coordinates and place a ship there", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 3;
        const ship = new Ship(length);
        const coord = [4, 3];
        const expected = { ship: { length: 3, hits: [] }, coord: [4, 3] };
        // act
        gameboard.placeShip(ship, coord);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1]).toEqual(expected);
    })
})