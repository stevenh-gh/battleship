import Gameboard from "./gameboard";

let gameboard;
beforeEach(() => {
    gameboard = new Gameboard();
})

describe("placeShip", () => {
    it("should be able to place ship at a given coordinate and length", () => {
        let coord = [3, 4];
        let length = 4;
        gameboard.placeShip(coord, length);
        expect(gameboard.ships.get(coord)).toMatchObject({ length: 4 });
    })
})